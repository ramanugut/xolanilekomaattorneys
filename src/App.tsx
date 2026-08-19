import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const PRACTICE_AREAS = [
  {
    title: 'Property Law',
    text: 'Transfers, conveyancing support, and clear guidance through residential and commercial property matters.',
  },
  {
    title: 'Divorce & Family',
    text: 'Sensitive counsel for divorce proceedings, with practical advice focused on clarity and lasting outcomes.',
  },
  {
    title: 'Deceased Estates',
    text: 'Administration of estates with careful attention to process, family communication, and compliance.',
  },
] as const

const CONTACT = {
  phone: '076 726 4503',
  phoneHref: 'tel:+27767264503',
  email: 'xolanie2@gmail.com',
  emailHref: 'mailto:xolanie2@gmail.com',
  address: '2 Gale Road, Parktown West, Johannesburg',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=2+Gale+Road+Parktown+West+Johannesburg',
} as const

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')
  const practiceRef = useReveal<HTMLElement>()
  const aboutRef = useReveal<HTMLElement>()
  const contactRef = useReveal<HTMLElement>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Consultation request from ${name || 'website visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `${CONTACT.emailHref}?subject=${subject}&body=${body}`
    setFormStatus('sent')
  }

  return (
    <div className="site">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <div className="header-inner">
          <a className="brand-mark" href="#top" onClick={closeMenu}>
            <span className="brand-mark__monogram" aria-hidden="true">
              XL
            </span>
            <span className="brand-mark__text">
              Xolani Lekoma
              <span>Attorneys</span>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            <a href="#practice">Practice</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a className="nav-cta" href="#contact">
              Book a consultation
            </a>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <nav id="mobile-nav" className="nav-mobile" aria-label="Mobile">
          <a href="#practice" onClick={closeMenu}>
            Practice
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Book a consultation
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-brand">
          <div className="hero__media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=80"
              alt=""
              width={2400}
              height={1600}
            />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <p id="hero-brand" className="hero__brand">
              Xolani Lekoma Attorneys
            </p>
            <h1 className="hero__headline">Clear counsel for life&apos;s decisive moments.</h1>
            <p className="hero__lede">
              Property, divorce, and deceased estates — handled with precision in Johannesburg.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#contact">
                Request a consultation
              </a>
              <a className="btn btn--ghost" href="#practice">
                View practice areas
              </a>
            </div>
          </div>
        </section>

        <section
          id="practice"
          className="section practice reveal"
          ref={practiceRef}
          aria-labelledby="practice-heading"
        >
          <div className="section__inner">
            <div className="section__intro">
              <p className="eyebrow">Practice areas</p>
              <h2 id="practice-heading">Focused expertise where it matters most.</h2>
              <p className="section__lede">
                A boutique practice built around the matters families and property owners face most
                often.
              </p>
            </div>
            <ul className="practice-list">
              {PRACTICE_AREAS.map((area, index) => (
                <li key={area.title} style={{ ['--i' as string]: index }}>
                  <span className="practice-list__index">0{index + 1}</span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="about"
          className="section about reveal"
          ref={aboutRef}
          aria-labelledby="about-heading"
        >
          <div className="about__layout section__inner">
            <div className="about__visual" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80"
                alt=""
                width={1400}
                height={1750}
              />
            </div>
            <div className="about__copy">
              <p className="eyebrow">About the firm</p>
              <h2 id="about-heading">Advocate for clarity. Partner in resolution.</h2>
              <p>
                Xolani Lekoma Attorneys is a Johannesburg practice founded by admitted attorney
                Xolani Lekoma. Since admission on 8 September 2022, the firm has focused on
                practical, accessible legal support for property transactions, divorce matters, and
                the administration of deceased estates.
              </p>
              <p>
                Clients work directly with counsel who values plain language, steady process, and
                outcomes that respect both the law and the people it serves.
              </p>
              <dl className="about__facts">
                <div>
                  <dt>Founding attorney</dt>
                  <dd>Xolani Lekoma</dd>
                </div>
                <div>
                  <dt>Admitted</dt>
                  <dd>8 September 2022</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Parktown West, Johannesburg</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact reveal"
          ref={contactRef}
          aria-labelledby="contact-heading"
        >
          <div className="section__inner contact__layout">
            <div className="contact__intro">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-heading">Begin with a conversation.</h2>
              <p className="section__lede">
                Share a brief outline of your matter. We will respond to arrange a consultation at
                the Parktown West office or by appointment.
              </p>
              <ul className="contact__details">
                <li>
                  <span>Phone</span>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </li>
                <li>
                  <span>Office</span>
                  <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
                    {CONTACT.address}
                  </a>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                Full name
                <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label>
                How can we help?
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="A short note about your matter"
                />
              </label>
              <button className="btn btn--primary" type="submit">
                Send enquiry
              </button>
              {formStatus === 'sent' && (
                <p className="form-note" role="status">
                  Opening your email client to complete the message…
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-brand">Xolani Lekoma Attorneys</p>
          <p className="footer-meta">
            © {new Date().getFullYear()} · Attorneys of the High Court of South Africa · Johannesburg
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
