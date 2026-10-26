import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutSystem from '../../assets/section-art/about-system.svg'
import { profile } from '../../data/profile'
import ProfilePortrait from '../profile/ProfilePortrait'
import SectionLabel from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return
      gsap.from('.about__headline .reveal-line span', {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.about__headline', start: 'top 78%' },
      })
      gsap.from('.about__copy > *, .about__values, .about__portrait', {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: '.about__content', start: 'top 82%' },
      })
      gsap.fromTo('.about__art img',
        { yPercent: -2 },
        { yPercent: 4, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 } },
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="about section shell" id="about" ref={section}>
      <div className="about__art section-art" aria-hidden="true"><img src={aboutSystem} alt="" /></div>
      <SectionLabel index="01">ABOUT / APPROACH</SectionLabel>
      <h2 className="about__headline">
        <span className="reveal-line"><span>I TURN</span></span>
        <span className="reveal-line"><span>IDEAS INTO</span></span>
        <span className="reveal-line"><span>WORKING <i>SOFTWARE.</i></span></span>
      </h2>
      <div className="about__content">
        <ProfilePortrait />
        <div className="about__copy">
          <p className="micro">PROFILE / {profile.location.label.toUpperCase()}</p>
          <p>{profile.summary}</p>
        </div>
        <div className="about__values">
          <span className="micro">HOW I WORK</span>
          <ul>
            {profile.professionalValues.map((value) => <li key={value}>{value}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
