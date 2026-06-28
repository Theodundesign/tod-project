import React, { useEffect, useRef, useState } from 'react'

export default function Counter({ value, format }){
  const ref = useRef()
  const [count, setCount] = useState(0)
  useEffect(() => {
    let observer
    let raf
    let start
    const node = ref.current
    if (!node) return

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / 800, 1)
      const next = Math.floor(progress * value)
      setCount(next)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(animate)
        }
      })
    }, { threshold: 0.3 })

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{format ? format(count) : count}</span>
}
