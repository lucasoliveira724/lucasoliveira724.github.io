import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
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
function ProjectCarousel({ project }: { project: Project }) {
  const [index, setIndex] = useState(0)
  const slide = project.slides[index]
  const move = (step: number) =>
    setIndex((index + step + project.slides.length) % project.slides.length)
  return (
    <div
      className="carousel"
      aria-roledescription="carrossel"
      aria-label={`Screenshots de ${project.name}`}
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
        aria-live="polite"
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
              <small>PREVIEW DO PROJETO</small>
              <strong>{slide.subtitle}</strong>
              <span className="mock-button">
                Conheça o projeto <ArrowUpRight size={13} />
              </span>
            </div>
            <span className="placeholder-tag">Imagem ilustrativa</span>
          </>
        )}
      </div>{' '}
      <div className="carousel-controls">
        <button aria-label="Imagem anterior" onClick={() => move(-1)}>
          <ArrowLeft size={17} />
        </button>
        <div className="dots" role="group" aria-label="Escolher imagem">
          {project.slides.map((s, i) => (
            <button
              key={s.label}
              className={i === index ? 'active' : ''}
              aria-label={`Imagem ${i + 1}: ${s.label}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <span className="slide-count">
          {String(index + 1).padStart(2, '0')} / {project.slides.length}
        </span>
        <button aria-label="Próxima imagem" onClick={() => move(1)}>
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="slide-label">
        <span>
          {String(index + 1).padStart(2, '0')} / {slide.label}
        </span>
        <span>Use as setas ou arraste</span>
      </div>
    </div>
  )
}
function ProjectShowcase({ project, reverse }: { project: Project; reverse?: boolean }) {
  return (
    <article className={`project-row ${reverse ? 'reverse' : ''}`}>
      <ProjectCarousel project={project} />
      <div className="project-info">
        <span className="eyebrow">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {project.github ? (
          <External className="text-link" href={project.github}>
            Ver no GitHub <ArrowUpRight size={16} />
          </External>
        ) : (
          <span className="muted-note">Link do repositório a configurar</span>
        )}
      </div>
    </article>
  )
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = [
    ['Sobre', '#sobre'],
    ['Especialidades', '#especialidades'],
    ['Projetos', '#projetos'],
    ['Salesforce', '#salesforce'],
    ['Contato', '#contato']
  ]
  return (
    <>
      <header className="navbar">
        <a className="brand" href="#inicio" aria-label="Lucas Oliveira, início">
          LO<span>.</span>
        </a>
        <button
          className="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegação principal">
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <External className="nav-github" href={links.github} aria-label="GitHub">
            <Github size={17} />
          </External>
        </nav>
      </header>
      <main id="inicio">
        <section className="hero container">
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              <span className="status-dot" /> Salesforce <b>·</b> Development <b>·</b> Automation
              &amp; AI
            </span>
            <h1>
              Lucas
              <br />
              <span>Oliveira</span>
            </h1>
            <h2>
              Salesforce Marketing Cloud
              <br className="desktop-break" /> Consultant &amp; Developer
            </h2>
            <p>
              Desenvolvo soluções que conectam marketing, dados e tecnologia, combinando Salesforce
              Marketing Cloud, desenvolvimento de software, automação e Inteligência Artificial.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projetos">
                Ver projetos <ArrowDownRight size={17} />
              </a>
              <External className="button secondary" href={links.github}>
                GitHub <Github size={16} />
              </External>
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
                <Code2 size={15} /> Development
              </span>
            </span>
            <span className="orbit-path orbit-path-c">
              <span className="float-chip chip-c">
                <Bot size={15} /> Automation
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
            <span>Construindo experiências digitais com propósito</span>
            <a href="#sobre" aria-label="Rolar para sobre">
              <ArrowDownRight size={18} />
            </a>
          </div>
        </section>
        <section className="section container" id="sobre">
          <div className="section-head">
            <span className="section-index">01 / SOBRE</span>
            <h2>
              Tecnologia, dados
              <br />e automação<span className="accent">.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                Sou profissional de tecnologia com formação em Sistemas para Internet e experiência
                em desenvolvimento de soluções digitais e automação de marketing.
              </p>
              <p>
                Minha atuação combina Salesforce Marketing Cloud, desenvolvimento de software e
                dados, utilizando tecnologia para transformar necessidades de negócio em soluções
                práticas e escaláveis.
              </p>
              <p>
                Também exploro Inteligência Artificial e automação aplicadas ao desenvolvimento,
                buscando novas formas de aumentar produtividade, integrar sistemas e simplificar
                processos.
              </p>
            </div>
            <div className="about-pillars">
              <div>
                <span className="pillar-icon">
                  <Workflow />
                </span>
                <span>
                  <b>Salesforce</b>
                  <small>Marketing Cloud &amp; Automation</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <div>
                <span className="pillar-icon">
                  <Braces />
                </span>
                <span>
                  <b>Development</b>
                  <small>Web, APIs &amp; Data</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <div>
                <span className="pillar-icon">
                  <Bot />
                </span>
                <span>
                  <b>AI &amp; Automation</b>
                  <small>IA aplicada a processos</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </section>
        <section className="section specialties" id="especialidades">
          <div className="container">
            <div className="section-head">
              <span className="section-index">02 / ESPECIALIDADES</span>
              <h2>
                Áreas de atuação<span className="accent">.</span>
              </h2>
              <p>Competências que conectam estratégia, tecnologia e execução.</p>
            </div>
            <div className="specialty-grid">
              <article className="specialty-card">
                <span className="card-num">01</span>
                <span className="specialty-icon">
                  <Workflow />
                </span>
                <h3>
                  Salesforce &amp;
                  <br /> Marketing Automation
                </h3>
                <p>Jornadas, automações e comunicação personalizada.</p>
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
                  Development
                  <br />
                  &amp; Data
                </h3>
                <p>Aplicações digitais, integrações e soluções orientadas a dados.</p>
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
                  <br /> Automation
                </h3>
                <p>IA e automação aplicadas a fluxos e ferramentas.</p>
                <div className="skill-list">
                  {[
                    'IA aplicada ao desenvolvimento',
                    'Automação de processos',
                    'MCP',
                    'Integração de ferramentas com IA'
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
            <span className="section-index">03 / PROJETOS SELECIONADOS</span>
            <h2>
              Projetos em Destaque<span className="accent">.</span>
            </h2>
            <p>Produtos digitais e experiências desenvolvidas para resolver desafios reais.</p>
          </div>
          <div className="project-list">
            {projects.filter((project) => project.visible).map((p, i) => (
              <ProjectShowcase key={p.name} project={p} reverse={i % 2 === 1} />
            ))}
          </div>
        </section>
        <section className="section salesforce-section" id="salesforce">
          <div className="container">
            <div className="section-head">
              <span className="section-index">04 / ESPECIALIDADE</span>
              <h2>
                Salesforce
                <br />
                Marketing Cloud<span className="accent">.</span>
              </h2>
              <p>
                Experiência no desenvolvimento de soluções com Salesforce Marketing Cloud,
                envolvendo automação de marketing, jornadas multicanal, segmentação e processamento
                de dados, personalização de conteúdo e integrações.
              </p>
            </div>
            <div className="sf-groups">
              <article>
                <span className="sf-icon">
                  <Workflow />
                </span>
                <h3>Journey &amp; Automation</h3>
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
                <h3>Data &amp; Development</h3>
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
                <h3>Personalization &amp; Channels</h3>
                <div className="sf-tags">
                  {['Content Builder', 'Email', 'SMS', 'Conteúdo Dinâmico'].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
            </div>
            <div className="cases-head">
              <div>
                <span className="section-index">CASES TÉCNICOS</span>
                <h3>Problemas, lógica e soluções.</h3>
              </div>
              {links.salesforceCases && (
                <External className="text-link" href={links.salesforceCases}>
                  Explorar Cases no GitHub <ArrowUpRight size={16} />
                </External>
              )}
            </div>
            <div className="case-grid">
              {cases.map((c, i) => (
                <External className="case-card" href={c.url} aria-label={`Ver case: ${c.title}`} key={c.title}>
                  <span>
                    0{i + 1} <ArrowUpRight size={15} />
                  </span>
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                  <span className="case-action">Ver case <ArrowUpRight size={12} /></span>
                </External>
              ))}
            </div>
            <p className="privacy-note">
              <Check size={16} /> Cases baseados em experiências profissionais reais, documentados
              de forma anonimizada para preservar clientes, dados e informações confidenciais.
            </p>
          </div>
        </section>
        <section className="section container contact-section" id="contato">
          <div className="contact-intro">
            <span className="section-index">05 / CONTATO</span>
            <h2>
              Entre em contato
            </h2>
            <p>
              Tem um projeto, oportunidade ou desafio envolvendo Salesforce Marketing Cloud,
              desenvolvimento ou automação? Você pode me encontrar pelos canais abaixo.
            </p>
          </div>
          <div className="contact-cards">
            <External href={links.linkedin} className="contact-card">
              <span className="contact-icon">
                <Linkedin />
              </span>
              <span>
                <b>LinkedIn</b>
                <small>Perfil profissional e networking.</small>
              </span>
              <ArrowUpRight />
            </External>
            <External href={links.github} className="contact-card">
              <span className="contact-icon">
                <Github />
              </span>
              <span>
                <b>GitHub</b>
                <small>Projetos, showcases e cases técnicos.</small>
              </span>
              <ArrowUpRight />
            </External>
            <a href={links.email} className="contact-card">
              <span className="contact-icon">
                <Mail />
              </span>
              <span>
                <b>E-mail</b>
                <small>Contato direto.</small>
              </span>
              <ArrowUpRight />
            </a>
            <External href={links.whatsapp} className="contact-card" aria-label="WhatsApp: iniciar conversa" rel="noopener noreferrer">
              <span className="contact-icon">
                <WhatsAppIcon />
              </span>
              <span>
                <b>WhatsApp</b>
                <small>Vamos conversar sobre um projeto ou oportunidade.</small>
                <small className="contact-action">Iniciar conversa →</small>
              </span>
              <ArrowUpRight />
            </External>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <a className="brand" href="#inicio">
            LO<span>.</span>
          </a>
          <div>
            <b>Lucas Oliveira</b>
            <p>Salesforce Marketing Cloud Consultant &amp; Developer</p>
            <small>Salesforce · Development · Automation &amp; AI</small>
          </div>
          <div className="footer-social">
            <External href={links.github} aria-label="GitHub">
              <Github />
            </External>
            <External href={links.linkedin} aria-label="LinkedIn">
              <Linkedin />
            </External>
            <External href={links.whatsapp} aria-label="WhatsApp" rel="noopener noreferrer">
              <WhatsAppIcon />
            </External>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Lucas Oliveira. Todos os direitos reservados.</span>
          <span>Desenvolvido com React + TypeScript</span>
        </div>
      </footer>
    </>
  )
}
export default App




