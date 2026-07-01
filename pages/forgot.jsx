import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function formatAuthError(errorCode) {
  if (!errorCode) return 'An unexpected error occurred. Please try again.'
  if (errorCode.includes('auth/user-not-found')) return 'If this email is registered, we will send a reset link. Check your inbox or spam folder.'
  if (errorCode.includes('auth/invalid-email')) return 'Please enter a valid email address.'
  if (errorCode.includes('auth/network-request-failed')) return 'Network error. Check your connection and try again.'
  if (errorCode.includes('auth/too-many-requests')) return 'Too many password reset requests. Please try again later.'
  return 'Unable to send password reset. Please try again or contact support.'
}

export default function Forgot(){
  const { resetPassword } = useAuth()
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')
  const [isError,setIsError]=useState(false)
  const [loading,setLoading]=useState(false)

  async function handle(e){
    e.preventDefault()
    if (!email) {
      setIsError(true)
      setMessage('Enter your email address to reset your password.')
      return
    }

    setLoading(true)
    setIsError(false)
    setMessage('')

    try {
      console.debug('Password reset requested for', email)
      await resetPassword(email)
      setMessage('If this email is registered, a password reset link has been requested. Check your inbox and spam folder.')
    } catch (error) {
      console.error('Password reset failed:', error.code, error.message, error)
      setIsError(true)
      setMessage(formatAuthError(error.code || error.message || error.toString()))
    }

    setLoading(false)
  }

  return (
    <div className="auth-hero">
      <form className="auth-card" onSubmit={handle}>
        <h3>Reset password</h3>
        <div className="field"><input value={email} onChange={e=>setEmail(e.target.value)} required type="email" /><label>Email</label></div>
        {message && <div className={isError ? 'auth-error' : 'auth-note'}>{message}</div>}
        <div style={{marginTop:12}}>
          <button className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send reset'}</button>
        </div>
      </form>
    </div>
  )
}
