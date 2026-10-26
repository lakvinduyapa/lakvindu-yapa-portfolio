import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { profile } from '../../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ delay: 1.02 })
          .from('.hero__name-line span', {
            yPercent: 115,
            rotate: 2,
            duration: 0.78,
            stagger: 0.08,
            ease: 'power4.out',
          })
          .from('.hero__profession-rule', {
            scaleX: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          }, '-=.52')
          .from('.hero__profession-text span', {
            yPercent: 115,
            duration: 0.55,
            ease: 'power4.out',
          }, '-=.42')
          .from('.hero__line > span', {
            yPercent: 110,
            rotate: 2,
            duration: 0.86,
            stagger: 0.08,
            ease: 'power4.out',
          }, '-=.3')
          .from('.hero__side, .hero__dek, .hero__scroll', {
            opacity: 0,
            y: 18,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
          }, '-=.45')
      })
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
          .to('.hero__identity-block, .hero__statement', { yPercent: 16, scale: 0.94, opacity: 0.15 }, 0)
          .to('.hero__visual', { yPercent: 12, scale: 1.07, opacity: 0.15 }, 0)
          .to('.hero__side, .hero__dek, .hero__scroll', { opacity: 0 }, 0)
      })
      media.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          })
          .to('.hero__identity-block', { yPercent: 10, opacity: 0.35 }, 0)
          .to('.hero__statement', { yPercent: 10, scale: 0.965, opacity: 0.22, transformOrigin: 'left center' }, 0)
          .to('.hero__visual', { yPercent: 6, scale: 1.035, opacity: 0.22 }, 0)
          .to('.hero__side, .hero__dek, .hero__scroll', { opacity: 0 }, 0)
      })
    }, section)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="hero" id="top" ref={section} aria-labelledby="hero-title">
      <div className="hero__visual" aria-hidden="true"><div className="hero__orb" /></div>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content shell">
        <div className="hero__identity-block">
          <div className="hero__identity" aria-label={profile.displayName}>
            <span className="hero__name-line"><span>LAKVINDU</span></span>
            <span className="hero__name-line hero__name-line--last"><span>YAPA</span></span>
          </div>
          <div className="hero__profession micro">
            <span className="hero__profession-rule" aria-hidden="true" />
            <span className="hero__profession-text"><span>{profile.primaryRole.toUpperCase()}</span></span>
          </div>
        </div>
        <div className="hero__side micro">
          {profile.location.label.toUpperCase()}<br />
          {profile.currentContext.shortCompany.toUpperCase()}<br />
          {profile.currentContext.role.toUpperCase()}
        </div>
        <div className="hero__statement">
          <h1 className="hero__title" id="hero-title" aria-label="I build digital experiences.">
            <span className="hero__line"><span>I BUILD</span></span>
            <span className="hero__line hero__line--indent"><span>DIGITAL</span></span>
            <span className="hero__line"><span>EXPERIENCES<span className="accent">.</span></span></span>
          </h1>
        </div>
        <p className="hero__dek">{profile.supportingStatement}</p>
        <a href="#about" className="hero__scroll interactive">
          <span>SCROLL TO EXPLORE</span><ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
