import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  useEffect(()=>{
    if(!toasts.length) return
    const timers = toasts.map(t=> setTimeout(()=>{
      setToasts(s=>s.filter(x=>x.id!==t.id))
    }, t.duration || 4500))
    return ()=> timers.forEach(clearTimeout)
  },[toasts])

  const push = useCallback((toast)=>{
    const id = Math.random().toString(36).slice(2,9)
    setToasts(s=>[...s,{id, ...toast}])
    return id
  },[setToasts])

  const remove = useCallback((id)=> setToasts(s=>s.filter(t=>t.id!==id)),[setToasts])

  return (
    <ToastContext.Provider value={{push,remove}}>
      {children}
      <div className="toast-root" aria-live="polite">
        {toasts.map(t=> (
          <div key={t.id} className={`toast toast-${t.type||'info'}`}>
            <div className="toast-body">{t.title && <div className="toast-title">{t.title}</div>}{t.message}</div>
            <button className="toast-close" onClick={()=>remove(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = ()=> useContext(ToastContext)
