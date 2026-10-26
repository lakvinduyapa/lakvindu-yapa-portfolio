import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursor = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    let frame
    let x = -100
    let y = -100

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (cursor.current) cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }

    const onOver = (event) => {
      if (!cursor.current) return

      const project = event.target.closest('[data-cursor="view"]')
      const link = event.target.closest('a, button, .interactive')
      cursor.current.classList.toggle('cursor--view', Boolean(project))
      cursor.current.classList.toggle('cursor--link', Boolean(link) && !project)
      cursor.current.querySelector('span').textContent = project ? 'VIEW' : link ? '↗' : ''
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div className="cursor" ref={cursor} aria-hidden="true"><span /></div>
}
