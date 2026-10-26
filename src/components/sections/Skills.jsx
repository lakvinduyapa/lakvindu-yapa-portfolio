import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { professionalStrengths, skillGroups } from '../../data/skills'
import SectionLabel from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const section = useRef(null)
  const allSkills = skillGroups.flatMap((group) => group.skills)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add({
        desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
      }, ({ conditions }) => {
        const mobile = conditions.mobile
        gsap.from('.skills__group, .skills__strengths', {
          opacity: 0,
          y: mobile ? 24 : 40,
          stagger: mobile ? 0.08 : 0.1,
          duration: mobile ? 0.65 : 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills__grid',
            start: mobile ? 'top 86%' : 'top 78%',
            invalidateOnRefresh: true,
          },
        })
      })
    }, section)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="skills section" id="skills" ref={section}>
      <div className="shell"><SectionLabel index="03">CAPABILITIES / STACK</SectionLabel></div>
      <div className="skills__marquee" aria-hidden="true">
        <div>
          {[...allSkills, ...allSkills].map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}<i>✦</i></span>
          ))}
        </div>
      </div>
      <div className="skills__grid shell">
        {skillGroups.map((group, index) => (
          <div className="skills__group" key={group.category}>
            <div className="skills__category micro">
              <span>{String(index + 1).padStart(2, '0')}</span>{group.category}
            </div>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}<span aria-hidden="true">↗</span></li>)}</ul>
          </div>
        ))}
        <div className="skills__strengths">
          <div className="skills__category micro"><span>—</span>PROFESSIONAL STRENGTHS</div>
          <ul>
            {professionalStrengths.map((strength) => <li key={strength}>{strength}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
