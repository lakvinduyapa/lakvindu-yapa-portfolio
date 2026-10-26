import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { profile } from '../../data/profile'

export default function Loader() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const loader = root.current

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(loader, { display: 'none' })
      return undefined
    }

    const failSafe = window.setTimeout(() => {
      gsap.set(loader, { display: 'none' })
    }, 4000)

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => window.clearTimeout(failSafe),
      })

      timeline
        .to('.loader__count', { textContent: 100, duration: 0.9, snap: { textContent: 1 } })
        .to('.loader__line span', { scaleX: 1, duration: 0.65 }, '<')
        .to('.loader__inner', { yPercent: -24, opacity: 0, duration: 0.35 })
        .to(loader, { yPercent: -100, duration: 0.85 }, '-=.08')
        .set(loader, { display: 'none' })
    }, root)

    return () => {
      window.clearTimeout(failSafe)
      ctx.revert()
    }
  }, [])

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__inner">
        <span className="micro">INITIALIZING / {profile.displayName.toUpperCase()}</span>
        <div className="loader__count">0</div>
        <div className="loader__line"><span /></div>
      </div>
    </div>
  )
}
