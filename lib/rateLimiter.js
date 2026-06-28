import { slidingWindowConsume, pushAbuseEvent } from './rateLimiter/upstash.js'
import { makeKey, pickParams } from './rateLimiter/helpers.js'
import { log, error } from './logger.js'

// In-memory fallback token buckets (for environments without Upstash)
const buckets = new Map()
function now(){ return Math.floor(Date.now()/1000) }

async function tryUpstashConsume(key, capacity, windowSec, cost=1){
  try{
    const r = await slidingWindowConsume(key, capacity, windowSec, cost)
    return r
  }catch(e){
    return null
  }
}

export async function checkRateLimit(opts={}){
  // opts: { keyPrefix, ip, route, capacity, windowSec, refillPerSec, preset, cost }
  const ip = opts.ip || 'unknown'
  const route = opts.route || (opts.keyPrefix || 'rl')
  const key = makeKey({ prefix: opts.keyPrefix || 'rl', ip, route })
  const params = pickParams(opts)
  const capacity = params.capacity
  const windowSec = params.windowSec
  const refillPerSec = params.refillPerSec
  const cost = opts.cost || 1

  // Try Upstash first (atomic token bucket)
  const up = await tryUpstashConsume(key, capacity, windowSec, cost)
  if(up){
    const ok = up.ok
    const count = Number(up.count || up.count === 0 ? up.count : up[1])
    const remaining = Math.max(0, capacity - count)
    const reset = ok ? now() + windowSec : now() + (up.wait || 0)
    if(!ok){
      try{
        const pushed = await pushAbuseEvent(ip, { key: key, route, capacity, remaining, wait: up.wait })
        if(!pushed) log('rate-limiter abuse', { ip, key, route, capacity, remaining, wait: up.wait })
      }catch(e){ error('rateLimiter pushAbuseEvent failed', e.message) }
    }
    return { ok, remaining, reset, retryAfter: up.wait, capacity, windowSec }
  }

  // Fallback: simple in-memory token bucket per key
  const ts = now()
  const state = buckets.get(key) || { tokens: capacity, last: ts }
  const delta = Math.max(0, ts - state.last)
  state.tokens = Math.min(capacity, state.tokens + (delta * refillPerSec))
  state.last = ts
  if(state.tokens >= cost){
    state.tokens = state.tokens - cost
    buckets.set(key, state)
    return { ok: true, remaining: state.tokens, reset: ts + Math.ceil((capacity - state.tokens) / Math.max(refillPerSec,1)), capacity, windowSec }
  }
  // not enough tokens
  const needed = cost - state.tokens
  const wait = Math.ceil(needed / Math.max(refillPerSec, 0.0001))
  // record abuse locally (try Redis list, otherwise log)
  try{
    const pushed = await pushAbuseEvent(ip, { key, route, capacity, remaining: state.tokens, wait })
    if(!pushed) log('rate-limiter abuse (fallback)', { ip, key, route, capacity, remaining: state.tokens, wait })
  }catch(e){ error('rateLimiter fallback push failed', e.message) }
  return { ok: false, remaining: state.tokens, reset: ts + wait, retryAfter: wait, capacity, windowSec }
}

export function resetInMemoryLimits(){ buckets.clear() }

