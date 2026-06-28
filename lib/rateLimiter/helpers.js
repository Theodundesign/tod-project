import { presetToParams } from './config.js'
import { log } from '../logger.js'

const suspiciousMap = new Map()
const blacklist = new Map()

export function makeKey({ prefix='rl', ip='unknown', route='' }){
  const clean = (s='') => String(s).replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_: -]/g,'')
  return `${clean(prefix)}:${clean(route)}:${clean(ip)}`
}

export function createRateLimitKey(prefix, route, ip){
  return makeKey({ prefix, route, ip })
}

export function buildRateHeaders({ capacity=0, remaining=0, reset=0 }){
  const headers = {
    'X-RateLimit-Limit': String(capacity),
    'X-RateLimit-Remaining': String(Math.max(0, Math.floor(remaining))),
    'X-RateLimit-Reset': String(Math.floor(reset))
  }
  return headers
}

export function pickParams(opts={}){
  // accept preset or explicit capacity/windowSec/refillPerSec
  if(opts.preset){
    const p = presetToParams(opts.preset)
    if(p) return p
  }
  const capacity = opts.capacity || opts.max || 60
  const windowSec = opts.windowSec || 60
  const refillPerSec = opts.refillPerSec || (capacity / windowSec)
  return { capacity, windowSec, refillPerSec }
}

export function getClientIP(req){
  if(!req) return 'unknown'
  try{
    // Next.js Edge Request has headers.get
    if(typeof req.ip === 'string') return req.ip
    if(req.headers){
      const xf = (req.headers.get && req.headers.get('x-forwarded-for')) || req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']
      if(xf) return String(xf).split(',')[0].trim()
    }
    if(req.socket && req.socket.remoteAddress) return req.socket.remoteAddress
  }catch(e){
    console.debug('getClientIP error', e && e.message ? e.message : e)
  }
  return 'unknown'
}

export async function trackSuspiciousActivity(ip, details={}){
  // Try to push to Upstash list, otherwise record locally
  try{
    const mod = await import('./upstash')
    if(mod && mod.pushAbuseEvent){
      await mod.pushAbuseEvent(ip, details)
      return
    }
  }catch(e){
    console.debug('trackSuspiciousActivity upstash error', e && e.message ? e.message : e)
  }
  // local fallback: keep a small in-memory history
  const arr = suspiciousMap.get(ip) || []
  arr.unshift({ ts: Date.now(), ...details })
  suspiciousMap.set(ip, arr.slice(0, 50))
  // promote to blacklist if too many recent events
  const recent = arr.filter(a => (Date.now() - a.ts) < (1000*60*60)).length
  if(recent > 50) blacklist.set(ip, Date.now() + (1000*60*60))
}

export function logRateLimitViolation(ip, info={}){
  log('rate-limit-violation', { ip, ...info })
}

export function isBlacklisted(ip){
  const until = blacklist.get(ip)
  if(!until) return false
  if(Date.now() > until){ blacklist.delete(ip); return false }
  return true
}

