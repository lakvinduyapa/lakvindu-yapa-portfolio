import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'

const links = ['About', 'Work', 'Experience', 'Skills', 'Contact']

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const overlay = useRef(null)
  const toggle = useRef(null)
  const navigationTimer = useRef(0)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(overlay.current, {
          display: open ? 'flex' : 'none',
          clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        })
        gsap.set('.menu-link__text', { yPercent: 0 })
        return
      }

      const timeline = gsap.timeline()

      if (open) {
        gsap.set(overlay.current, { display: 'flex' })
        timeline
          .fromTo(
            overlay.current,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' },
          )
          .fromTo(
            '.menu-link__text',
            { yPercent: 120 },
            { yPercent: 0, stagger: 0.07, duration: 0.8, ease: 'power4.out' },
            '-=.25',
          )
      } else {
        timeline
          .to(overlay.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.55,
            ease: 'power3.inOut',
          })
          .set(overlay.current, { display: 'none' })
      }
    }, overlay)

    return () => {
      context.revert()
      document.body.classList.remove('menu-open')
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const menu = overlay.current
    const toggleButton = toggle.current
    const menuLinks = Array.from(menu.querySelectorAll('button:not([disabled]), a[href]'))
    const focusable = [toggleButton, ...menuLinks].filter(Boolean)
    const focusFrame = window.requestAnimationFrame(() => menuLinks[0]?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      if (toggleButton) toggleButton.focus()
      else if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(navigationTimer.current), [])

  const navigate = (id) => {
    setOpen(false)
    window.clearTimeout(navigationTimer.current)
    navigationTimer.current = window.setTimeout(
      () => {
        const target = document.querySelector(`#${id.toLowerCase()}`)
        if (target) window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: { target } }))
      },
      450,
    )
  }

  return (
    <>
      <header className="nav shell">
        <button
          className={`nav__toggle interactive${open ? ' nav__toggle--open' : ''}`}
          ref={toggle}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close site navigation' : 'Open site navigation'}
        >
          <span>{open ? 'CLOSE' : 'MENU'}</span>
          <i aria-hidden="true">{open ? '×' : '+'}</i>
        </button>
      </header>
      <div className="menu" id="site-menu" ref={overlay} role="dialog" aria-modal={open ? 'true' : undefined} aria-label="Site navigation" aria-hidden={!open}>
        <div className="menu__meta micro">
          {profile.location.label.toUpperCase()}<br />OPEN TO LOCAL & GLOBAL OPPORTUNITIES
        </div>
        <nav className="menu__links" aria-label="Main navigation">
          {links.map((link, index) => (
            <button key={link} className="menu-link interactive" onClick={() => navigate(link)}>
              <span className="menu-link__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="menu-link__clip"><span className="menu-link__text">{link}</span></span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div className="menu__footer micro">© {new Date().getFullYear()} / {profile.displayName.toUpperCase()}</div>
      </div>
    </>
  )
}
