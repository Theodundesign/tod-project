import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function LoginPage(){
  const { login, googleSignIn, user, loading } = useAuth()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [show,setShow]=useState(false)
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
      if (router.pathname === '/login' || shouldRedirect) {
        setShouldRedirect(false)
        router.replace(destination)
      }
    }
  },[user,loading,router,router.pathname,shouldRedirect,destination])

  async function handleSubmit(e){
    e.preventDefault(); setLoadingState(true); setErr('')
    try{
      await login(email, password)
      setShouldRedirect(true)
    }catch(e){
      setErr(e?.message || 'Login failed. Please try again.')
    }
    setLoadingState(false)
  }

  async function handleGoogle(){
    setLoadingState(true)
    setErr('')
    try{
      await googleSignIn()
      setShouldRedirect(true)
    }catch(e){
      setErr(e?.message || 'Google sign in failed.')
    }
    setLoadingState(false)
  }

  return (
    <>
      <Head>
        <title>Login — The Odun Design</title>
        <meta name="description" content="Sign in to your The Odun Design account to access your dashboard, projects, and services." />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="auth-hero">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>Welcome back</h3>
        <div className="field">
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Email</label>
        </div>
        <div className="field">
          <input type={show ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
          <label>Password</label>
          <button type="button" className="pwd-toggle" onClick={()=>setShow(s=>!s)}>{show? 'Hide':'Show'}</button>
        </div>
        {err && <div className="auth-error">{err}</div>}
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="btn-primary" disabled={loadingState}>{loadingState? 'Signing in...':'Sign in'}</button>
          <button type="button" className="btn-ghost" onClick={handleGoogle} disabled={loadingState}>Google</button>
        </div>
        <div className="auth-foot">
          <Link legacyBehavior href="/forgot"><a>Forgot password?</a></Link>
          <Link legacyBehavior href="/register"><a>Register</a></Link>
        </div>
      </form>
      </div>
    </>
  )
}

