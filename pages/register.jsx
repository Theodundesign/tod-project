import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage(){
  const { signup, user, loading } = useAuth()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [fullName,setFullName]=useState('')
  const [phone,setPhone]=useState('')
  const [loadingState,setLoadingState]=useState(false)
  const [err,setErr]=useState('')
  const [shouldRedirect,setShouldRedirect]=useState(false)
  const router = useRouter()

  const destination = useMemo(() => {
    const redirect = router.query.redirect
    const raw = Array.isArray(redirect) ? redirect[0] : redirect
    if (typeof raw === 'string' && raw.trim()) {
      try { return decodeURIComponent(raw) } catch {
        return raw
      }
    }
    return '/dashboard'
  }, [router.query.redirect])

  useEffect(()=>{
    if(!loading && user){
      if (router.pathname === '/register' || shouldRedirect) {
        setShouldRedirect(false)
        router.replace(destination)
      }
    }
  },[user,loading,router,router.pathname,shouldRedirect,destination])

  async function handleSubmit(e){
    e.preventDefault(); setLoadingState(true); setErr('')
    try{
      await signup({ fullName, email, password, phone })
      setShouldRedirect(true)
    }catch(e){
      setErr(e?.message || 'Registration failed. Please try again.')
    }
    setLoadingState(false)
  }

  return (
    <>
      <Head>
        <title>Register — The Odun Design</title>
        <meta name="description" content="Create a new account at The Odun Design to order design, web, app, and training services." />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="auth-hero">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>Create account</h3>
        <div className="field">
          <input value={fullName} onChange={e=>setFullName(e.target.value)} required />
          <label>Full name</label>
        </div>
        <div className="field">
          <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" />
          <label>Phone (optional)</label>
        </div>
        <div className="field">
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Email</label>
        </div>
        <div className="field">
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
          <label>Password</label>
        </div>
        {err && <div className="auth-error">{err}</div>}
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="btn-primary" disabled={loadingState}>{loadingState? 'Creating...':'Create account'}</button>
          <Link legacyBehavior href="/login"><a className="btn-ghost">Sign in</a></Link>
        </div>
      </form>
      </div>
    </>
  )
}
