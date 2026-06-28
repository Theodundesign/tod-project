import { NextResponse } from 'next/server'
import { checkRateLimit } from './lib/rateLimiter'
import { buildRateHeaders } from './lib/rateLimiter/helpers'

// Middleware runs at the edge for API routes; global protection with presets
export async function middleware(req){
  const url = req.nextUrl.clone()
  const path = url.pathname
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'

  // Map path prefixes to limiter presets
  const mapping = [
    { match: '/api/contact', preset: 'strictLimiter' },
    { match: '/api/payments', preset: 'webhookLimiter' },
    { match: '/api/admin', preset: 'strictLimiter' },
    { match: '/api/auth', preset: 'authLimiter' },
    { match: '/api/upload', preset: 'uploadLimiter' },
    { match: '/api/uploads', preset: 'uploadLimiter' }
  ]

  // Only run for API routes
  if(!path.startsWith('/api/')) return NextResponse.next()

  // determine preset from mapping
  let chosen = { preset: 'authLimiter' }
  for(const m of mapping){ if(path.startsWith(m.match)){ chosen = m; break } }

  const rl = await checkRateLimit({ keyPrefix: chosen.match || 'api', ip, route: path, preset: chosen.preset })
  if(!rl.ok){
    const headers = buildRateHeaders({ capacity: rl.capacity || 0, remaining: rl.remaining ?? 0, reset: rl.reset || 0 })
    if(rl.retryAfter) headers['Retry-After'] = String(rl.retryAfter)
    return new NextResponse(JSON.stringify({ success:false, error: 'Too many requests' }), { status: 429, headers: { ...headers, 'Content-Type':'application/json' } })
  }

  // attach rate headers for downstream responses
  const res = NextResponse.next()
  const headers = buildRateHeaders({ capacity: rl.capacity || 0, remaining: rl.remaining ?? 0, reset: rl.reset || 0 })
  for(const k of Object.keys(headers)) res.headers.set(k, headers[k])
  return res
}

export const config = {
  matcher: ['/api/:path*']
}
