import FilePreview from './FilePreview'

export default function UploadCard({item}){
  return (
    <div className={`upload-card state-${item.state}`}>
      <div className="preview"><FilePreview file={item.file} /></div>
      <div className="meta">
        <div className="name">{item.file.name}</div>
        <div className="progress">{item.progress}%</div>
      </div>
    </div>
  )
}
