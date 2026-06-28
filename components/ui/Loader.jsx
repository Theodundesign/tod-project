export default function Loader({size=36}){
  return (
    <div className="loader" style={{width:size,height:size}}>
      <div className="dot" />
    </div>
  )
}
