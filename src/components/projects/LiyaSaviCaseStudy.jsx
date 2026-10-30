import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Github } from 'lucide-react'
import './LiyaSaviCaseStudy.css'

gsap.registerPlugin(ScrollTrigger)

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }

export default function LiyaSaviCaseStudy({ project }) {
  const root = useRef(null)
  const [landingFirst, landingSecond, catalogue, productView, adminDashboard, adminProducts] = project.screenshots

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const animationContext = gsap.context(() => {
      media.add({
        desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
      }, ({ conditions }) => {
        const mobile = conditions.mobile

        gsap.from('.liya-case__opening > *', {
          opacity: 0,
          y: mobile ? 18 : 26,
          stagger: mobile ? 0.07 : 0.09,
          duration: mobile ? 0.62 : 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: mobile ? 'top 88%' : 'top 78%', invalidateOnRefresh: true },
        })
        gsap.fromTo('.liya-case__landing-image',
          { opacity: mobile ? 0.55 : 0.4, scale: mobile ? 0.96 : 0.9, y: mobile ? 28 : 45 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: mobile ? 0.08 : 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.liya-case__landing',
              start: mobile ? 'top 92%' : 'top 86%',
              end: mobile ? 'bottom 62%' : 'bottom 38%',
              scrub: mobile ? 0.45 : 0.7,
              invalidateOnRefresh: true,
            },
          },
        )
        gsap.from('.liya-case__discovery-visual', {
          opacity: 0,
          x: mobile ? 0 : 45,
          y: mobile ? 34 : 50,
          duration: mobile ? 0.7 : 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.liya-case__discovery-visual', start: mobile ? 'top 90%' : 'top 78%', invalidateOnRefresh: true },
        })
        gsap.from('.liya-case__admin-visual', {
          opacity: 0,
          y: mobile ? 30 : 65,
          duration: mobile ? 0.7 : 0.9,
          stagger: mobile ? 0.09 : 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.liya-case__admin', start: mobile ? 'top 88%' : 'top 80%', invalidateOnRefresh: true },
        })
        gsap.from('.liya-case__details > *', {
          opacity: 0,
          y: mobile ? 18 : 24,
          stagger: mobile ? 0.06 : 0.08,
          duration: mobile ? 0.58 : 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.liya-case__details', start: mobile ? 'top 90%' : 'top 80%', invalidateOnRefresh: true },
        })
      })
    }, root)

    return () => {
      media.revert()
      animationContext.revert()
    }
  }, [])

  return (
    <article className="liya-case" ref={root} aria-labelledby="liya-case-title">
      <header className="liya-case__opening">
        <div className="liya-case__index micro">PROJECT / 03</div>
        <h3 id="liya-case-title">LIYA <i>SAVI</i></h3>
        <div className="liya-case__summary">
          <p className="micro">WOMEN EMPOWERMENT MARKETPLACE</p>
          <p className="micro">UNIVERSITY PROJECT <span>·</span> FULL-STACK <span>·</span> COMPLETED</p>
          <p>{project.description}</p>
        </div>
      </header>

      <section className="liya-case__landing" aria-labelledby="liya-landing-title">
        <div className="liya-case__section-heading">
          <p className="micro">CHAPTER 01 / MARKETPLACE EXPERIENCE</p>
          <h4 id="liya-landing-title">A DIGITAL<br /><i>STOREFRONT.</i></h4>
          <p>From the first welcome to the first product discovery, Liya Savi gives women entrepreneurs an accessible place to be seen.</p>
        </div>
        <div className="liya-case__landing-images">
          <figure className="liya-case__image-card liya-case__image-card--first">
            <img className="liya-case__landing-image" src={landingFirst.src} alt={landingFirst.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">LANDING / 01</figcaption>
          </figure>
          <figure className="liya-case__image-card liya-case__image-card--second">
            <img className="liya-case__landing-image" src={landingSecond.src} alt={landingSecond.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">LANDING / 02</figcaption>
          </figure>
        </div>
      </section>

      <section className="liya-case__discovery" aria-labelledby="liya-discovery-title">
        <div className="liya-case__discovery-copy">
          <p className="micro">CHAPTER 02 / PRODUCT DISCOVERY</p>
          <h4 id="liya-discovery-title">FIND<br /><i>WITH INTENT.</i></h4>
          <p>The catalogue keeps the marketplace open and legible. A product view then narrows the experience into a considered buying moment.</p>
        </div>
        <div className="liya-case__discovery-visual">
          <figure className="liya-case__catalogue">
            <img src={catalogue.src} alt={catalogue.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">PRODUCT CATALOGUE / PRIMARY DISCOVERY</figcaption>
          </figure>
          <figure className="liya-case__product-view">
            <img src={productView.src} alt={productView.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">PRODUCT VIEW / DETAIL</figcaption>
          </figure>
        </div>
      </section>

      <section className="liya-case__admin" aria-labelledby="liya-admin-title">
        <div className="liya-case__admin-copy">
          <p className="micro">CHAPTER 03 / PLATFORM OPERATIONS</p>
          <h4 id="liya-admin-title">BUILT TO<br /><i>OPERATE.</i></h4>
          <p>Behind the storefront, administrative tools support product management and the ongoing work of running the marketplace.</p>
        </div>
        <div className="liya-case__admin-visuals">
          <figure className="liya-case__admin-visual">
            <img src={adminDashboard.src} alt={adminDashboard.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">ADMIN DASHBOARD</figcaption>
          </figure>
          <figure className="liya-case__admin-visual">
            <img src={adminProducts.src} alt={adminProducts.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            <figcaption className="micro">PRODUCT MANAGEMENT</figcaption>
          </figure>
        </div>
      </section>

      <section className="liya-case__details" aria-label="Liya Savi project details">
        <div className="liya-case__description">
          <p className="micro">CHAPTER 04 / PROJECT DETAILS</p>
          <p>{project.description}</p>
        </div>
        <dl className="liya-case__facts">
          <div><dt className="micro">ROLE</dt><dd>{project.role}</dd></div>
          <div><dt className="micro">TYPE</dt><dd>University Project / Full-Stack E-Commerce</dd></div>
          <div><dt className="micro">STATUS</dt><dd><span className="liya-case__live-dot" />{project.status}</dd></div>
        </dl>
        <div className="liya-case__lists">
          <div><p className="micro">STACK</p><ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><p className="micro">CAPABILITIES</p><ul><li>Multilingual Interface</li><li>Product Catalogue</li><li>Product Details</li><li>Entrepreneur Storefronts</li><li>Administrative Product Management</li></ul></div>
        </div>
      </section>

      <footer className="liya-case__actions">
        <div className="liya-case__action-status">
          <span className="liya-case__action-label micro">STATUS</span>
          <span className="liya-case__action-value micro"><i className="liya-case__live-dot" />PROJECT SOURCE AVAILABLE</span>
        </div>
        <div className="liya-case__action-source">
          <span className="liya-case__action-label micro">SOURCE</span>
          <a className="liya-case__action interactive" href={project.githubUrl} aria-label="View Liya Savi on GitHub (opens in a new tab)" {...externalLinkProps}>VIEW ON GITHUB <Github size={17} aria-hidden="true" /><ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </footer>
    </article>
  )
}
