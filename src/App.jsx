// © 2026 Danilo Ramos | daniloramos.dev.br | Todos os direitos reservados.

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import EMAILJS_CONFIG from './emailjsConfig'

const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
  { label: 'CONTACT', href: '#contact' },
]

const skills = [
  { title: 'Frontend Development', level: 92, techs: 'React, Vue.js, Next.js, TypeScript' },
  { title: 'Backend Systems', level: 88, techs: 'Node.js, Python, Express, REST APIs' },
  { title: 'Mobile Development', level: 78, techs: 'React Native, Flutter, Android' },
  { title: 'DevOps & Cloud', level: 75, techs: 'Docker, AWS, CI/CD, Linux' },
  { title: 'UI/UX Design', level: 85, techs: 'Figma, Tailwind CSS, Responsive Design' },
  { title: 'Database & Storage', level: 80, techs: 'PostgreSQL, MongoDB, Redis, SQLite' },
]

const services = [
  { title: 'Immersive Frontend Development', desc: 'Creating responsive, intuitive, and visually striking interfaces using React, Vue.js, and modern CSS frameworks.', items: ['Interactive Experiences', 'Motion UI & Animations', 'Next-gen UI Frameworks'] },
  { title: 'Advanced Backend Architecture', desc: 'Engineering robust, scalable server solutions using Node.js, Python, and cloud infrastructure designed for performance.', items: ['RESTful API Design', 'Real-time Data Processing', 'Microservices Architecture'] },
  { title: 'UI/UX & Digital Design', desc: 'Harnessing design principles to build intelligent, user-centric applications that learn, adapt, and delight users.', items: ['Responsive Layouts', 'Design Systems', 'Prototyping & Wireframes'] },
]

const projects = [
  { title: 'LojaVirtual', desc: 'Plataforma de e-commerce completa com React, Node.js, sistema de pagamentos e painel administrativo.', tags: ['React', 'Node.js'], category: 'react', emoji: '🛒' },
  { title: 'DashboardAdmin', desc: 'Painel administrativo responsivo com gráficos interativos, autenticação e gerenciamento de dados em tempo real.', tags: ['React', 'TypeScript'], category: 'react', emoji: '📊' },
  { title: 'FoodExpress', desc: 'Aplicativo mobile de delivery com tracking em tempo real, pagamentos integrados e sistema de avaliações.', tags: ['React Native', 'Node.js'], category: 'mobile', emoji: '🍔' },
  { title: 'CodeAcademy', desc: 'Plataforma de cursos online com video player customizado, sistema de progresso e certificados automáticos.', tags: ['Next.js', 'PostgreSQL'], category: 'react', emoji: '🎓' },
  { title: 'BlogCraft', desc: 'Sistema de blog profissional com editor rich-text, SEO otimizado e painel de analytics integrado.', tags: ['WordPress', 'PHP'], category: 'wordpress', emoji: '✍️' },
  { title: 'TaskFlow', desc: 'Aplicação de produtividade com kanban board, colaboração em equipe e integração com ferramentas externas.', tags: ['Vue.js', 'Firebase'], category: 'react', emoji: '📋' },
]

const faqData = [
  { q: 'Qual é o seu processo de desenvolvimento?', a: 'Meu processo envolve descoberta, planejamento, design, desenvolvimento, testes e deploy. Priorizo comunicação clara e feedback iterativo para garantir que o produto final alinhe com a sua visão.' },
  { q: 'Quanto tempo leva um projeto típico?', a: 'Os prazos variam de acordo com a complexidade. Um site institucional leva 2-4 semanas, enquanto projetos mais avançados como apps mobile ou sistemas complexos podem levar 8-16 semanas.' },
  { q: 'Você oferece manutenção e suporte?', a: 'Sim, ofereço pacotes de manutenção e suporte contínuo para garantir que seu projeto permaneça seguro, atualizado e otimizado após o lançamento.' },
]

const socials = [
  { label: 'GitHub', url: 'https://github.com/chefinhoo', initial: 'GH' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danramoalm/', initial: 'LI' },
  { label: 'X', url: 'https://x.com/danramoalm', initial: 'X' },
  { label: 'Email', url: 'mailto:contato@daniloramos.dev.br', initial: '@' },
]

function useActiveSection() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return active
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
      }),
      { threshold: 0.1 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="inner">
        <a href="#hero" className="logo" onClick={closeMenu}>
          {'<'}/<span>danilo</span>{'>'}
        </a>

        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}></span>
          <span style={menuOpen ? { opacity: 0 } : {}}></span>
          <span style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href.slice(1) ? 'active' : ''}
                onClick={closeMenu}
              >
                <span className="num">0{i + 1}.</span> {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>Vamos conversar</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  const codeLines = [
    'const startWebsite = () => {',
    '  let idea = "🚀 Launching innovation";',
    '  const tools = ["HTML", "CSS", "JS", "React"];',
    '  const mission = "Craft seamless experiences";',
    '  return tools.map(t => t + " + " + mission);',
    '};',
  ]

  return (
    <section id="hero" className="hero">
      <div className="hero-bg1"></div>
      <div className="hero-bg2"></div>
      <div className="inner">
        <div className="animate-fadeUp">
          <p className="hero-tag">Full Stack Developer</p>
          <h1>Crafting Code That<br /><em>Connect The World</em></h1>
          <p className="hero-desc">
            Transformando visões em experiências web imersivas com tecnologia de ponta e design futurista.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Initiate Contact</a>
            <a href="#projects" className="btn-outline">View Projects</a>
          </div>
        </div>

        <div className="animate-fadeUp delay-200">
          <div className="code-block">
            <div className="code-bar">
              <span className="dot dot-r"></span>
              <span className="dot dot-y"></span>
              <span className="dot dot-g"></span>
              <span>developer.js</span>
            </div>
            <div className="code-content">
              {codeLines.map((line, i) => (
                <div key={i}>
                  <span className="ln">{i + 1}</span>{line}
                </div>
              ))}
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">DR</div>
            <div>
              <h4>Danilo Ramos</h4>
              <p>Senior Full Stack Developer</p>
              <p className="tech">React | Node.js | Python | TypeScript</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <a href="#about">SCROLL</a>
        <svg width="20" height="20" fill="none" stroke="#00ffcc" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

function About() {
  const ref = useReveal()
  return (
    <section id="about" className="section" ref={ref}>
      <div className="inner">
        <div data-reveal>
          <p className="section-tag">//About</p>
          <h2 className="section-title">The Mind Behind The Code</h2>
        </div>
        <div className="about-grid">
          <div data-reveal>
            <div className="about-text">
              <p>
                Sou Danilo Ramos, desenvolvedor full stack especializado em criar experiências digitais imersivas que unem tecnologia de ponta com design moderno. Com expertise em diversos stacks e profunda compreensão de front-end e back-end, crio soluções que transcendem limites convencionais.
              </p>
              <p>
                Focado em transformar ideias ambiciosas em realidade através de código, inovação e busca incansável pela excelência tecnológica. Especializado em React, Node.js e soluções web modernas para empresas e empreendedores.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <p className="num">3+</p>
                <p className="label">Years Experience</p>
              </div>
              <div className="stat-card">
                <p className="num">15+</p>
                <p className="label">Projects Completed</p>
              </div>
            </div>
          </div>
          <div data-reveal>
            <div className="skills-card">
              <h3>Skills & Expertise</h3>
              {skills.map((skill) => (
                <div className="skill-item" key={skill.title}>
                  <div className="skill-header">
                    <span className="name">{skill.title}</span>
                    <span className="pct">{skill.level}%</span>
                  </div>
                  <p className="skill-techs">{skill.techs}</p>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const ref = useReveal()
  return (
    <section id="services" className="section" ref={ref}>
      <div className="inner">
        <div data-reveal>
          <p className="section-tag">//SERVICES</p>
          <h2 className="section-title">Digital Solutions Spectrum</h2>
          <p className="section-desc">
            Transformando visões em experiências digitais imersivas com precisão e inovação.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card" key={service.title} data-reveal>
              <div className="service-num">0{i + 1}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="service-list">
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const ref = useReveal()
  const [filter, setFilter] = useState('all')
  const categories = ['all', 'react', 'node.js', 'mobile', 'wordpress']
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="inner">
        <div data-reveal>
          <p className="section-tag">//PORTFOLIO</p>
          <h2 className="section-title">Crafted Innovations</h2>
          <p className="section-desc">
            Descubra uma coleção de projetos que fusionam design futurista, tecnologia avançada e funcionalidade impecável.
          </p>
        </div>
        <div className="filter-bar" data-reveal>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn ${filter === cat ? 'active' : ''}`}>
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((project) => (
            <div className="project-card" key={project.title} data-reveal>
              <div className="project-thumb">{project.emoji}</div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="tags">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const ref = useReveal()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="section" ref={ref}>
      <div className="inner">
        <div data-reveal>
          <p className="section-tag">//FAQ</p>
          <h2 className="section-title">Answers to Your Queries</h2>
          <p className="section-desc">
            Encontre respostas para perguntas comuns sobre meus serviços e processo.
          </p>
        </div>
        <div className="faq-list">
          {faqData.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i} data-reveal>
              <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const ref = useReveal()

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const formData = new FormData(form)
    const templateParams = {
      title: 'Contato pelo site',
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, { publicKey: EMAILJS_CONFIG.publicKey })
      .then(() => { setStatus('success'); form.reset() })
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="inner">
        <div data-reveal>
          <p className="section-tag">//Contact</p>
          <h2 className="section-title">Connect to Innovate</h2>
          <p className="section-desc">
            Pronto para transformar sua visão em uma realidade digital? Entre em contato e vamos criar algo extraordinário.
          </p>
        </div>
        <div className="contact-grid">
          <div data-reveal>
            {status === 'success' ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>Mensagem enviada!</h3>
                <p>Obrigado pelo contato, retornarei em breve.</p>
                <button className="btn-outline" onClick={() => setStatus('idle')}>Enviar outra</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Seu nome" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="seu@email.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" placeholder="Fale sobre o seu projeto..." rows="5" required></textarea>
                </div>
                {status === 'error' && <p className="form-error">Não foi possível enviar. Tente novamente.</p>}
                <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
          <div data-reveal>
            <div className="contact-info-card">
              <h3>Get in Touch</h3>
              <p>Estou disponível para projetos freelance, colaborações ou apenas uma conversa sobre tecnologia.</p>
              <a href="mailto:contato@daniloramos.dev.br" className="contact-link">
                <span className="icon">✉</span>
                contato@daniloramos.dev.br
              </a>
            </div>
            <div className="contact-info-card">
              <h4 style={{ color: '#fff', marginBottom: 12 }}>Follow Me</h4>
              <div className="social-icons">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
                    {s.initial}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-grid">
          <div>
            <a href="#hero" className="footer-logo">{'<'}/<span>danilo</span>{'>'}</a>
            <p className="footer-about">
              Criando o futuro de experiências digitais com inovação e precisão. Transformando ideias complexas em interfaces intuitivas.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}><a href={link.href}>_{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Let's Connect</h4>
            <div className="social-icons">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
                  {s.initial}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Danilo Ramos. All rights reserved.</p>
          <a href="#hero" className="footer-top">^ Back to Top</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="bg-page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
