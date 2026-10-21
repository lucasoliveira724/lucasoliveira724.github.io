import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Plug,
  Sparkles,
  Workflow,
  X
} from 'lucide-react'
import { cases, links, projects, type Project } from './data/site'
import { translations, type Language } from './i18n'
import brazilFlag from './assets/flags/brazil.svg'
import unitedStatesFlag from './assets/flags/united-states.svg'

const whatsappHref = (language: Language) => `https://wa.me/5511923629202?text=${encodeURIComponent(translations[language].footer.greeting)}`

function External({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20.52 3.48A11.78 11.78 0 0 0 12.14 0C5.63 0 .33 5.3.32 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.45-1.69a11.78 11.78 0 0 0 5.68 1.45h.01c6.52 0 11.82-5.3 11.83-11.82a11.77 11.77 0 0 0-3.45-8.36ZM12.14 21.75h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.83 1 1.02-3.73-.23-.38a9.84 9.84 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c-.01 5.46-4.45 9.9-9.9 9.9Z"/>
      <path fill="currentColor" d="M17.06 14.36c-.27-.14-1.61-.8-1.86-.89-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.26s.98 2.62 1.11 2.8c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z"/>
    </svg>
  )
}
function ProjectCarousel({ project, t }: { project: Project; t: typeof translations.pt | typeof translations.en }) {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(() => document.visibilityState === 'visible')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const slide = project.slides[index]
  const move = (step: number) => setIndex((current) => (current + step + project.slides.length) % project.slides.length)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)
    const updatePageVisibility = () => setIsPageVisible(document.visibilityState === 'visible')

    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    document.addEventListener('visibilitychange', updatePageVisibility)

    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference)
      document.removeEventListener('visibilitychange', updatePageVisibility)
    }
  }, [])

  useEffect(() => {
    if (isHovered || isFocused || !isPageVisible || prefersReducedMotion || project.slides.length < 2) return

    const timeout = window.setTimeout(() => {
      setIndex((current) => (current + 1) % project.slides.length)
    }, 5000)
    return () => window.clearTimeout(timeout)
  }, [index, isHovered, isFocused, isPageVisible, prefersReducedMotion, project.slides.length])

  return (
    <div
      className={`carousel ${project.name === 'Click Imóveis' ? 'carousel--navy' : project.name === 'Sandro Car' || project.name === 'G Prime Grill' ? 'carousel--light' : ''}`}
      aria-roledescription={t.projects.carousel}
      aria-label={t.projects.screenshot.replace('{name}', project.name)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          move(-1)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          move(1)
        }
      }}
      onTouchStart={(e) => {
        ;(e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX)
      }}
      onTouchEnd={(e) => {
        const start = Number((e.currentTarget as HTMLElement).dataset.touchX || 0)
        const dx = e.changedTouches[0].clientX - start
        if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1)
      }}
    >
      <div
        className={`mock-screen ${slide.tone} ${slide.image ? 'has-screenshot' : ''}`}
        aria-live="off"
      >
        {slide.image ? (
          <img
            className="project-screenshot"
            src={slide.image}
            alt={`${project.name} — ${slide.subtitle}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          <>
            <div className="mock-top">
              <span className="mock-logo">{project.name.split(' ')[0]}</span>
              <span className="mock-lines">•••</span>
            </div>
            <div className="mock-art">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-card">
                <span>{slide.label}</span>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="mock-copy">
              <small>{t.projects.preview}</small>
              <strong>{slide.subtitle}</strong>
              <span className="mock-button">
                {t.projects.know} <ArrowUpRight size={13} />
              </span>
            </div>
            <span className="placeholder-tag">{t.projects.illustrative}</span>
          </>
        )}
      </div>
      <button
        className="carousel-arrow carousel-arrow-prev"
        aria-label={t.projects.previous}
        onClick={() => move(-1)}
      >
        <ChevronLeft size={40} strokeWidth={1.8} />
      </button>
      <button
        className="carousel-arrow carousel-arrow-next"
        aria-label={t.projects.next}
        onClick={() => move(1)}
      >
        <ChevronRight size={40} strokeWidth={1.8} />
      </button>
    </div>
  )
}
function ProjectShowcase({ project, reverse, t }: { project: Project; reverse?: boolean; t: typeof translations.pt | typeof translations.en }) {
  const projectText = t.projectsData[project.name as keyof typeof t.projectsData]
  return (
    <article className={`project-row ${reverse ? 'reverse' : ''}`}>
      <ProjectCarousel project={{ ...project, category: projectText.category, description: projectText.description, slides: project.slides.map((slide, index) => ({ ...slide, subtitle: projectText.slides[index] })) }} t={t} />
      <div className="project-info">
        <span className="eyebrow">{projectText.category}</span>
        <h3>{project.name}</h3>
        <p>{projectText.description}</p>
        <div className="tags">
          {project.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {project.github ? (
          <External className="project-github-button" href={project.github}>
            <Github size={15} aria-hidden="true" />
            <span>{project.name === 'Click Imóveis' || project.name === 'Sandro Car' || project.name === 'G Prime Grill' ? (t === translations.pt ? 'Ver showcase no GitHub' : 'View GitHub Showcase') : t.projects.view}</span>
          </External>
        ) : null}
      </div>
    </article>
  )
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'
    } catch {
      return 'pt'
    }
  })
  const t = translations[language]
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // Keep the selected language for this session if browser storage is unavailable.
    }
  }, [language])
  const changeLanguage = (next: Language) => setLanguage(next)
  const nav = [
    [t.nav.about, '#sobre'],
    [t.nav.specialties, '#especialidades'],
    [t.nav.projects, '#projetos'],
    [t.nav.salesforce, '#salesforce'],
    [t.nav.contact, '#contato']
  ]
  return (
    <>
      <header className="navbar">
        <a className="brand" href="#inicio" aria-label={t.nav.home}>
          LO<span>.</span>
        </a>
        <button
          className="mobile-menu"
          aria-label={menuOpen ? t.nav.close : t.nav.open}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label={t.nav.main}>
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <External className="nav-github" href={links.github} aria-label={t.nav.github}>
            <Github size={17} />
          </External>
          <div className="language-switch" role="group" aria-label={t.language}>
            <button className="language-option" type="button" lang="pt-BR" aria-label={t.portuguese} aria-pressed={language === 'pt'} onClick={() => { changeLanguage('pt'); setMenuOpen(false) }}>
              <img className="language-flag" src={brazilFlag} alt="" aria-hidden="true" /> PT
            </button>
            <span className="language-divider" aria-hidden="true">/</span>
            <button className="language-option" type="button" lang="en" aria-label={t.english} aria-pressed={language === 'en'} onClick={() => { changeLanguage('en'); setMenuOpen(false) }}>
              <img className="language-flag" src={unitedStatesFlag} alt="" aria-hidden="true" /> EN
            </button>
          </div>
        </nav>
      </header>
      <main id="inicio">
        <section className="hero container">
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              <span className="status-dot" /> Salesforce <b>·</b> {language === 'pt' ? 'Desenvolvimento' : 'Development'} <b>·</b> {language === 'pt' ? 'Automação' : 'Automation'}
              &amp; {language === 'pt' ? 'IA' : 'AI'}
            </span>
            <h1>
              Lucas
              <br />
              <span>Oliveira</span>
            </h1>
            <h2>{t.hero.title}</h2>
            <p>
              {t.hero.description}
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projetos">
                {t.hero.projects} <ArrowDownRight size={17} />
              </a>
              <a className="button secondary" href="#contato">
                {t.hero.contact} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-tech">
              {['Salesforce Marketing Cloud', 'SQL', 'React', 'TypeScript', 'Python', 'AI'].map(
                (x) => (
                  <span key={x}>{x}</span>
                )
              )}
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-grid" />
            <div className="visual-ring ring-a" />
            <div className="visual-ring ring-b" />
            <div className="visual-core">
              <Workflow size={44} />
              <span>
                MARKETING
                <br />× TECHNOLOGY
              </span>
            </div>
            <span className="orbit-path orbit-path-a">
              <span className="float-chip chip-a">
                <Database size={15} /> Data
              </span>
            </span>
            <span className="orbit-path orbit-path-b">
              <span className="float-chip chip-b">
                <Code2 size={15} /> {language === 'pt' ? 'Desenvolvimento' : 'Development'}
              </span>
            </span>
            <span className="orbit-path orbit-path-c">
              <span className="float-chip chip-c">
                <Bot size={15} /> {language === 'pt' ? 'Automação' : 'Automation'}
              </span>
            </span>
            <span className="orbit-path orbit-path-d">
              <span className="float-chip chip-d">
                <Cloud size={15} /> Salesforce
              </span>
            </span>
            <span className="orbit-path orbit-path-e">
              <span className="float-chip chip-e">
                <Sparkles size={15} /> AI
              </span>
            </span>
            <span className="orbit-path orbit-path-f">
              <span className="float-chip chip-f">
                <Plug size={15} /> APIs
              </span>
            </span>
            <span className="visual-index">01 — 06</span>
          </div>
          <div className="hero-foot">
            <span>{t.hero.tagline}</span>
            <a href="#sobre" aria-label={t.nav.about}>
              <ArrowDownRight size={18} />
            </a>
          </div>
        </section>
        <section className="section container" id="sobre">
          <div className="section-head">
            <span className="section-index">{t.about.index}</span>
            <h2>
              {t.about.title}
              <br />{t.about.titleSecond}<span className="accent">.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                {t.about.p1}
              </p>
              <p>
                {t.about.p2}
              </p>
              <p>
                {t.about.p3}
              </p>
            </div>
            <div className="about-pillars">
              <div>
                <span className="pillar-icon">
                  <Workflow />
                </span>
                <span>
                  <b>Salesforce</b>
                  <small>Marketing Cloud &amp; {language === 'pt' ? 'Automação' : 'Automation'}</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <div>
                <span className="pillar-icon">
                  <Braces />
                </span>
                <span>
                  <b>{t.about.development}</b>
                  <small>Web, APIs &amp; {language === 'pt' ? 'Dados' : 'Data'}</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <div>
                <span className="pillar-icon">
                  <Bot />
                </span>
                <span>
                  <b>{t.about.ai}</b>
                  <small>{t.about.applied}</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </section>
        <section className="section specialties" id="especialidades">
          <div className="container">
            <div className="section-head">
              <span className="section-index">{t.specialties.index}</span>
              <h2>
                {t.specialties.title}<span className="accent">.</span>
              </h2>
              <p>{t.specialties.intro}</p>
            </div>
            <div className="specialty-grid">
              <article className="specialty-card">
                <span className="card-num">01</span>
                <span className="specialty-icon">
                  <Workflow />
                </span>
                <h3>
                  Salesforce &amp;
                  <br /> {language === 'pt' ? 'Marketing & Automação' : 'Marketing Automation'}
                </h3>
                <p>{t.specialties.automation}</p>
                <div className="skill-list">
                  {[
                    'Salesforce Marketing Cloud',
                    'Journey Builder',
                    'Automation Studio',
                    'Email Studio',
                    'Content Builder',
                    'Data Extensions',
                    'SQL',
                    'AMPscript',
                    'SSJS'
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
              <article className="specialty-card">
                <span className="card-num">02</span>
                <span className="specialty-icon">
                  <Code2 />
                </span>
                <h3>
                  {language === 'pt' ? 'Desenvolvimento' : 'Development'}
                  <br />
                  &amp; {language === 'pt' ? 'Dados' : 'Data'}
                </h3>
                <p>{t.specialties.development}</p>
                <div className="skill-list">
                  {[
                    'React',
                    'TypeScript',
                    'JavaScript',
                    'HTML',
                    'CSS',
                    'Python',
                    'APIs',
                    'Git / GitHub'
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
              <article className="specialty-card">
                <span className="card-num">03</span>
                <span className="specialty-icon">
                  <Bot />
                </span>
                <h3>
                  AI &amp;
                  <br /> {language === 'pt' ? 'Automação' : 'Automation'}
                </h3>
                <p>{t.specialties.ai}</p>
                <div className="skill-list">
                  {[
                    t.specialties.applied,
                    t.specialties.processes,
                    'MCP',
                    t.specialties.integrations
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section container projects-section" id="projetos">
          <div className="section-head">
            <span className="section-index">{t.projects.index}</span>
            <h2>
              {t.projects.title}<span className="accent">.</span>
            </h2>
            <p>{t.projects.intro}</p>
          </div>
          <div className="project-list">
            {projects.filter((project) => project.visible).map((p, i) => (
              <ProjectShowcase key={p.name} project={p} reverse={i % 2 === 1} t={t} />
            ))}
          </div>
        </section>
        <section className="section salesforce-section" id="salesforce">
          <div className="container">
            <div className="section-head">
              <span className="section-index">{t.salesforce.index}</span>
              <h2>
                Salesforce
                <br />
                Marketing Cloud<span className="accent">.</span>
              </h2>
              <p>
                {t.salesforce.description}
              </p>
            </div>
            <div className="sf-groups">
              <article>
                <span className="sf-icon">
                  <Workflow />
                </span>
                <h3>{language === 'pt' ? 'Jornadas & Automação' : 'Journeys & Automation'}</h3>
                <div className="sf-tags">
                  {['Journey Builder', 'Automation Studio', 'Email Studio'].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
              <article>
                <span className="sf-icon">
                  <Database />
                </span>
                <h3>{language === 'pt' ? 'Dados & Desenvolvimento' : 'Data & Development'}</h3>
                <div className="sf-tags">
                  {['SQL', 'Data Extensions', 'AMPscript', 'SSJS'].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
              <article>
                <span className="sf-icon">
                  <MessageCircle />
                </span>
                <h3>{language === 'pt' ? 'Personalização & Canais' : 'Personalization & Channels'}</h3>
                <div className="sf-tags">
                  {['Content Builder', 'Email', 'SMS', t.salesforce.dynamic].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
            </div>
            <div className="cases-head">
              <div>
                <span className="section-index">{t.salesforce.cases}</span>
                <h3>{t.salesforce.problems}</h3>
              </div>
              {links.salesforceCases && (
                <External className="text-link" href={links.salesforceCases}>
                  {t.salesforce.explore} <ArrowUpRight size={16} />
                </External>
              )}
            </div>
            <div className="case-grid">
              {cases.map((c, i) => (
                <External className="case-card" href={c.url} aria-label={t.salesforce.caseLabel.replace('{title}', t.casesData[i].title)} key={c.title}>
                  <span>
                    0{i + 1} <ArrowUpRight size={15} />
                  </span>
                  <h4>{t.casesData[i].title}</h4>
                  <p>{t.casesData[i].description}</p>
                  <span className="case-action">{t.salesforce.see} <ArrowUpRight size={12} /></span>
                </External>
              ))}
            </div>
            <p className="privacy-note">
              <Check size={16} /> {t.salesforce.privacy}
            </p>
          </div>
        </section>
        <section className="section container contact-section" id="contato">
          <div className="contact-intro">
            <span className="section-index">{t.contact.index}</span>
            <h2>
              {t.contact.title}
            </h2>
            <p>
              {t.contact.intro}
            </p>
          </div>
          <div className="contact-cards">
            <External href={links.linkedin} className="contact-card">
              <span className="contact-icon">
                <Linkedin />
              </span>
              <span>
                <b>LinkedIn</b>
                <small>{t.contact.linkedin}</small>
              </span>
              <ArrowUpRight />
            </External>
            <External href={links.github} className="contact-card">
              <span className="contact-icon">
                <Github />
              </span>
              <span>
                <b>GitHub</b>
                <small>{t.contact.github}</small>
              </span>
              <ArrowUpRight />
            </External>
            <a href={links.email} className="contact-card">
              <span className="contact-icon">
                <Mail />
              </span>
              <span>
                <b>E-mail</b>
                <small>{t.contact.direct}</small>
              </span>
              <ArrowUpRight />
            </a>
            <External href={whatsappHref(language)} className="contact-card" aria-label={t.contact.whatsappLabel} rel="noopener noreferrer">
              <span className="contact-icon">
                <WhatsAppIcon />
              </span>
              <span>
                <b>WhatsApp</b>
                <small>{t.contact.whatsapp}</small>
                <small className="contact-action">{t.contact.start} →</small>
              </span>
              <ArrowUpRight />
            </External>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <a className="brand" href="#inicio" aria-label={t.nav.home}>
            LO<span>.</span>
          </a>
          <div>
            <b>Lucas Oliveira</b>
            <p>{t.footer.brand}</p>
            <small>{language === 'pt' ? 'Salesforce · Desenvolvimento · Automação & IA' : 'Salesforce · Development · Automation & AI'}</small>
          </div>
          <div className="footer-social">
            <External href={links.github} aria-label={language === 'pt' ? 'GitHub' : 'GitHub'}>
              <Github />
            </External>
            <External href={links.linkedin} aria-label={language === 'pt' ? 'LinkedIn' : 'LinkedIn'}>
              <Linkedin />
            </External>
            <External href={whatsappHref(language)} aria-label={t.nav.whatsapp} rel="noopener noreferrer">
              <WhatsAppIcon />
            </External>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Lucas Oliveira. {t.footer.rights}</span>
          <span>{t.footer.built}</span>
        </div>
      </footer>
    </>
  )
}
export default App




