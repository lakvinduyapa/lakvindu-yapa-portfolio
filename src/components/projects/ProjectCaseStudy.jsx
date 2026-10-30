import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import './ProjectCaseStudy.css'
import lmsBackupRestore from '../../assets/projects/private-tutoring-lms/lms-backup-restore.jpg'
import lmsBatches from '../../assets/projects/private-tutoring-lms/lms-batches.jpg'
import lmsCourses from '../../assets/projects/private-tutoring-lms/lms-courses.jpg'
import lmsLessonsFirst from '../../assets/projects/private-tutoring-lms/lms-lessons-first-half.jpg'
import lmsLessonsSecond from '../../assets/projects/private-tutoring-lms/lms-lessons-second-half.jpg'

gsap.registerPlugin(ScrollTrigger)

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }

export default function ProjectCaseStudy({ project }) {
  const root = useRef(null)
  const [landing, admin] = project.screenshots

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const animationContext = gsap.context(() => {
      media.add({
        desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
      }, ({ conditions }) => {
        const mobile = conditions.mobile

        gsap.from('.lms-case__opening > *', {
          opacity: 0,
          y: mobile ? 18 : 26,
          stagger: mobile ? 0.07 : 0.09,
          duration: mobile ? 0.62 : 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: mobile ? 'top 88%' : 'top 75%', invalidateOnRefresh: true },
        })
        gsap.fromTo('.lms-case__primary',
          { opacity: mobile ? 0.55 : 0.35, scale: mobile ? 0.95 : 0.82, y: mobile ? 28 : 55 },
          {
            opacity: 1,
            scale: mobile ? 1 : 0.95,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.lms-case__primary',
              start: mobile ? 'top 92%' : 'top 88%',
              end: mobile ? 'bottom 64%' : 'bottom 42%',
              scrub: mobile ? 0.45 : 0.6,
              invalidateOnRefresh: true,
            },
          },
        )
        gsap.from('.lms-case__admin-visual', {
          opacity: 0,
          y: mobile ? 34 : 80,
          x: mobile ? 0 : 22,
          duration: mobile ? 0.7 : 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.lms-case__admin-visual', start: mobile ? 'top 90%' : 'top 76%', invalidateOnRefresh: true },
        })
        gsap.from('.lms-case__capability-pair .lms-case__capability-visual', {
          opacity: 0,
          y: mobile ? 28 : 45,
          duration: mobile ? 0.65 : 0.75,
          stagger: mobile ? 0.1 : 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.lms-case__capabilities', start: mobile ? 'top 88%' : 'top 82%', invalidateOnRefresh: true },
        })
        gsap.from('.lms-case__backup-visual', {
          opacity: 0,
          y: mobile ? 30 : 55,
          x: mobile ? 0 : 18,
          duration: mobile ? 0.68 : 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.lms-case__backup-visual', start: mobile ? 'top 90%' : 'top 82%', invalidateOnRefresh: true },
        })
        gsap.from('.lms-case__details > *', {
          opacity: 0,
          y: mobile ? 18 : 24,
          stagger: mobile ? 0.06 : 0.08,
          duration: mobile ? 0.58 : 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.lms-case__details', start: mobile ? 'top 90%' : 'top 78%', invalidateOnRefresh: true },
        })
      })
    }, root)

    return () => {
      media.revert()
      animationContext.revert()
    }
  }, [])

  return (
    <article className="lms-case" ref={root} aria-labelledby="lms-case-title">
      <header className="lms-case__opening">
        <div className="lms-case__index micro">PROJECT / 01</div>
        <h3 id="lms-case-title">PRIVATE<br /><i>TUTORING LMS</i></h3>
        <div className="lms-case__summary">
          <p className="micro">{project.category.toUpperCase()} <span>·</span> {project.status.toUpperCase()}</p>
          <p>{project.context}</p>
        </div>
      </header>

      <p className="lms-case__chapter-marker micro">CHAPTER 01 / STUDENT LEARNING EXPERIENCE</p>
      <figure className="lms-case__primary">
        <div className="lms-case__screen lms-case__screen--landing">
          <img src={landing.src} alt={landing.alt} width="1906" height="953" loading="lazy" decoding="async" />
        </div>
        <figcaption className="lms-case__caption micro"><span>STUDENT LEARNING PORTAL</span><span>WEB APPLICATION / LMS</span></figcaption>
      </figure>

      <section className="lms-case__admin" aria-labelledby="lms-admin-title">
        <div className="lms-case__admin-copy">
          <p className="micro">CHAPTER 02 / PLATFORM OPERATIONS</p>
          <h4 id="lms-admin-title">ADMIN<br /><i>DASHBOARD.</i></h4>
          <p>Administrators can manage the day-to-day academic work from the same platform.</p>
        </div>
        <figure className="lms-case__admin-visual">
          <div className="lms-case__screen lms-case__screen--admin">
            <img src={admin.src} alt={admin.alt} width="1921" height="953" loading="lazy" decoding="async" />
          </div>
          <figcaption className="micro">ADMIN DASHBOARD</figcaption>
        </figure>
      </section>

      <section className="lms-case__capabilities" aria-labelledby="lms-capabilities-title">
        <header className="lms-case__capabilities-heading">
          <p className="micro">CHAPTER 03 / PLATFORM CAPABILITIES / LMS</p>
          <h4 id="lms-capabilities-title">COURSES, BATCHES<br /><i>&amp; LESSONS.</i></h4>
          <p>Tools for managing course content, student batches, and learning materials.</p>
        </header>

        <div className="lms-case__capability-pair lms-case__capability-pair--management">
          <figure className="lms-case__capability-visual">
            <div className="lms-case__screen"><img src={lmsCourses} alt="LMS course management interface" width="1920" height="1080" loading="lazy" decoding="async" /></div>
            <figcaption className="lms-case__capability-caption micro"><span>01 / COURSE MANAGEMENT</span></figcaption>
          </figure>
          <figure className="lms-case__capability-visual">
            <div className="lms-case__screen"><img src={lmsBatches} alt="LMS batch management interface" width="1920" height="1080" loading="lazy" decoding="async" /></div>
            <figcaption className="lms-case__capability-caption micro"><span>02 / BATCH MANAGEMENT</span></figcaption>
          </figure>
        </div>

        <div className="lms-case__capability-pair lms-case__capability-pair--lessons">
          <figure className="lms-case__capability-visual">
            <div className="lms-case__screen"><img src={lmsLessonsFirst} alt="LMS lessons interface, first section" width="1920" height="1080" loading="lazy" decoding="async" /></div>
            <figcaption className="lms-case__capability-caption micro"><span>03 / LEARNING CONTENT</span></figcaption>
          </figure>
          <figure className="lms-case__capability-visual">
            <div className="lms-case__screen"><img src={lmsLessonsSecond} alt="LMS lessons interface, second section" width="1920" height="1080" loading="lazy" decoding="async" /></div>
            <figcaption className="lms-case__capability-caption micro"><span>04 / LEARNING CONTENT</span></figcaption>
          </figure>
        </div>

      </section>

      <section className="lms-case__backup" aria-labelledby="lms-backup-title">
        <div className="lms-case__backup-copy">
          <p className="micro">CHAPTER 04 / SUPPORTING CAPABILITY / LMS</p>
          <h4 id="lms-backup-title">BACKUP<br /><i>&amp; RESTORE.</i></h4>
          <p>The system includes local and online backup and restore workflows to help recover important academic data when needed.</p>
        </div>
        <figure className="lms-case__backup-visual">
          <div className="lms-case__screen"><img src={lmsBackupRestore} alt="LMS backup and restore interface" width="1920" height="1080" loading="lazy" decoding="async" /></div>
          <figcaption className="lms-case__capability-caption micro"><span>BACKUP &amp; RESTORE</span></figcaption>
        </figure>
      </section>

      <section className="lms-case__details" aria-label="Private Tutoring LMS project details">
        <div className="lms-case__description">
          <p className="micro">CHAPTER 05 / PROJECT DETAILS / 01</p>
          <p>{project.description}</p>
        </div>
        <dl className="lms-case__facts">
          <div><dt className="micro">ROLE</dt><dd>{project.role}</dd></div>
          <div><dt className="micro">TYPE</dt><dd>Freelance / Full-Stack</dd></div>
          <div><dt className="micro">STATUS</dt><dd><span className="lms-case__live-dot" />Completed</dd></div>
        </dl>
        <div className="lms-case__lists">
          <div><p className="micro">STACK</p><ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><p className="micro">CAPABILITIES</p><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <footer className="lms-case__actions">
        <div className="lms-case__action-status">
          <span className="lms-case__action-label micro">STATUS</span>
          <span className="lms-case__action-value micro"><i className="lms-case__live-dot" />LIVE PROJECT</span>
        </div>
        <div className="lms-case__action-source">
          <span className="lms-case__action-label micro">PROJECT LINK</span>
          <div className="lms-case__action-links">
            <a className="lms-case__action interactive" href={project.liveUrl} aria-label="View the Private Tutoring LMS live site (opens in a new tab)" {...externalLinkProps}>VIEW LIVE <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </footer>
    </article>
  )
}
