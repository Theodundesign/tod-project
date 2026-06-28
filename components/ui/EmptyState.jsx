export default function EmptyState({title,subtitle,icon}){
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon || '📁'}</div>
      <h4>{title}</h4>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
