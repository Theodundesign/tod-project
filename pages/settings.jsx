import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'

export default function SettingsRedirect(){
  const router = useRouter()

  useEffect(()=>{
    router.replace('/dashboard/settings')
  },[router])

  return (
    <ProtectedRoute>
      <div className="container">
        <p>Redirecting to settings...</p>
      </div>
    </ProtectedRoute>
  )
}
