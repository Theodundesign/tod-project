import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, adminOnly=false }){
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(()=>{
    if(!loading){
      if(!user) {
        const redirect = encodeURIComponent(router.asPath || '/')
        router.replace(`/login?redirect=${redirect}`)
        return
      }
      if(adminOnly && profile?.role !== 'admin') router.replace('/dashboard')
    }
  },[user,loading,profile,adminOnly,router])

  if(loading) return <div style={{padding:40}}>Checking authentication...</div>
  if(!user) return null
  return children
}
