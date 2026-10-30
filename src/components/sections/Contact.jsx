import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDownToLine,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { profile } from '../../data/profile'
import SectionLabel from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

export default function Contact() {
  const section = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.contact__status, .contact__availability li, .contact h2, .contact__email, .contact__links a', {
        opacity: 0,
        y: 36,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section.current, start: 'top 65%' },
      })
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="contact section" id="contact" ref={section}>
      <div className="shell">
        <SectionLabel index="05">CONTACT / GET IN TOUCH</SectionLabel>
        <div className="contact__status micro"><span className="status-dot" /> OPEN TO OPPORTUNITIES AND PROJECTS</div>
        <ul className="contact__availability micro" aria-label="Open to">
          {profile.availability.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <h2>LET’S TALK<br />ABOUT YOUR<br /><i>PROJECT.</i></h2>
        <a className="contact__email interactive" href={profile.contact.mailto}>
          {profile.contact.email} <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact__links">
          <a
            href={profile.socials.github}
            className="interactive"
            aria-label="Visit Lakvindu Yapa on GitHub (opens in a new tab)"
            {...externalLinkProps}
          >
            <Github aria-hidden="true" /> GITHUB <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={profile.socials.linkedin}
            className="interactive"
            aria-label="Visit Lakvindu Yapa on LinkedIn (opens in a new tab)"
            {...externalLinkProps}
          >
            <Linkedin aria-hidden="true" /> LINKEDIN <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={profile.socials.whatsapp}
            className="interactive"
            aria-label="Start a WhatsApp conversation with Lakvindu Yapa (opens in a new tab)"
            {...externalLinkProps}
          >
            <MessageCircle aria-hidden="true" /> WHATSAPP <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={profile.contact.tel} className="interactive" aria-label={`Call ${profile.contact.primaryPhone}`}>
            <Phone aria-hidden="true" /> {profile.contact.primaryPhone} <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={profile.contact.mailto} className="interactive">
            <Mail aria-hidden="true" /> EMAIL <ArrowUpRight aria-hidden="true" />
          </a>
          {profile.cv.href && (
            <a href={profile.cv.href} className="interactive" download={profile.cv.downloadName}>
              <ArrowDownToLine aria-hidden="true" /> DOWNLOAD CV <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
        <footer>
          <span>© {new Date().getFullYear()} {profile.displayName.toUpperCase()}</span>
          <span>{profile.location.label.toUpperCase()}</span>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </div>
    </section>
  )
}
