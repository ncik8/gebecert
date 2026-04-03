'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Solution', href: '#solution' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Benefits', href: '#benefits' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(2, 12, 24, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(118, 175, 229, 0.1)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1780e3, #76afe5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'white',
              boxShadow: '0 0 20px rgba(23, 128, 227, 0.5)',
            }}>
              GC
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.5px' }}>
              GeBe<span style={{ color: '#76afe5' }}>Cert</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-nav">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{ color: '#a0c4e8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#76afe5')}
                onMouseLeave={e => (e.currentTarget.style.color = '#a0c4e8')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#contact"
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '10px 24px', textDecoration: 'none' }}
            >
              Get Started
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: '5px',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <span style={{ width: '24px', height: '2px', background: '#76afe5', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ width: '24px', height: '2px', background: '#76afe5', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: '24px', height: '2px', background: '#76afe5', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(2, 12, 24, 0.98)',
          borderTop: '1px solid rgba(118, 175, 229, 0.1)',
          padding: '20px 24px',
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: '#a0c4e8', textDecoration: 'none', fontSize: '1rem', borderBottom: '1px solid rgba(118, 175, 229, 0.1)' }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'none' }}>
            Get Started
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
