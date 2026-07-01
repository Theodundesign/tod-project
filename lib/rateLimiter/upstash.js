// Upstash-backed token-bucket implementation using @upstash/redis
let redis = null
async function getRedis(){
  if(redis) return redis
  try{
    if(!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null
    const { Redis } = await import('@upstash/redis/cloudflare')
    redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    return redis
  }catch(e){
    // unable to create redis client in this environment
    return null
  }
}

// Sliding window using sorted set; returns [ok(1|0), count, wait_seconds]
const SLIDING_WINDOW_LUA = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]

-- remove old entries
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
-- add this event
redis.call('ZADD', key, now, member)
-- get current count
local cnt = redis.call('ZCARD', key)
if cnt <= limit then
  redis.call('EXPIRE', key, window + 2)
  return {1, cnt, 0}
else
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local oldest_ts = tonumber(oldest[2]) or 0
  local wait = (oldest_ts + window) - now
  return {0, cnt, wait}
end
`

export async function slidingWindowConsume(key, capacity, windowSec, _cost=1){
  const client = await getRedis()
  const now = Math.floor(Date.now()/1000)
  void _cost
  if(!client) return null
  try{
    // member should be unique to avoid collisions
    const member = `${now}-${Math.random().toString(36).slice(2,9)}`
    const res = await client.eval(SLIDING_WINDOW_LUA, [key], [String(now), String(windowSec), String(capacity), member])
    // res => [ok, count, wait]
    const ok = !!(res && Number(res[0]) === 1)
    const count = Number(res[1] ?? 0)
    const wait = Number(res[2] ?? 0)
    return { ok, count, wait, now }
  }catch(e){
    return null
  }
}

export async function pushAbuseEvent(ip, details){
  try{
    const client = await getRedis()
    const key = `rl_abuse:${ip}`
    const payload = JSON.stringify({ts: new Date().toISOString(), ...details})
    if(client){
      // LPUSH + LTRIM in a pipeline
      await client.lpush(key, payload)
      await client.ltrim(key, 0, 99)
      await client.expire(key, 60 * 60 * 24)
      return true
    }
  }catch(e){
    // ignore
  }
  return false
}

export { getRedis }
