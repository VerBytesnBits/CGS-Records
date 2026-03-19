// resources/js/Pages/Welcome.jsx

import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage().props as any;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="CGS — College of Graduate Studies" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

                * { box-sizing: border-box; }

                body {
                    font-family: 'DM Sans', sans-serif;
                    margin: 0;
                }

                .display-font { font-family: 'Cormorant Garamond', serif; }

                /* NAV */
                .navbar {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.25rem 4rem;
                    transition: all 0.4s ease;
                }
                .navbar.scrolled {
                    background: rgba(10, 40, 20, 0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(134, 239, 172, 0.15);
                    padding: 0.9rem 4rem;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                }
                .nav-logo img { width: 44px; height: 44px; object-fit: contain; }
                .nav-logo-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: 0.05em;
                }
                .nav-links {
                    display: flex;
                    gap: 2.5rem;
                    list-style: none;
                    margin: 0; padding: 0;
                }
                .nav-links a {
                    color: rgba(255,255,255,0.8);
                    text-decoration: none;
                    font-size: 0.9rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    font-weight: 400;
                    transition: color 0.2s;
                }
                .nav-links a:hover { color: #86efac; }
                .nav-actions { display: flex; gap: 1rem; align-items: center; }
                .btn-ghost {
                    color: rgba(255,255,255,0.85);
                    text-decoration: none;
                    font-size: 0.875rem;
                    letter-spacing: 0.05em;
                    padding: 0.5rem 0.75rem;
                    transition: color 0.2s;
                }
                .btn-ghost:hover { color: #fff; }
                .btn-outline {
                    border: 1px solid rgba(134, 239, 172, 0.5);
                    color: #86efac;
                    text-decoration: none;
                    font-size: 0.875rem;
                    letter-spacing: 0.08em;
                    padding: 0.55rem 1.4rem;
                    border-radius: 100px;
                    transition: all 0.25s;
                }
                .btn-outline:hover {
                    background: rgba(134,239,172,0.1);
                    border-color: #86efac;
                }
                .btn-primary {
                    background: #16a34a;
                    color: #fff;
                    border: none;
                    font-size: 0.875rem;
                    letter-spacing: 0.08em;
                    padding: 0.6rem 1.5rem;
                    border-radius: 100px;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: background 0.2s;
                }
                .btn-primary:hover { background: #15803d; }

                /* HERO */
                .hero {
                    position: relative;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('/Image/backg.jpg') center/cover no-repeat;
                    overflow: hidden;
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        160deg,
                        rgba(5, 46, 22, 0.82) 0%,
                        rgba(0, 0, 0, 0.55) 60%,
                        rgba(5, 46, 22, 0.7) 100%
                    );
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    color: #fff;
                    padding: 2rem;
                    animation: fadeUp 1s ease both;
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .hero-eyebrow {
                    display: inline-block;
                    font-size: 0.8rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #86efac;
                    border: 1px solid rgba(134,239,172,0.35);
                    padding: 0.35rem 1.2rem;
                    border-radius: 100px;
                    margin-bottom: 2rem;
                    animation: fadeUp 1s 0.15s ease both;
                }
                .hero-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(3.5rem, 8vw, 7rem);
                    font-weight: 700;
                    line-height: 1.05;
                    margin: 0 0 1.25rem;
                    letter-spacing: -0.01em;
                    animation: fadeUp 1s 0.25s ease both;
                }
                .hero-title span { color: #86efac; }
                .hero-sub {
                    font-size: clamp(1rem, 2vw, 1.25rem);
                    color: rgba(255,255,255,0.7);
                    max-width: 540px;
                    margin: 0 auto 2.5rem;
                    line-height: 1.6;
                    font-weight: 300;
                    animation: fadeUp 1s 0.35s ease both;
                }
                .hero-ctas {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    animation: fadeUp 1s 0.45s ease both;
                }
                .hero-cta-primary {
                    background: #16a34a;
                    color: #fff;
                    text-decoration: none;
                    padding: 0.85rem 2.2rem;
                    border-radius: 100px;
                    font-size: 0.9rem;
                    letter-spacing: 0.06em;
                    font-weight: 500;
                    transition: all 0.25s;
                }
                .hero-cta-primary:hover { background: #15803d; transform: translateY(-2px); }
                .hero-cta-secondary {
                    border: 1px solid rgba(255,255,255,0.35);
                    color: rgba(255,255,255,0.85);
                    text-decoration: none;
                    padding: 0.85rem 2.2rem;
                    border-radius: 100px;
                    font-size: 0.9rem;
                    letter-spacing: 0.06em;
                    font-weight: 400;
                    transition: all 0.25s;
                }
                .hero-cta-secondary:hover {
                    border-color: rgba(255,255,255,0.7);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .hero-scroll {
                    position: absolute;
                    bottom: 2.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.7rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    animation: fadeUp 1s 0.7s ease both;
                }
                .hero-scroll-line {
                    width: 1px;
                    height: 40px;
                    background: linear-gradient(to bottom, rgba(134,239,172,0.6), transparent);
                    animation: scrollPulse 2s ease-in-out infinite;
                }
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.4; transform: scaleY(1); }
                    50% { opacity: 1; transform: scaleY(1.1); }
                }

                /* STATS BAR */
                .stats-bar {
                    background: #052e16;
                    padding: 2rem 4rem;
                    display: flex;
                    justify-content: center;
                    gap: 5rem;
                    border-top: 1px solid rgba(134,239,172,0.1);
                }
                .stat-item { text-align: center; }
                .stat-number {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2.4rem;
                    font-weight: 700;
                    color: #86efac;
                    line-height: 1;
                }
                .stat-label {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.45);
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    margin-top: 0.3rem;
                }

                /* ABOUT */
                .about {
                    padding: 8rem 4rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1.4fr;
                    gap: 6rem;
                    align-items: center;
                }
                .about-label {
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #16a34a;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .about-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2.5rem, 4vw, 3.5rem);
                    font-weight: 700;
                    line-height: 1.1;
                    color: #052e16;
                    margin: 0 0 2rem;
                }
                .about-title em {
                    font-style: italic;
                    color: #16a34a;
                }
                .about-visual {
                    position: relative;
                }
                .about-card {
                    background: #052e16;
                    border-radius: 1.5rem;
                    padding: 3rem;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                }
                .about-card::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(134,239,172,0.15), transparent 70%);
                    border-radius: 50%;
                }
                .about-card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1.25rem;
                }
                .about-card h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.6rem;
                    font-weight: 600;
                    margin: 0 0 0.75rem;
                    color: #fff;
                }
                .about-card p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin: 0;
                }
                .about-card-accent {
                    position: absolute;
                    bottom: 1.5rem; right: 1.5rem;
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: rgba(134,239,172,0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #86efac;
                    font-size: 1.1rem;
                }
                .about-body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .about-body p {
                    color: #374151;
                    font-size: 1.05rem;
                    line-height: 1.8;
                    font-weight: 300;
                }
                .about-pillars {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                }
                .pillar {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    font-size: 0.9rem;
                    color: #374151;
                    font-weight: 400;
                }
                .pillar-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #16a34a;
                    flex-shrink: 0;
                }
                .about-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #16a34a;
                    font-size: 0.9rem;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(22,163,74,0.3);
                    padding-bottom: 0.1rem;
                    transition: gap 0.2s, border-color 0.2s;
                }
                .about-link:hover {
                    gap: 0.85rem;
                    border-color: #16a34a;
                }

                /* SERVICES */
                .services {
                    background: #f0fdf4;
                    padding: 7rem 4rem;
                    text-align: center;
                }
                .section-label {
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #16a34a;
                    font-weight: 500;
                    margin-bottom: 0.75rem;
                }
                .section-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 700;
                    color: #052e16;
                    margin: 0 0 3.5rem;
                }
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .service-card {
                    background: #fff;
                    border: 1px solid rgba(22,163,74,0.1);
                    border-radius: 1.25rem;
                    padding: 2.5rem 1.75rem;
                    transition: all 0.3s;
                    cursor: default;
                }
                .service-card:hover {
                    border-color: rgba(22,163,74,0.4);
                    box-shadow: 0 8px 32px rgba(22,163,74,0.1);
                    transform: translateY(-4px);
                }
                .service-icon {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                .service-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #052e16;
                    margin-bottom: 0.5rem;
                }
                .service-desc {
                    font-size: 0.85rem;
                    color: #6b7280;
                    line-height: 1.6;
                }

                /* FOOTER */
                .footer {
                    background: #052e16;
                    color: rgba(255,255,255,0.5);
                    text-align: center;
                    padding: 2.5rem;
                    font-size: 0.85rem;
                    letter-spacing: 0.05em;
                    border-top: 1px solid rgba(134,239,172,0.08);
                }
                .footer span { color: #86efac; }
            `}</style>

            {/* NAVBAR */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <a href="#home" className="nav-logo">
                    <img src="/Image/nobg_cgs.png" alt="CGS Logo" />
                    <span className="nav-logo-text">CGS</span>
                </a>

                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#files">Files</a></li>
                </ul>

                <div className="nav-actions">
                    {auth?.user ? (
                        <Link href="/dashboard" className="btn-ghost">Dashboard</Link>
                    ) : (
                        <>
                            <Link href="/login" className="btn-ghost">Login</Link>
                            <Link href="/register" className="btn-outline">Register</Link>
                        </>
                    )}
                    <button className="btn-primary">Generate →</button>
                </div>
            </nav>

            {/* HERO */}
            <section id="home" className="hero">
                <div className="hero-overlay" />
                <div className="hero-content">
                    <span className="hero-eyebrow">Palompon Institute of Technology</span>
                    <h1 className="hero-title">
                        College of<br /><span>Graduate Studies</span>
                    </h1>
                    <p className="hero-sub">
                        Empowering academic excellence through professional administrative and scholarly support services.
                    </p>
                    <div className="hero-ctas">
                        <a href="#services" className="hero-cta-primary">Explore Services</a>
                        <a href="#about" className="hero-cta-secondary">Learn More</a>
                    </div>
                </div>
                <div className="hero-scroll">
                    <div className="hero-scroll-line" />
                    <span>Scroll</span>
                </div>
            </section>

            {/* STATS BAR */}
            <div className="stats-bar">
                {[
                    { number: '500+', label: 'Graduate Students' },
                    { number: '12+', label: 'Programs Offered' },
                    { number: '20+', label: 'Years of Excellence' },
                    { number: '98%', label: 'Satisfaction Rate' },
                ].map((s) => (
                    <div className="stat-item" key={s.label}>
                        <div className="stat-number">{s.number}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ABOUT */}
            <section id="about">
                <div className="about">
                    {/* Left — visual card */}
                    <div className="about-visual">
                        <div className="about-card">
                            <div className="about-card-icon">🎓</div>
                            <h3>Academic Excellence Since 2000</h3>
                            <p>
                                Dedicated to fostering scholarly growth, research leadership, and professional development for graduate scholars across Leyte.
                            </p>
                            <div className="about-card-accent">✦</div>
                        </div>
                    </div>

                    {/* Right — text */}
                    <div className="about-body">
                        <div>
                            <div className="about-label">About Us</div>
                            <h2 className="about-title">
                                Where <em>scholarship</em> meets purpose
                            </h2>
                        </div>
                        <p>
                            The College of Graduate Studies at Palompon Institute of Technology stands as the premier hub for postgraduate education in the region. We provide comprehensive administrative, consulting, and academic management services tailored to the needs of graduate students and faculty.
                        </p>
                        <p>
                            Our commitment goes beyond records and documents — we champion the academic journey of every scholar who walks through our doors.
                        </p>
                        <div className="about-pillars">
                            {['Academic Integrity', 'Student Support', 'Research Excellence', 'Timely Records', 'Faculty Collaboration', 'Transparent Process'].map(p => (
                                <div className="pillar" key={p}>
                                    <span className="pillar-dot" />
                                    {p}
                                </div>
                            ))}
                        </div>
                        <a href="#services" className="about-link">
                            View our services <span>→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="services">
                <div className="section-label">What We Offer</div>
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    {[
                        { icon: '📋', name: 'Certification', desc: 'Official certificates for graduate students and alumni.' },
                        { icon: '🗂️', name: 'Records', desc: 'Secure management of academic records and transcripts.' },
                        { icon: '📄', name: 'Documents', desc: 'Processing of forms, endorsements, and official papers.' },
                        { icon: '🖨️', name: 'Printing', desc: 'High-quality printing of academic and official documents.' },
                    ].map((s) => (
                        <div className="service-card" key={s.name}>
                            <div className="service-icon">{s.icon}</div>
                            <div className="service-name">{s.name}</div>
                            <div className="service-desc">{s.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                © {new Date().getFullYear()} <span>College of Graduate Studies</span> — Palompon Institute of Technology
            </footer>
        </>
    );
}