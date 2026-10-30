import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import workSystem from '../../assets/section-art/projects-system.webp'
import workSystemSmall from '../../assets/section-art/projects-system-small.webp'
import './SectionAtmosphere.css'
import { projects } from '../../data/projects'
import ProjectCaseStudy from '../projects/ProjectCaseStudy'
import LiyaSaviCaseStudy from '../projects/LiyaSaviCaseStudy'
import NksClothingCaseStudy from '../projects/NksClothingCaseStudy'
import CinnamonCareCaseStudy from '../projects/CinnamonCareCaseStudy'
import SectionLabel from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProjects() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo('.work__art img',
          { y: -10 },
          { y: 10, ease: 'none', scrollTrigger: { trigger: '.work__intro', start: 'top bottom', end: 'bottom top', scrub: 1 } },
        )
      }
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="work section shell" id="work" ref={section}>
      <div className="work__art section-art" aria-hidden="true">
        <img src={workSystem} srcSet={`${workSystemSmall} 640w, ${workSystem} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1040px" width="1200" height="800" alt="" loading="lazy" decoding="async" />
      </div>
      <SectionLabel index="02">SELECTED WORK / CLIENT + INDEPENDENT</SectionLabel>
      <div className="work__intro">
        <h2><span className="work__title-line"><span>BUILT</span>{' '}<span>TO WORK.</span></span><i>DESIGNED TO MATTER.</i></h2>
        <p>Selected work across client delivery, commerce, education, multilingual systems and AI integration.</p>
      </div>
      <div className="projects">
        <ProjectCaseStudy project={projects[0]} />
        <CinnamonCareCaseStudy project={projects[2]} />
        <LiyaSaviCaseStudy project={projects[3]} />
        <NksClothingCaseStudy project={projects[1]} />
      </div>
    </section>
  )
}
