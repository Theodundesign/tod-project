import { useCallback, useRef, useState } from 'react'
import UploadCard from './UploadCard'
import { uploadFile } from '../../lib/storage'
import { useToast } from '../ui/ToastContext'

export default function UploadDropzone({path='references', accept=['image/*','application/pdf','application/zip','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']}){
  const inputRef = useRef()
  const [files, setFiles] = useState([])
  const toast = useToast()

  const onFiles = useCallback((fls)=>{
    const list = Array.from(fls).map(f=>({file:f,id:Math.random().toString(36).slice(2,8),progress:0,state:'queued'}))
    setFiles(s=>[...list,...s])
    list.forEach(item=>{
      // start upload
      uploadFile(item.file, path, (snap)=>{
        const pct = Math.round((snap.bytesTransferred/snap.totalBytes)*100)
        setFiles(s=>s.map(x=> x.id===item.id? {...x,progress:pct,state:'uploading'}: x))
      }).then(res=>{
        setFiles(s=>s.map(x=> x.id===item.id? {...x,progress:100,state:'done',meta:res}: x))
        toast.push({type:'success',message:`Uploaded ${item.file.name}`})
      }).catch(err=>{
        setFiles(s=>s.map(x=> x.id===item.id? {...x,state:'error'}: x))
        toast.push({type:'error',message:err.message||'Upload failed'})
      })
    })
  },[path, toast])

  return (
    <div className="upload-dropzone" onClick={()=>inputRef.current.click()} onDrop={e=>{e.preventDefault(); onFiles(e.dataTransfer.files)}} onDragOver={e=>e.preventDefault()}>
      <input ref={inputRef} type="file" multiple style={{display:'none'}} onChange={e=>onFiles(e.target.files)} accept={accept.join(',')} />
      <div className="upload-cta">Drop files here or click to select</div>
      <div className="upload-list">
        {files.map(f=> <UploadCard key={f.id} item={f} />)}
      </div>
    </div>
  )
}
