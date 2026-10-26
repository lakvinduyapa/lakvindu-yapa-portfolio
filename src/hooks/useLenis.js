import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let refreshFrame = 0
    let orientationTimer = 0
    let active = true

    ScrollTrigger.config({ ignoreMobileResize: true })

    const refresh = () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    const refreshAfterRotation = () => {
      window.clearTimeout(orientationTimer)
      orientationTimer = window.setTimeout(refresh, 180)
    }
    const pendingImages = Array.from(document.images).filter((image) => !image.complete)
    pendingImages.forEach((image) => {
      image.addEventListener('load', refresh, { once: true })
      image.addEventListener('error', refresh, { once: true })
    })
    window.addEventListener('load', refresh, { once: true })
    window.addEventListener('orientationchange', refreshAfterRotation)
    document.fonts?.ready.then(() => { if (active) refresh() })
    refresh()

    let lenis
    let update
    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false,
      })
      update = (time) => lenis.raf(time * 1000)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)
    }

    const navigateToSection = (event) => {
      const target = event.detail?.target
      if (!(target instanceof HTMLElement)) return

      ScrollTrigger.refresh()
      window.requestAnimationFrame(() => {
        if (!lenis) {
          window.scrollTo({
            top: window.scrollY + target.getBoundingClientRect().top,
            behavior: 'auto',
          })
          return
        }

        lenis.scrollTo(target, {
          duration: 1.05,
          onComplete: () => {
            const correction = target.getBoundingClientRect().top
            if (Math.abs(correction) > 2) {
              lenis.scrollTo(window.scrollY + correction, { duration: 0.35 })
            }
          },
        })
      })
    }
    window.addEventListener('portfolio:navigate', navigateToSection)

    return () => {
      active = false
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(orientationTimer)
      pendingImages.forEach((image) => {
        image.removeEventListener('load', refresh)
        image.removeEventListener('error', refresh)
      })
      window.removeEventListener('load', refresh)
      window.removeEventListener('orientationchange', refreshAfterRotation)
      window.removeEventListener('portfolio:navigate', navigateToSection)
      lenis?.destroy()
      if (update) gsap.ticker.remove(update)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [])
}
