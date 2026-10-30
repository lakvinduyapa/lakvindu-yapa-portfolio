import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import educationSystem from '../../assets/section-art/education-academic.webp'
import educationSystemSmall from '../../assets/section-art/education-academic-small.webp'
import experienceSystem from '../../assets/section-art/experience-workspace.webp'
import experienceSystemSmall from '../../assets/section-art/experience-workspace-small.webp'
import './SectionAtmosphere.css'
import { experience } from '../../data/experience'
import SectionLabel from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const root = section.current
    // Anchor the decorative layers to the real timeline entries, including after text wraps.
    const positionArtwork = () => {
      const sectionTop = root.getBoundingClientRect().top
      root.querySelectorAll('.timeline__item').forEach((item) => {
        root.style.setProperty(`--${item.dataset.type}-art-top`, `${item.getBoundingClientRect().top - sectionTop}px`)
      })
    }
    const resizeObserver = new ResizeObserver(positionArtwork)
    resizeObserver.observe(root)
    resizeObserver.observe(root.querySelector('.timeline'))
    positionArtwork()
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.timeline__progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 65%', scrub: 1 },
          },
        )
        gsap.from('.timeline__item', {
          opacity: 0.15,
          x: 30,
          stagger: 0.25,
          scrollTrigger: { trigger: '.timeline', start: 'top 68%', end: 'bottom 72%', scrub: 1 },
        })
        gsap.utils.toArray('.experience__art img').forEach((art) => {
          gsap.fromTo(art,
            { y: -10 },
            { y: 10, ease: 'none', scrollTrigger: { trigger: art.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } },
          )
        })
      })
      media.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.timeline__progress',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 82%', end: 'bottom 68%', scrub: 0.7 } },
        )
        gsap.utils.toArray('.timeline__item').forEach((item) => {
          gsap.from(item, {
            opacity: 0.2,
            x: 18,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 62%', scrub: 0.45 },
          })
        })
        gsap.utils.toArray('.experience__art img').forEach((art) => {
          gsap.fromTo(art,
            { y: -6, opacity: 0.65 },
            { y: 8, opacity: 1, ease: 'none', scrollTrigger: { trigger: art.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 } },
          )
        })
      })
    }, section)

    return () => {
      resizeObserver.disconnect()
      media.revert()
      context.revert()
      root.style.removeProperty('--experience-art-top')
      root.style.removeProperty('--education-art-top')
    }
  }, [])

  return (
    <section className="experience section shell" id="experience" ref={section}>
      <div className="experience__art experience__art--work section-art" aria-hidden="true">
        <img src={experienceSystem} srcSet={`${experienceSystemSmall} 640w, ${experienceSystem} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 62vw, 840px" width="1200" height="800" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="experience__art experience__art--education section-art" aria-hidden="true">
        <img src={educationSystem} srcSet={`${educationSystemSmall} 640w, ${educationSystem} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 62vw, 840px" width="1200" height="800" alt="" loading="lazy" decoding="async" />
      </div>
      <SectionLabel index="04">EXPERIENCE / EDUCATION</SectionLabel>
      <div className="experience__layout">
        <h2>EXPERIENCE<br /><i>&</i><br />EDUCATION.</h2>
        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true"><span className="timeline__progress" /></div>
          {experience.map((item) => (
            <article className="timeline__item" data-type={item.type} key={`${item.type}-${item.period}`}>
              <div className="timeline__dot" aria-hidden="true" />
              <div className="timeline__period micro">{item.period}</div>
              <h3>{item.role}</h3>
              <h4>{item.company}</h4>
              <div className="timeline__detail micro">{item.detail}</div>
              <p>{item.description}</p>
              {item.projects?.length > 0 && (
                <div className="timeline__projects">
                  <span className="micro">INTERNAL PLATFORMS</span>
                  <ul>{item.projects.map((project) => <li key={project}>{project}</li>)}</ul>
                </div>
              )}
              {item.technologies?.length > 0 && (
                <ul className="timeline__technologies" aria-label="Technologies used">
                  {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
