import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X, Download, Code2, TestTube2, BriefcaseBusiness, ExternalLink, ChevronDown } from 'lucide-react'

// PERSONALIZE: Replace the email, GitHub, LinkedIn, and resume link below.
const profile = {
  name: 'Jenny Rose Perez',
  email: 'jennyroseperez32@gmail.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  resume: '/resume.pdf',
}
const projects = [
  {  title: 'WebEd', type: 'Capstone • Education Technology', desc: 'A web-based student attendance and grading system featuring face recognition, liveness prompts, transmuted grades, reports, and parent SMS notifications.', stack: ['Laravel', 'JavaScript', 'MySQL', 'face-api.js'], color: 'violet', link: '' },
  {  title: 'Ticketing System', type: 'Internship • Service Management', desc: 'Role-based support ticket management with dashboards, ticket details, agent workflows, notifications, customer-facing ticket creation, and OTP flows.', stack: ['React', 'Tailwind CSS', 'Laravel', 'MySQL'], color: 'cyan', link: '' },
  {  title: 'Aishaesthetics', type: 'Freelance • Appointment Booking', desc: 'An appointment booking concept for a beauty service business, including booking workflows, customer records, admin history, and reminder planning.', stack: ['React', 'Node.js', 'SQLite'], color: 'pink', link: '' },
]
const skills = ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Laravel / PHP', 'MySQL', 'Git & GitHub', 'Figma', 'Manual QA', 'UAT', 'Technical Documentation', 'Client Coordination']
const experience = [
  { role: 'Account Executive', company: 'Technopaq Inc. • IBM Software Distributor', date: 'Sep 2025 — Feb 2026', text: 'Supported business partners through account handling, client coordination, software quotations, onboarding, and product enablement in the IT industry.' },
  { role: 'Project Manager & Frontend Developer Intern', company: 'Qtech Business Solutions Inc.', date: 'Feb 2025 — May 2025', text: 'Collaborated on a role-based ticketing platform using React, Tailwind, Laravel, and MySQL; supported frontend development, manual testing, UAT, documentation, and sprint coordination.' },
]
function Orb({ showSphere }) {
  const mesh = useRef()
  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * .14
    mesh.current.rotation.x += delta * .08
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * .6) * .12
  })
  return <Float speed={1.5} rotationIntensity={.25} floatIntensity={.35}>
    {showSphere && <mesh ref={mesh} scale={1.85}>
      <icosahedronGeometry args={[1, 20]} />
      <MeshDistortMaterial color="#7258ff" roughness={.15} metalness={.6} distort={.38} speed={1.7} />
    </mesh>}
    <mesh rotation={[.7, .3, .2]}><torusGeometry args={[2.4, .018, 10, 140]} /><meshBasicMaterial color="#59e5f7" transparent opacity={.7} /></mesh>
    <mesh rotation={[1.3, .6, -.4]}><torusGeometry args={[2.7, .012, 10, 140]} /><meshBasicMaterial color="#ba85ff" transparent opacity={.45} /></mesh>
  </Float>
}
function HeroScene({ showSphere }) {
  return <div className="hero-scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 7.5], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
    <ambientLight intensity={1.4} /><directionalLight position={[3, 4, 5]} intensity={2.2} color="#b1a1ff" /><pointLight position={[-3, -2, 3]} intensity={25} color="#00e6ff" distance={9} />
    <Suspense fallback={null}><Orb showSphere={showSphere} /><Stars radius={90} depth={40} count={700} factor={2} saturation={0} fade speed={.5} /></Suspense>
  </Canvas></div>
}
const reveal = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65 } }
function SectionHeading({ eyebrow, title, subtitle }) { return <motion.div {...reveal} className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</motion.div> }
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [emailStatus, setEmailStatus] = useState('idle')
  const [portraitReady, setPortraitReady] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const portrait = new Image()
    portrait.onload = () => setPortraitReady(true)
    portrait.src = '/jenny-portrait.png'
    return () => { portrait.onload = null }
  }, [])
  async function handleContactSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    if (fields.get('_honey')) return
    setEmailStatus('sending')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          message: fields.get('message'),
          _subject: 'New message from Jenny Rose Perez portfolio',
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || result.success === 'false') throw new Error('Submission failed')
      form.reset()
      setEmailStatus('success')
    } catch {
      setEmailStatus('error')
    }
  }
  return <>
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation"><a href="#home" className="logo">JEN<span></span></a>
      <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
      <div className={'nav-links ' + (menuOpen ? 'open' : '')}>{['About', 'Experience', 'Skills', 'Projects'].map(item => <a key={item} onClick={() => setMenuOpen(false)} href={'#' + item.toLowerCase()}>{item}</a>)}<a onClick={() => setMenuOpen(false)} className="nav-contact" href="#contact">Let's talk <ArrowUpRight size={16} /></a></div>
    </nav></header>
    <main>
      <section id="home" className="hero container"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="availability"><span className="status-dot" /> Open to IT opportunities</motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="hero-intro">HELLO, I'M JENNY ROSE</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }}>Jenny <br /><span className="gradient-text">Rose</span><br />Perez</motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }} className="hero-description">IT Graduate <span>✦</span> Frontend Developer <span>✦</span> QA Enthusiast<br />I combine technical skills, thoughtful design, and client-focused problem solving.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }} className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={18} /></a><a className="button secondary" href="#contact">Contact me <Mail size={17} /></a></motion.div>
        <a href="#about" className="scroll-cue">Scroll to explore <ChevronDown size={16} /></a>
      </div>{reduceMotion ? !portraitReady && <div className="static-orb" aria-hidden="true" /> : <HeroScene showSphere={!portraitReady} />}{portraitReady && <>
        {!reduceMotion && <svg className="liquid-filter-defs" aria-hidden="true" focusable="false"><defs><filter id="portrait-liquid" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="3" result="ripples"><animate attributeName="baseFrequency" values="0.012 0.018;0.018 0.012;0.012 0.018" dur="8s" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="ripples" scale="7" xChannelSelector="R" yChannelSelector="B" /></filter></defs></svg>}
        <div className={'hero-portrait' + (reduceMotion ? ' still' : ' liquid')}><img src="/jenny-portrait.png" alt="Jenny Rose Perez" /></div>
      </>}</section>
      <section id="about" className="section container"><SectionHeading eyebrow="ABOUT ME" title={<>Technology meets <span className="gradient-text">purpose.</span></>} /><div className="about-grid"><motion.div {...reveal} className="glass about-main"><div className="card-icon"><Code2 /></div><h3>A little about me</h3><p>I'm Jenny Rose T. Perez, a Bachelor of Science in Information Technology graduate from CSTC – Sariaya Campus, Class of 2025.

I began my journey as a Frontend Developer and Project Manager Intern at Qtech Business Solutions Inc., then stepped into the IT industry as an Account Executive at Technopaq Inc.

Driven by curiosity, creativity, and a passion for technology, I'm always ready to learn, grow, and take on new challenges.</p><a href={profile.resume} className="inline-link" download>Download résumé <Download size={16} /></a></motion.div><motion.div {...reveal} className="about-side"><div className="glass stat-card"><strong>2025</strong><span>BS Information Technology Graduate</span></div><div className="glass stat-card"><strong>3</strong><span>Featured software projects</span></div><div className="glass stat-card"><strong>∞</strong><span>Curiosity & willingness to learn</span></div></motion.div></div></section>
      <section id="experience" className="section container"><SectionHeading eyebrow="EXPERIENCE" title={<>Where I've <span className="gradient-text">contributed.</span></>} subtitle="A blend of technical delivery, testing, and real-world client communication." /><div className="timeline">{experience.map((job, i) => <motion.article {...reveal} className="glass timeline-card" key={job.role}><span className="timeline-index">0{i + 1}</span><div><span className="job-date">{job.date}</span><h3>{job.role}</h3><h4>{job.company}</h4><p>{job.text}</p></div></motion.article>)}</div></section>
      <section id="skills" className="section container"><SectionHeading eyebrow="TOOLKIT" title={<>Skills & <span className="gradient-text">technologies.</span></>} subtitle="Tools and practices I've worked with through projects, internship, and professional experience." /><motion.div {...reveal} className="glass skills-panel"><div className="skills-heading"><TestTube2 size={21} /><span>My technical & professional toolkit</span></div><div className="skills-list">{skills.map(skill => <span className="skill" key={skill}>{skill}</span>)}</div></motion.div></section>
      <section id="projects" className="section container"><SectionHeading eyebrow="SELECTED WORK" title={<>Things I've <span className="gradient-text">built.</span></>} subtitle="A selection of academic, internship, and freelance work." /><div className="project-grid">{projects.map(project => <motion.article {...reveal} key={project.num} className={'glass project-card ' + project.color}><div className="project-art"><span className="project-number">{project.num} / PROJECT</span><div className="art-rings"><div /><div /><div /></div><span className="project-symbol">{project.title === 'WebEd' ? 'W' : project.title === 'Ticketing System' ? 'T' : 'A'}</span></div><div className="project-content"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.desc}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{project.link ? <a href={project.link} target="_blank" rel="noreferrer" className="inline-link">View project <ExternalLink size={15} /></a> : <span className="project-note">Project link available upon request</span>}</div></motion.article>)}</div></section>
      <section id="contact" className="section container"><motion.div {...reveal} className="glass contact-panel"><span className="eyebrow">GET IN TOUCH</span><h2>Have an opportunity?<br /><span className="gradient-text">Let's connect.</span></h2><p>I'm interested in IT support, frontend development, quality assurance, and project coordination opportunities.</p><form className="contact-form" onSubmit={handleContactSubmit}><div className="contact-fields"><label>Your name<input name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your name" /></label><label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div><label>Message<textarea name="message" required maxLength={5000} rows={5} placeholder="Tell me about your opportunity..." /></label><input className="contact-honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="button primary" type="submit" disabled={emailStatus === 'sending'}>{emailStatus === 'sending' ? 'Sending...' : 'Send me an email'} <Mail size={18} /></button><div className="form-feedback" role="status" aria-live="polite">{emailStatus === 'success' && 'Thanks! Your message was submitted. I’ll reply to the email you provided.'}{emailStatus === 'error' && <>The message could not be sent. Please try again or email me at <a href={'mailto:' + profile.email}>{profile.email}</a>.</>}</div></form><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={'mailto:' + profile.email} aria-label="Email"><Mail /></a></div></motion.div></section>
    </main><footer className="footer container"><span>© {new Date().getFullYear()} {profile.name}</span><span>All right reserved.</span><a href="#home">Back to top ↑</a></footer>
  </>
}
export default App
