import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CinnamonCareCaseStudy.css'

import landingMain from '../../assets/CinnamonCare/Landing Page.png'
import landingTamil from '../../assets/CinnamonCare/Landing Page Tamil.png'
import landingSinhala from '../../assets/CinnamonCare/Landing Sinhala.png'
import diagnosticResult from '../../assets/CinnamonCare/Diagnostic Result.png'
import diseaseMap from '../../assets/CinnamonCare/Disease Distribution Map.png'
import productsCatalogue from '../../assets/CinnamonCare/Products Catalogue.png'
import recommendedProducts from '../../assets/CinnamonCare/Recommended Products for the relavent diagnostic.png'
import adminDashboard from '../../assets/CinnamonCare/Admin Main Dashboard.png'
import adminAddProducts from '../../assets/CinnamonCare/Add Products Admin.png'
import adminMappings from '../../assets/CinnamonCare/Product Mappings Admin Menu.png'
import adminSales from '../../assets/CinnamonCare/Sales Menu Admin.png'
import adminFeedback from '../../assets/CinnamonCare/Feedback and Requests Menu Admin.png'
import aiChatbot from '../../assets/CinnamonCare/AI Chatbot.png'

gsap.registerPlugin(ScrollTrigger)

const dims = { wide: [1920, 1032], chat: [1209, 801] }
const imageAlt = {
  landingMain: 'CinnamonCare agricultural platform landing page',
  landingTamil: 'CinnamonCare landing page in Tamil',
  landingSinhala: 'CinnamonCare landing page in Sinhala',
  diagnostic: 'CinnamonCare diagnostic result interface',
  map: 'CinnamonCare disease distribution map',
  catalogue: 'CinnamonCare agricultural products catalogue',
  recommended: 'CinnamonCare diagnosis-linked recommended products',
  dashboard: 'CinnamonCare administrative dashboard',
  addProducts: 'CinnamonCare admin product creation interface',
  mappings: 'CinnamonCare disease-to-product mapping administration',
  sales: 'CinnamonCare sales and order management administration',
  feedback: 'CinnamonCare feedback and requests administration',
  chatbot: 'CinnamonCare conversational AI assistant interface',
}

function Screen({ src, alt, size = dims.wide, className = '', loading = 'lazy' }) {
  return <div className={`cinnamon-screen ${className}`}><img src={src} alt={alt} width={size[0]} height={size[1]} loading={loading} decoding="async" /></div>
}

function Pipeline({ children }) { return <div className="cinnamon-pipeline">{children.map((item, index) => <span key={item}><b>{item}</b>{index < children.length - 1 && <i aria-hidden="true">↓</i>}</span>)}</div> }

export default function CinnamonCareCaseStudy({ project }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const mobile = window.matchMedia('(max-width: 768px)').matches
        gsap.from('.cinnamon-case__opening > *', { opacity: 0, y: mobile ? 18 : 30, stagger: .08, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: mobile ? 'top 90%' : 'top 82%', invalidateOnRefresh: true } })
        gsap.utils.toArray('.cinnamon-reveal', root.current).forEach((element) => gsap.from(element, { opacity: 0, y: mobile ? 26 : 50, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: mobile ? 'top 92%' : 'top 84%', invalidateOnRefresh: true } }))
        gsap.from('.cinnamon-pipeline span', { opacity: 0, y: 14, stagger: .1, duration: .45, ease: 'power2.out', scrollTrigger: { trigger: '.cinnamon-pipeline', start: 'top 86%', invalidateOnRefresh: true } })
      })
    }, root)
    return () => { media.revert(); context.revert() }
  }, [])

  return (
    <article className="cinnamon-case" ref={root} aria-labelledby="cinnamon-case-title">
      <header className="cinnamon-case__opening">
        <div className="cinnamon-case__index micro">PROJECT / 02</div>
        <h3 id="cinnamon-case-title">CINNAMON<br /><i>CARE</i></h3>
        <div className="cinnamon-case__summary"><p className="micro">FREELANCE / FULL-STACK / AGRITECH</p><p className="micro">FULL-STACK DEVELOPMENT / AI INTEGRATION</p><p>{project.description}</p></div>
      </header>

      <section className="cinnamon-chapter cinnamon-hero-chapter" aria-labelledby="cinnamon-hero-title">
        <div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 01 / INTELLIGENT PLANT HEALTH</p><h4 id="cinnamon-hero-title">INTELLIGENT PLANT HEALTH.<br /><i>CONNECTED AGRICULTURAL CARE.</i></h4><p>Accessible plant-health information, geographical insight, and agricultural resources connected in one decision-support platform.</p></div>
        <figure className="cinnamon-hero-visual cinnamon-reveal"><Screen src={landingMain} alt={imageAlt.landingMain} loading="eager" /><figcaption className="micro">PUBLIC PLATFORM / LANDING EXPERIENCE</figcaption></figure>
        <div className="cinnamon-language-screens cinnamon-reveal"><div className="cinnamon-languages"><p className="micro">BUILT FOR THREE LANGUAGES</p><strong>ENGLISH / SINHALA / TAMIL</strong><p>i18next localization, persisted language preferences, and PostgreSQL JSONB support for translated catalogue content.</p></div><div className="cinnamon-language-screens__pair"><figure><Screen src={landingSinhala} alt={imageAlt.landingSinhala} /><figcaption className="micro">SINHALA / LOCALIZED INTERFACE</figcaption></figure><figure><Screen src={landingTamil} alt={imageAlt.landingTamil} /><figcaption className="micro">TAMIL / LOCALIZED INTERFACE</figcaption></figure></div></div>
      </section>

      <section className="cinnamon-chapter cinnamon-diagnosis" aria-labelledby="cinnamon-diagnosis-title">
        <div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 02 / COMPUTER VISION / CNN INTEGRATION</p><h4 id="cinnamon-diagnosis-title">FROM IMAGE.<br /><i>TO INSIGHT.</i></h4><p>The user uploads a plant image; FastAPI validates and preprocesses it, runs CNN inference, maps the output to PostgreSQL disease records, and presents a structured result.</p></div>
        <figure className="cinnamon-diagnostic-visual cinnamon-reveal"><Screen src={diagnosticResult} alt={imageAlt.diagnostic} /><figcaption className="micro">DIAGNOSTIC RESULT / USER-FACING INFERENCE</figcaption></figure>
        <div className="cinnamon-pipeline" aria-label="Image upload to diagnosis pipeline"><Pipeline>{['IMAGE UPLOAD', 'FASTAPI PREPROCESSING', 'CNN INFERENCE', 'PREDICTION MAPPING', 'POSTGRESQL KNOWLEDGE', 'DIAGNOSIS']}</Pipeline></div>
        <div className="cinnamon-classifications cinnamon-reveal"><p className="micro">SUPPORTED CLASSIFICATIONS</p><ul>{['Pestalotiopsis', 'Colletotrichum', 'Stripe Canker', 'Trioza cinnamomi', 'Healthy'].map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="cinnamon-chapter cinnamon-map-chapter" aria-labelledby="cinnamon-map-title"><div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 03 / GEOSPATIAL VISUALIZATION</p><h4 id="cinnamon-map-title">BEYOND THE<br /><i>INDIVIDUAL PLANT.</i></h4><p>Recorded diagnosis locations become geographical information that users can explore. The map represents application-recorded locations, not a national disease-surveillance dataset.</p><p className="cinnamon-techline">MAPLIBRE GL JS / MAPTILER / GEOJSON / REACT / FASTAPI / POSTGRESQL</p></div><figure className="cinnamon-wide-visual cinnamon-reveal"><Screen src={diseaseMap} alt={imageAlt.map} /><figcaption className="micro">DISEASE DISTRIBUTION / RECORDED APPLICATION LOCATIONS</figcaption></figure></section>

      <section className="cinnamon-chapter cinnamon-commerce" aria-labelledby="cinnamon-commerce-title"><div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 04 / AGRICULTURAL E-COMMERCE</p><h4 id="cinnamon-commerce-title">FROM DIAGNOSIS<br /><i>TO DISCOVERY.</i></h4><p>Disease records connect to relevant agricultural products through structured database relationships. The CNN does not directly generate recommendations.</p></div><div className="cinnamon-commerce-grid"><figure className="cinnamon-reveal"><Screen src={recommendedProducts} alt={imageAlt.recommended} /><figcaption className="micro">DIAGNOSIS-LINKED PRODUCTS / DATABASE MAPPING</figcaption></figure><figure className="cinnamon-reveal"><Screen src={productsCatalogue} alt={imageAlt.catalogue} /><figcaption className="micro">PRODUCT CATALOGUE / CASH-ON-DELIVERY CHECKOUT</figcaption></figure></div></section>

      <section className="cinnamon-chapter cinnamon-ai" aria-labelledby="cinnamon-ai-title"><div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 05 / CNN INFERENCE / CONVERSATIONAL AI</p><h4 id="cinnamon-ai-title">TWO FORMS<br /><i>OF INTELLIGENCE.</i></h4><p>Computer vision classifies supported plant conditions. A separate conversational assistant helps users navigate CinnamonCare, understand available disease information, and continue the diagnosis workflow.</p></div><div className="cinnamon-ai-layout"><div className="cinnamon-ai-notes cinnamon-reveal"><div><p className="micro">VISION / CNN</p><h5>TENSORFLOW / KERAS CNN</h5><p>Integrated into FastAPI inference and result mapping workflows.</p></div><div><p className="micro">CONVERSATION / QWEN3</p><h5>OLLAMA / QWEN3 / FASTAPI</h5><p>Application and LLM integration by Lakvindu. Qwen3 does not perform image classification.</p></div></div><figure className="cinnamon-chatbot cinnamon-reveal"><Screen src={aiChatbot} alt={imageAlt.chatbot} size={dims.chat} /><figcaption className="micro">CONVERSATIONAL AI ASSISTANT / REAL APPLICATION INTERFACE</figcaption></figure></div><div className="cinnamon-dual-flow cinnamon-reveal"><div><p className="micro">FLOW A / IMAGE CLASSIFICATION</p><Pipeline>{['PLANT IMAGE', 'FASTAPI', 'CNN', 'DIAGNOSIS']}</Pipeline></div><div><p className="micro">FLOW B / CONVERSATIONAL ASSISTANCE</p><Pipeline>{['USER QUESTION', 'FASTAPI', 'VERIFIED CONTEXT', 'OLLAMA / QWEN3', 'RESPONSE']}</Pipeline></div></div></section>

      <section className="cinnamon-chapter cinnamon-admin" aria-labelledby="cinnamon-admin-title"><div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 06 / ADMINISTRATION / APPLICATION OPERATIONS</p><h4 id="cinnamon-admin-title">BUILT TO MANAGE<br /><i>THE ENTIRE ECOSYSTEM.</i></h4><p>A role-protected workspace connects catalogue creation, disease-product relationships, order operations, and feedback management.</p></div><figure className="cinnamon-admin-dashboard cinnamon-reveal"><Screen src={adminDashboard} alt={imageAlt.dashboard} /><figcaption className="micro">ADMIN WORKSPACE / OPERATIONAL OVERVIEW</figcaption></figure><div className="cinnamon-admin-grid"><figure className="cinnamon-reveal"><Screen src={adminAddProducts} alt={imageAlt.addProducts} /><figcaption className="micro">CATALOGUE MANAGEMENT / PRODUCT CREATION</figcaption></figure><figure className="cinnamon-reveal"><Screen src={adminMappings} alt={imageAlt.mappings} /><figcaption className="micro">DATABASE RELATIONSHIPS / PRODUCT MAPPING</figcaption></figure><figure className="cinnamon-reveal"><Screen src={adminSales} alt={imageAlt.sales} /><figcaption className="micro">OPERATIONS / SALES MANAGEMENT</figcaption></figure><figure className="cinnamon-reveal"><Screen src={adminFeedback} alt={imageAlt.feedback} /><figcaption className="micro">OPERATIONS / FEEDBACK MANAGEMENT</figcaption></figure></div></section>

      <section className="cinnamon-chapter cinnamon-engineering" aria-labelledby="cinnamon-engineering-title"><div className="cinnamon-copy cinnamon-reveal"><p className="micro">CHAPTER 07 / ENGINEERED BEYOND THE MODEL</p><h4 id="cinnamon-engineering-title">ENGINEERED<br /><i>BEYOND THE MODEL.</i></h4><p>The intelligence is one component. The engineering connects everything.</p></div><div className="cinnamon-index cinnamon-reveal">{[['01', 'FULL-STACK APPLICATION', 'React frontend, FastAPI backend, customer and administrative interfaces.'], ['02', 'MODEL INTEGRATION', 'CNN inference integrated into diagnosis workflows.'], ['03', 'RELATIONAL DATA', 'PostgreSQL architecture connecting customers, diseases, products, diagnoses, orders, and feedback.'], ['04', 'GEOSPATIAL VISUALIZATION', 'Interactive location-based disease monitoring through MapLibre and related services.'], ['05', 'DIGITAL COMMERCE', 'Product discovery, cart, cash-on-delivery checkout, orders, and catalogue administration.'], ['06', 'INTELLIGENT ACCESSIBILITY', 'Trilingual support and Ollama/Qwen3 conversational AI integration.']].map(([number, title, text]) => <div key={number}><span className="micro">{number}</span><h5>{title}</h5><p>{text}</p></div>)}</div><div className="cinnamon-architecture cinnamon-reveal"><p className="micro">SYSTEM ARCHITECTURE / FULL-STACK CONNECTIONS</p><div className="cinnamon-architecture-grid"><span>REACT 19<br />VITE / I18NEXT<br />MAPLIBRE</span><b>↔</b><span>FASTAPI<br />REST / JWT<br />PYDANTIC</span><b>↔</b><span>POSTGRESQL<br />SQLALCHEMY<br />ALEMBIC</span><b>↔</b><span>CNN INFERENCE<br />OLLAMA / QWEN3<br />CLOUDINARY</span></div></div></section>

      <section className="cinnamon-details cinnamon-reveal" aria-label="CinnamonCare project details"><div><p className="micro">PROJECT DETAILS / 02</p><p>{project.description}</p></div><dl><div><dt className="micro">ROLE</dt><dd>{project.role}</dd></div><div><dt className="micro">TYPE</dt><dd>Freelance AgriTech Web Application</dd></div><div><dt className="micro">STATUS</dt><dd><span className="cinnamon-status-dot" />{project.status}</dd></div></dl><div><p className="micro">TECHNOLOGIES</p><ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    </article>
  )
}
