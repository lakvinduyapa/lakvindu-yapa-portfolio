import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import './NksClothingCaseStudy.css'

import landingOne from '../../assets/projects/nks-clothing/nks-landing-01.jpg'
import landingTwo from '../../assets/projects/nks-clothing/nks-landing-02.jpg'
import landingThree from '../../assets/projects/nks-clothing/nks-landing-03.jpg'
import productPage from '../../assets/projects/nks-clothing/nks-product-page.jpg'
import adminDashboard from '../../assets/projects/nks-clothing/nks-admin-dashboard.jpg'
import adminProducts from '../../assets/projects/nks-clothing/nks-admin-products.jpg'
import adminColours from '../../assets/projects/nks-clothing/nks-admin-colours.jpg'
import stockHistory from '../../assets/projects/nks-clothing/nks-stock-history.jpg'
import returnsMenu from '../../assets/projects/nks-clothing/nks-returns.jpg'

gsap.registerPlugin(ScrollTrigger)

const imageDimensions = {
  landingOne: [1920, 965],
  landingTwo: [1919, 958],
  landingThree: [1920, 962],
  productPage: [1920, 962],
  adminDashboard: [1920, 965],
  adminProducts: [1920, 963],
  adminColours: [1920, 963],
  stockHistory: [1920, 962],
  returnsMenu: [1920, 961],
}

function NksImage({ src, alt, dimensions, className = '', loading = 'lazy' }) {
  return (
    <img className={className} src={src} alt={alt} width={dimensions[0]} height={dimensions[1]} loading={loading} decoding="async" />
  )
}

export default function NksClothingCaseStudy({ project }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const animationContext = gsap.context(() => {
      media.add({
        desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
      }, ({ conditions }) => {
        const mobile = conditions.mobile

        gsap.from('.nks-case__opening > *', {
          opacity: 0,
          y: mobile ? 18 : 28,
          stagger: mobile ? 0.07 : 0.09,
          duration: mobile ? 0.62 : 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: mobile ? 'top 88%' : 'top 78%', invalidateOnRefresh: true },
        })
        gsap.fromTo('.nks-case__primary',
          { opacity: mobile ? 0.55 : 0.35, scale: mobile ? 0.95 : 0.88, y: mobile ? 28 : 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nks-case__primary',
              start: mobile ? 'top 92%' : 'top 88%',
              end: mobile ? 'bottom 64%' : 'bottom 42%',
              scrub: mobile ? 0.45 : 0.7,
              invalidateOnRefresh: true,
            },
          },
        )

        const chapterVisuals = gsap.utils.toArray(
          '.nks-case__continuation figure, .nks-case__product-visual, .nks-case__management-visual, .nks-case__inventory-visual',
          root.current,
        )
        chapterVisuals.forEach((visual) => {
          gsap.from(visual, {
            opacity: 0,
            y: mobile ? 28 : 46,
            duration: mobile ? 0.68 : 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: visual, start: mobile ? 'top 91%' : 'top 84%', invalidateOnRefresh: true },
          })
        })

        gsap.from('.nks-case__details > *, .nks-case__actions', {
          opacity: 0,
          y: mobile ? 18 : 24,
          stagger: mobile ? 0.06 : 0.08,
          duration: mobile ? 0.58 : 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.nks-case__details', start: mobile ? 'top 90%' : 'top 80%', invalidateOnRefresh: true },
        })
      })
    }, root)

    return () => {
      media.revert()
      animationContext.revert()
    }
  }, [])

  return (
    <article className="nks-case" ref={root} aria-labelledby="nks-case-title">
      <header className="nks-case__opening">
        <div className="nks-case__index micro">PROJECT / 04</div>
        <h3 id="nks-case-title">NKS <i>CLOTHING</i></h3>
        <div className="nks-case__summary">
          <p className="micro">FREELANCE <span>·</span> FULL-STACK <span>·</span> E-COMMERCE</p>
          <p className="micro"><span className="nks-case__status-dot" /> ONGOING DEVELOPMENT</p>
          <p>A modern clothing storefront combining an accessible shopping experience with practical administrative tools for a growing fashion brand.</p>
        </div>
      </header>

      <section className="nks-case__chapters" aria-label="NKS Clothing project chapters">
        <section className="nks-case__storefront" aria-labelledby="nks-storefront-title">
          <div className="nks-case__chapter-heading">
            <p className="micro">CHAPTER 01 / STOREFRONT EXPERIENCE</p>
            <h4 id="nks-storefront-title">THE COLLECTION<br /><i>IN MOTION.</i></h4>
            <p>Connected storefront views make the collection easy to browse while keeping the visual language of the fashion brand present throughout the journey.</p>
          </div>
          <figure className="nks-case__primary">
            <NksImage src={landingOne} alt="NKS Clothing storefront landing page" dimensions={imageDimensions.landingOne} />
            <figcaption className="micro">STOREFRONT / LANDING 01</figcaption>
          </figure>
          <div className="nks-case__continuation">
            <figure><NksImage src={landingTwo} alt="NKS Clothing storefront continuation view" dimensions={imageDimensions.landingTwo} /><figcaption className="micro">STOREFRONT / LANDING 02</figcaption></figure>
            <figure><NksImage src={landingThree} alt="NKS Clothing storefront collection view" dimensions={imageDimensions.landingThree} /><figcaption className="micro">STOREFRONT / LANDING 03</figcaption></figure>
          </div>
        </section>

        <section className="nks-case__product" aria-labelledby="nks-product-title">
          <div className="nks-case__chapter-heading nks-case__chapter-heading--product">
            <p className="micro">CHAPTER 02 / CUSTOMER EXPERIENCE / PRODUCT DISCOVERY</p>
            <h4 id="nks-product-title">EXPLORE THE<br /><i>COLLECTION.</i></h4>
            <p>A focused product-browsing experience designed to help customers explore clothing items and their details before ordering.</p>
          </div>
          <figure className="nks-case__product-visual">
            <NksImage src={productPage} alt="NKS Clothing product page" dimensions={imageDimensions.productPage} />
            <figcaption className="micro">PRODUCT PAGE / CUSTOMER EXPERIENCE</figcaption>
          </figure>
        </section>

        <section className="nks-case__management" aria-labelledby="nks-management-title">
          <div className="nks-case__chapter-heading">
            <p className="micro">CHAPTER 03 / ADMIN EXPERIENCE / STORE MANAGEMENT</p>
            <h4 id="nks-management-title">BEHIND THE<br /><i>STOREFRONT.</i></h4>
            <p>The administrative workspace supports the practical work of managing products and their available colours.</p>
          </div>
          <figure className="nks-case__management-visual nks-case__management-visual--primary">
            <NksImage src={adminProducts} alt="NKS Clothing admin product management interface" dimensions={imageDimensions.adminProducts} />
            <figcaption className="micro">PRODUCT MANAGEMENT</figcaption>
          </figure>
          <div className="nks-case__management-support">
            <figure className="nks-case__management-visual"><NksImage src={adminDashboard} alt="NKS Clothing administrative dashboard" dimensions={imageDimensions.adminDashboard} /><figcaption className="micro">STORE OPERATIONS / ADMIN DASHBOARD</figcaption></figure>
            <figure className="nks-case__management-visual"><NksImage src={adminColours} alt="NKS Clothing administrative colour management interface" dimensions={imageDimensions.adminColours} /><figcaption className="micro">PRODUCT COLOUR MANAGEMENT / ADMIN</figcaption></figure>
          </div>
        </section>

        <section className="nks-case__inventory" aria-labelledby="nks-inventory-title">
          <div className="nks-case__chapter-heading">
            <p className="micro">CHAPTER 04 / ADMIN EXPERIENCE / INVENTORY OPERATIONS</p>
            <h4 id="nks-inventory-title">CONTROL BEHIND<br /><i>EVERY ORDER.</i></h4>
            <p>Supporting operational views keep stock history and returns management close to the day-to-day work of the store.</p>
          </div>
          <div className="nks-case__inventory-pair">
            <figure className="nks-case__inventory-visual"><NksImage src={stockHistory} alt="NKS Clothing stock history interface" dimensions={imageDimensions.stockHistory} /><figcaption className="micro">INVENTORY / STOCK HISTORY</figcaption></figure>
            <figure className="nks-case__inventory-visual"><NksImage src={returnsMenu} alt="NKS Clothing returns management interface" dimensions={imageDimensions.returnsMenu} /><figcaption className="micro">OPERATIONS / RETURNS MANAGEMENT</figcaption></figure>
          </div>
        </section>
      </section>

      <section className="nks-case__details" aria-label="NKS Clothing project details">
        <div className="nks-case__description">
          <p className="micro">PROJECT DETAILS / 04</p>
          <p>{project.description}</p>
        </div>
        <dl className="nks-case__facts">
          <div><dt className="micro">ROLE</dt><dd>{project.role}</dd></div>
          <div><dt className="micro">TYPE</dt><dd>Freelance / Full-Stack E-Commerce</dd></div>
          <div><dt className="micro">STATUS</dt><dd><span className="nks-case__status-dot" />Ongoing Development</dd></div>
        </dl>
        <div className="nks-case__lists">
          <div><p className="micro">TECHNOLOGIES</p><ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><p className="micro">CORE CAPABILITIES</p><ul><li>Clothing Collection Showcase</li><li>Product Browsing</li><li>Product Details</li><li>WhatsApp Ordering</li><li>Administrative Dashboard</li><li>Product Management</li><li>Product Colour Management</li><li>Stock History</li><li>Returns Management</li></ul></div>
        </div>
      </section>

      <footer className="nks-case__actions">
        <div className="nks-case__action-status">
          <span className="nks-case__action-label micro">STATUS</span>
          <span className="nks-case__action-value micro"><i className="nks-case__status-dot" />IN DEVELOPMENT</span>
        </div>
      </footer>
    </article>
  )
}
