import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import original from '../../assets/profile/lakvindu-original.webp'
import digital from '../../assets/profile/lakvindu-digital.webp'
import './ProfilePortrait.css'

export default function ProfilePortrait() {
  const control = useRef(null)
  const [selected, setSelected] = useState(false)

  useLayoutEffect(() => {
    const element = control.current
    const composition = element.querySelector('.portrait__composition')
    const overlay = element.querySelector('.portrait__digital')
    const image = overlay.querySelector('img')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hover = window.matchMedia('(any-hover: hover)')
    let pinned = false
    let fullPinned = false
    let inside = false
    let dragging = false
    let ready = false
    let pointer = null
    let scanPoint = { x: 0.5, y: 0.5 }
    let activePointerId = null
    let gestureStart = null
    let moved = false
    let startedPinned = false
    let suppressClickUntil = 0

    const context = gsap.context(() => {}, element)
    const xTo = gsap.quickTo(element, '--scan-x', { duration: 0.22, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, '--scan-y', { duration: 0.22, ease: 'power3.out' })

    const place = (clientX, clientY, immediate = false) => {
      const rect = composition.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top))
      pointer = { x: clientX, y: clientY }
      scanPoint = {
        x: rect.width ? x / rect.width : 0.5,
        y: rect.height ? y / rect.height : 0.5,
      }
      if (immediate) {
        xTo.tween.pause()
        yTo.tween.pause()
        gsap.set(element, { '--scan-x': x, '--scan-y': y })
      } else {
        xTo(x)
        yTo(y)
      }
    }

    const restorePosition = () => {
      const rect = composition.getBoundingClientRect()
      gsap.set(element, {
        '--scan-x': scanPoint.x * rect.width,
        '--scan-y': scanPoint.y * rect.height,
      })
    }

    const coverRadius = () => {
      const rect = composition.getBoundingClientRect()
      const x = scanPoint.x * rect.width
      const y = scanPoint.y * rect.height
      const farthestCorner = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      )
      return farthestCorner / 0.62
    }

    const render = () => {
      const active = ready && (pinned || inside || dragging)
      const full = motion.matches || (pinned && fullPinned)
      if (active && full && element.dataset.mode === 'scan') gsap.set(overlay, { opacity: 0 })
      element.dataset.mode = full ? 'full' : 'scan'
      element.dataset.active = String(active)
      element.dataset.dragging = String(dragging)
      context.add(() => {
        gsap.to(element, {
          '--scan-radius': active && !full
            ? (pinned ? coverRadius() : Math.min(142, composition.clientWidth * 0.34))
            : 0,
          duration: motion.matches ? 0 : (pinned ? 0.58 : 0.36),
          ease: 'power3.out',
          overwrite: 'auto',
        })
        // Opacity also provides a graceful fallback when CSS masks are unavailable.
        gsap.to(overlay, { opacity: active ? 1 : 0, duration: motion.matches ? 0.16 : 0.3, overwrite: true })
      })
    }

    const onPointerEnter = (event) => {
      if (event.pointerType !== 'mouse' || !hover.matches) return
      const entering = !inside
      inside = true
      if (!motion.matches && !pinned) place(event.clientX, event.clientY, entering)
      if (entering) render()
    }

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' || !event.isPrimary || !ready) return
      activePointerId = event.pointerId
      gestureStart = { x: event.clientX, y: event.clientY, time: performance.now() }
      moved = false
      startedPinned = pinned
      pinned = false
      fullPinned = false
      setSelected(false)
      dragging = true
      inside = false
      place(event.clientX, event.clientY, true)
      element.setPointerCapture?.(event.pointerId)
      render()
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') {
        if (!dragging || event.pointerId !== activePointerId) return
        if (gestureStart && Math.hypot(event.clientX - gestureStart.x, event.clientY - gestureStart.y) > 7) moved = true
        place(event.clientX, event.clientY)
        return
      }
      if (!hover.matches) return
      const entering = !inside
      inside = true
      if (!motion.matches && !pinned) place(event.clientX, event.clientY, entering)
      if (entering) render()
    }

    const finishTouch = (event, cancelled = false) => {
      if (!dragging || event.pointerId !== activePointerId) return
      if (!cancelled) place(event.clientX, event.clientY)
      if (element.hasPointerCapture?.(event.pointerId)) element.releasePointerCapture(event.pointerId)
      const elapsed = gestureStart ? performance.now() - gestureStart.time : Infinity
      const isTap = !cancelled && !moved && elapsed < 550
      dragging = false
      activePointerId = null
      gestureStart = null
      inside = false
      if (isTap) {
        pinned = !startedPinned
        fullPinned = false
        setSelected(pinned)
      } else {
        pinned = false
        fullPinned = false
        setSelected(false)
      }
      suppressClickUntil = performance.now() + 500
      render()
    }

    const onPointerUp = (event) => finishTouch(event)
    const onPointerCancel = (event) => finishTouch(event, true)
    const onPointerLeave = (event) => {
      if (dragging || event.pointerType !== 'mouse') return
      inside = false
      pointer = null
      render()
    }

    const onClick = (event) => {
      if (!ready || performance.now() < suppressClickUntil) return
      if (!pointer) {
        const rect = composition.getBoundingClientRect()
        place(rect.left + rect.width / 2, rect.top + rect.height / 2, true)
      }
      pinned = !pinned
      fullPinned = hover.matches && event.detail !== 0
      setSelected(pinned)
      inside = false
      render()
    }
    const onBlur = () => {
      dragging = false
      activePointerId = null
      pinned = false
      fullPinned = false
      setSelected(false)
      inside = false
      pointer = null
      render()
    }
    const onLoad = () => {
      ready = image.naturalWidth > 0
      element.dataset.ready = String(ready)
      element.setAttribute('aria-disabled', String(!ready))
      render()
    }
    const onError = () => {
      ready = false
      dragging = false
      pinned = false
      fullPinned = false
      setSelected(false)
      element.dataset.ready = 'false'
      element.setAttribute('aria-disabled', 'true')
      render()
    }
    const onScroll = () => {
      if (dragging || !inside || !pointer || pinned || motion.matches) return
      const rect = composition.getBoundingClientRect()
      if (pointer.x < rect.left || pointer.x > rect.right || pointer.y < rect.top || pointer.y > rect.bottom) {
        inside = false
        pointer = null
        render()
      } else place(pointer.x, pointer.y, true)
    }
    const onResize = () => {
      restorePosition()
      if (!pinned) onScroll()
      render()
    }
    const onVisibility = () => { if (document.hidden) onBlur() }

    element.addEventListener('pointerenter', onPointerEnter)
    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointerleave', onPointerLeave)
    element.addEventListener('pointercancel', onPointerCancel)
    element.addEventListener('click', onClick)
    element.addEventListener('blur', onBlur)
    image.addEventListener('load', onLoad)
    image.addEventListener('error', onError)
    motion.addEventListener('change', onResize)
    hover.addEventListener('change', onBlur)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (image.complete) onLoad()

    return () => {
      element.removeEventListener('pointerenter', onPointerEnter)
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerUp)
      element.removeEventListener('pointerleave', onPointerLeave)
      element.removeEventListener('pointercancel', onPointerCancel)
      element.removeEventListener('click', onClick)
      element.removeEventListener('blur', onBlur)
      image.removeEventListener('load', onLoad)
      image.removeEventListener('error', onError)
      motion.removeEventListener('change', onResize)
      hover.removeEventListener('change', onBlur)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      xTo.tween.kill()
      yTo.tween.kill()
      context.revert()
    }
  }, [])

  return (
    <figure className="about__portrait">
      <button
        className="portrait"
        ref={control}
        type="button"
        aria-label="Reveal digital portrait of Lakvindu Yapa"
        aria-pressed={selected}
        aria-disabled="true"
      >
        <span className="portrait__composition">
          <img className="portrait__original" src={original} alt="Lakvindu Yapa in graduation attire" width="800" height="1000" loading="lazy" decoding="async" draggable="false" />
          <span className="portrait__digital" aria-hidden="true">
            <img src={digital} alt="" width="800" height="1000" loading="lazy" decoding="async" draggable="false" />
          </span>
          <span className="portrait__scanner" aria-hidden="true" />
        </span>
        <span className="portrait__hint micro" aria-hidden="true">
          <span className="portrait__hint-hover">MOVE TO REVEAL</span>
          <span className="portrait__hint-touch">DRAG TO REVEAL / TAP TO HOLD</span>
          <span className="portrait__hint-keyboard">ENTER / SPACE TO REVEAL</span>
        </span>
      </button>
    </figure>
  )
}
