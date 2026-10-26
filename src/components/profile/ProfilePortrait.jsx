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
    let activeTouchId = null
    let pointerDrivenGesture = false
    let gestureStart = null
    let moved = false
    let startedPinned = false
    let suppressClickUntil = 0

    const context = gsap.context(() => {}, element)
    const xTo = gsap.quickTo(element, '--scan-x', { duration: 0.22, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, '--scan-y', { duration: 0.22, ease: 'power3.out' })
    const setScrollLock = (locked) => {
      window.dispatchEvent(new CustomEvent('portfolio:portrait-gesture', { detail: { locked } }))
    }

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
      if (event.cancelable) event.preventDefault()
      activePointerId = event.pointerId
      pointerDrivenGesture = true
      gestureStart = { x: event.clientX, y: event.clientY, time: performance.now() }
      moved = false
      startedPinned = pinned
      pinned = false
      fullPinned = false
      setSelected(false)
      dragging = true
      inside = false
      place(event.clientX, event.clientY, true)
      composition.setPointerCapture?.(event.pointerId)
      setScrollLock(true)
      render()
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') {
        if (!dragging || !pointerDrivenGesture || event.pointerId !== activePointerId) return
        if (event.cancelable) event.preventDefault()
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
      if (!dragging || (pointerDrivenGesture && event.pointerId !== activePointerId)) return
      if (!cancelled) place(event.clientX, event.clientY)
      if (pointerDrivenGesture && composition.hasPointerCapture?.(activePointerId)) composition.releasePointerCapture(activePointerId)
      const elapsed = gestureStart ? performance.now() - gestureStart.time : Infinity
      const isTap = !cancelled && !moved && elapsed < 550
      dragging = false
      activePointerId = null
      activeTouchId = null
      pointerDrivenGesture = false
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
      setScrollLock(false)
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

    const findActiveTouch = (touches) => Array.from(touches).find((touch) => touch.identifier === activeTouchId)
    const onTouchStart = (event) => {
      const touch = event.changedTouches[0]
      if (!touch || !ready) return
      activeTouchId = touch.identifier
      // Modern Safari also sends Pointer Events. In that case, this listener only
      // identifies the touch for the non-passive touchmove scroll guard below.
      if (dragging) return

      pointerDrivenGesture = false
      gestureStart = { x: touch.clientX, y: touch.clientY, time: performance.now() }
      moved = false
      startedPinned = pinned
      pinned = false
      fullPinned = false
      setSelected(false)
      dragging = true
      inside = false
      place(touch.clientX, touch.clientY, true)
      setScrollLock(true)
      render()
    }
    const onTouchMove = (event) => {
      if (!dragging || activeTouchId === null) return
      const touch = findActiveTouch(event.touches)
      if (!touch) return
      // iOS fallback: scoped to the composition and only while its gesture is active.
      if (event.cancelable) event.preventDefault()
      if (pointerDrivenGesture) return
      if (gestureStart && Math.hypot(touch.clientX - gestureStart.x, touch.clientY - gestureStart.y) > 7) moved = true
      place(touch.clientX, touch.clientY)
    }
    const onTouchEnd = (event, cancelled = false) => {
      const touch = findActiveTouch(event.changedTouches)
      if (!touch) return
      activeTouchId = null
      if (pointerDrivenGesture && !cancelled) return
      finishTouch({ clientX: touch.clientX, clientY: touch.clientY, pointerId: activePointerId }, cancelled)
    }
    const onTouchCancel = (event) => onTouchEnd(event, true)

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
      if (activePointerId !== null && composition.hasPointerCapture?.(activePointerId)) {
        composition.releasePointerCapture(activePointerId)
      }
      dragging = false
      activePointerId = null
      activeTouchId = null
      pointerDrivenGesture = false
      pinned = false
      fullPinned = false
      setSelected(false)
      inside = false
      pointer = null
      setScrollLock(false)
      render()
    }
    const onLoad = () => {
      ready = image.naturalWidth > 0
      element.dataset.ready = String(ready)
      element.setAttribute('aria-disabled', String(!ready))
      render()
    }
    const onError = () => {
      if (activePointerId !== null && composition.hasPointerCapture?.(activePointerId)) {
        composition.releasePointerCapture(activePointerId)
      }
      ready = false
      dragging = false
      activePointerId = null
      activeTouchId = null
      pointerDrivenGesture = false
      pinned = false
      fullPinned = false
      setSelected(false)
      element.dataset.ready = 'false'
      element.setAttribute('aria-disabled', 'true')
      setScrollLock(false)
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

    composition.addEventListener('pointerenter', onPointerEnter)
    composition.addEventListener('pointerdown', onPointerDown, { passive: false })
    composition.addEventListener('pointermove', onPointerMove, { passive: false })
    composition.addEventListener('pointerup', onPointerUp)
    composition.addEventListener('pointerleave', onPointerLeave)
    composition.addEventListener('pointercancel', onPointerCancel)
    composition.addEventListener('touchstart', onTouchStart, { passive: true })
    composition.addEventListener('touchmove', onTouchMove, { passive: false })
    composition.addEventListener('touchend', onTouchEnd)
    composition.addEventListener('touchcancel', onTouchCancel)
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
      if (activePointerId !== null && composition.hasPointerCapture?.(activePointerId)) composition.releasePointerCapture(activePointerId)
      setScrollLock(false)
      composition.removeEventListener('pointerenter', onPointerEnter)
      composition.removeEventListener('pointerdown', onPointerDown)
      composition.removeEventListener('pointermove', onPointerMove)
      composition.removeEventListener('pointerup', onPointerUp)
      composition.removeEventListener('pointerleave', onPointerLeave)
      composition.removeEventListener('pointercancel', onPointerCancel)
      composition.removeEventListener('touchstart', onTouchStart)
      composition.removeEventListener('touchmove', onTouchMove)
      composition.removeEventListener('touchend', onTouchEnd)
      composition.removeEventListener('touchcancel', onTouchCancel)
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
