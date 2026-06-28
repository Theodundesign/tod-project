import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

// Helper function to convert Firebase error codes to user-friendly messages
function formatAuthError(errorMessage) {
  if (!errorMessage) return 'An error occurred. Please try again.'
  
  // Firebase error code patterns
  if (errorMessage.includes('auth/email-already-in-use')) {
    return 'This email is already registered. Please sign in or use a different email.'
  }
  if (errorMessage.includes('auth/weak-password')) {
    return 'Password is too weak. Please use at least 6 characters.'
  }
  if (errorMessage.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.'
  }
  if (errorMessage.includes('auth/user-disabled')) {
    return 'This account has been disabled. Please contact support.'
  }
  if (errorMessage.includes('auth/user-not-found')) {
    return 'Email not found. Please sign up or check your email address.'
  }
  if (errorMessage.includes('auth/wrong-password')) {
    return 'Incorrect password. Please try again.'
  }
  if (errorMessage.includes('auth/too-many-requests')) {
    return 'Too many login attempts. Please try again later or reset your password.'
  }
  if (errorMessage.includes('auth/popup-closed-by-user')) {
    return 'Google sign-in was cancelled. Please try again.'
  }
  if (errorMessage.includes('auth/popup-blocked')) {
    return 'Pop-up window was blocked. Please allow pop-ups and try again.'
  }
  if (errorMessage.includes('auth/network-request-failed')) {
    return 'Network error. Please check your internet connection and try again.'
  }
  if (errorMessage.includes('auth/operation-not-allowed')) {
    return 'This authentication method is not enabled. Please contact support.'
  }
  
  // Default: show generic message for unknown errors
  return 'An error occurred during authentication. Please try again or contact support.'
}

export default function AuthPage(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [showPwd,setShowPwd] = useState(false)
  const router = useRouter()

  async function handleSignup(e){
    e.preventDefault(); setLoading(true); setError('')
    try{
      const { auth } = await import('../firebase/firebaseClient')
      const { createUserWithEmailAndPassword } = await import('firebase/auth')
      await createUserWithEmailAndPassword(auth,email,password)
      router.push('/dashboard')
    }catch(err){ setError(formatAuthError(err.message)) }
    setLoading(false)
  }

  async function handleLogin(e){
    e.preventDefault(); setLoading(true); setError('')
    try{
      const { auth } = await import('../firebase/firebaseClient')
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth,email,password)
      router.push('/dashboard')
    }catch(err){ setError(formatAuthError(err.message)) }
    setLoading(false)
  }

  async function handleGoogle(){
    setLoading(true); setError('')
    try{
      const { auth } = await import('../firebase/firebaseClient')
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    }catch(err){ setError(formatAuthError(err.message)) }
    setLoading(false)
  }

  async function handleForgot(){
    if(!email) { setError('Please enter your email address to reset your password.'); return }
    setLoading(true); setError('')
    try{ 
      const { auth } = await import('../firebase/firebaseClient')
      const { sendPasswordResetEmail } = await import('firebase/auth')
      await sendPasswordResetEmail(auth,email)
      setError('Password reset link sent to ' + email + '. Check your inbox or spam folder.')
    }catch(err){ setError(formatAuthError(err.message)) }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Authenticate — The Odun Design</title>
        <meta name="description" content="Secure authentication for The Odun Design." />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="auth-hero">
        <form className="auth-card" onSubmit={handleLogin}>
          <h3>Sign in / Register</h3>
          <div className="field"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required /><label>Email</label></div>
          <div className="field" style={{position:'relative'}}>
            <input value={password} onChange={e=>setPassword(e.target.value)} type={showPwd? 'text':'password'} required />
            <label>Password</label>
            <button type="button" className="pwd-toggle" onClick={()=>setShowPwd(s=>!s)}>{showPwd? 'Hide':'Show'}</button>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="btn-primary" disabled={loading}>{loading? 'Loading...':'Sign in'}</button>
            <button type="button" className="btn-ghost" onClick={handleSignup} disabled={loading}>{loading? '...' : 'Sign up'}</button>
          </div>
        <div className="auth-foot">
          <button type="button" className="btn-ghost" onClick={handleForgot} style={{padding:'10px 12px'}}>Forgot password?</button>
          <button type="button" className="btn-ghost" onClick={handleGoogle} disabled={loading}>Continue with Google</button>
        </div>
      </form>
    </div>
    </>
  )
}
