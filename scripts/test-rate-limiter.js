// Simple test harness for rate limiter (in-memory fallback)
(async function(){
  const mod = await import('../lib/rateLimiter.js')
  const { checkRateLimit, resetInMemoryLimits } = mod
  // helpers import not needed for this test harness

  const ip = '127.0.0.1'
  console.log('Testing contactLimiter (3 req / 60s)')
  for(let i=0;i<6;i++){
    const rl = await checkRateLimit({ keyPrefix: 'contact', ip, route: '/api/contact/send', preset: 'contactLimiter' })
    console.log(i+1, rl)
    if(!rl.ok) console.log('Blocked at attempt', i+1, 'retryAfter:', rl.retryAfter)
  }
  resetInMemoryLimits()
  console.log('Done')
})().catch(e=>{ console.error(e); process.exit(1) })
