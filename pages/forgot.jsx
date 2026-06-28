import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Forgot(){
  const { resetPassword } = useAuth()
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)

  async function handle(e){
    e.preventDefault(); setLoading(true); setMsg('')
    try{ await resetPassword(email); setMsg('Password reset sent. Check your email.') }catch(e){ setMsg(e.message) }
    setLoading(false)
  }

  return (
    <div className="auth-hero">
      <form className="auth-card" onSubmit={handle}>
        <h3>Reset password</h3>
        <div className="field"><input value={email} onChange={e=>setEmail(e.target.value)} required type="email" /><label>Email</label></div>
        {msg && <div className="auth-note">{msg}</div>}
        <div style={{marginTop:12}}>
          <button className="btn-primary" disabled={loading}>{loading? 'Sending...':'Send reset'}</button>
        </div>
      </form>
    </div>
  )
}
