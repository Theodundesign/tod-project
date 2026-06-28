import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import dynamic from 'next/dynamic'
const UploadDropzone = dynamic(() => import('../../components/uploads/UploadDropzone'), { ssr: false, loading: () => <div>Loading upload...</div> })
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { listFilesAt, deleteFile } from '../../lib/storage'
import { useToast } from '../../components/ui/ToastContext'

export default function FilesPage(){
  const { user } = useAuth()
  const [refs, setRefs] = useState([])
  const toast = useToast()

  useEffect(()=>{
    if(!user) return
    const base = `uploads/${user.uid}/references`
    listFilesAt(base).then(setRefs).catch(e=>console.error(e))
  },[user])

  async function handleDelete(p){
    try{ await deleteFile(p); setRefs(r=>r.filter(x=>x.path!==p)); toast.push({type:'success',message:'Deleted'}) }catch(e){ toast.push({type:'error',message:e.message}) }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h3>Files</h3>
        <section style={{marginTop:12}}>
          <UploadDropzone path={`uploads/${user?.uid}/references`} />
        </section>
        <section style={{marginTop:20}}>
          <h4>Your references</h4>
          <div style={{display:'grid',gap:8,marginTop:8}}>
            {refs.length===0 && <div>No uploads yet.</div>}
            {refs.map(f=> (
              <div key={f.path} className="file-row">
                <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
                <div><button className="btn-ghost" onClick={()=>handleDelete(f.path)}>Delete</button></div>
              </div>
            ))}
          </div>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
