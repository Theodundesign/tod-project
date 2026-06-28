export default function FilePreview({file}){
  const isImage = file.type && file.type.startsWith('image/')
  if(isImage){
    const url = URL.createObjectURL(file)
    // object URLs are not compatible with next/image; disable the rule for this case
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={url} alt={file.name} style={{width:64,height:64,objectFit:'cover',borderRadius:8}} />
  }
  return <div style={{width:64,height:64,display:'grid',placeItems:'center',borderRadius:8,background:'rgba(255,255,255,0.02)'}}>{file.name.split('.').pop().toUpperCase()}</div>
}
