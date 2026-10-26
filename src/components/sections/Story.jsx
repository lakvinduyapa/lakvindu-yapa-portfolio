import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['DESIGN', 'DEVELOP', 'BUILD', 'SOLVE']

export default function Story() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: '+=360%',
            pin: true,
            scrub: 0.8,
          },
        })

        words.forEach((_, index) => {
          timeline
            .fromTo(
              `.story__word:nth-child(${index + 1})`,
              { opacity: 0, yPercent: 60, scale: 0.82 },
              { opacity: 1, yPercent: 0, scale: 1, duration: 0.45 },
            )
            .to(
              `.story__word:nth-child(${index + 1})`,
              { opacity: 0, yPercent: -60, scale: 1.1, duration: 0.45 },
              '+=.18',
            )
        })

        timeline
          .to('.story__final', { opacity: 1, y: 0, duration: 0.7 })
          .to('.story__track', { opacity: 0, duration: 0.2 }, '<')
      })
      media.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: '+=245%',
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        })

        words.forEach((_, index) => {
          timeline
            .fromTo(
              `.story__word:nth-child(${index + 1})`,
              { opacity: 0, yPercent: 42, scale: 0.9 },
              { opacity: 1, yPercent: 0, scale: 1, duration: 0.42, ease: 'power2.out' },
            )
            .to(
              `.story__word:nth-child(${index + 1})`,
              { opacity: 0, yPercent: -42, scale: 1.05, duration: 0.38, ease: 'power2.in' },
              '+=.12',
            )
        })

        timeline
          .to('.story__final', { opacity: 1, y: 0, duration: 0.65 })
          .to('.story__track', { opacity: 0, duration: 0.18 }, '<')
      })
    }, section)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="story" ref={section} aria-label="How I work">
      <div className="story__top micro"><span>FROM IDEA</span><span>TO IMPACT</span></div>
      <div className="story__track" aria-hidden="true">
        {words.map((word) => <div className={`story__word story__word--${word.toLowerCase()}`} key={word}><small>I</small>{word}<em>.</em></div>)}
      </div>
      <h2 className="story__final">I BUILD SOFTWARE<br />THAT CREATES<br /><i>REAL VALUE.</i></h2>
      <div className="story__index micro">01 — 04</div>
    </section>
  )
}
