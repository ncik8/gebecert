'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Hero Background - Canvas Particles
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(23, 128, 227, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(118, 175, 229, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" style={{ opacity: 0.6 }} />;
}

// Section reveal hook
function useSectionReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Inline SVG Icons
function ShieldIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  );
}

function ChipIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  );
}

function BlockchainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/>
      <rect x="9" y="11" width="6" height="6" rx="1"/>
      <path d="M5 13V17a2 2 0 002 2h10a2 2 0 002-2v-4"/><path d="M12 3v4"/>
    </svg>
  );
}

function ScanIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
    </svg>
  );
}

function VerifyIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/><circle cx="12" cy="12" r="10"/>
    </svg>
  );
}

function AuthIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/>
    </svg>
  );
}

function TrackingIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

function ConnectIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function AnalyticsIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}

function MedicineIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
    </svg>
  );
}

function WineIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8M12 11v11M5 3l7 8 7-8"/>
    </svg>
  );
}

function HandbagIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

function WatchIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/>
      <path d="M16.51 17.35l-.35 3.83a2 2 0 01-2 1.82H9.83a2 2 0 01-2-1.82l-.35-3.83"/>
      <path d="M7.49 6.65l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 012 1.82l.35 3.83"/>
    </svg>
  );
}

function JewelryIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card" style={{ padding: '36px 28px', borderRadius: '20px', textAlign: 'center' }}>
      <div className="industry-icon" style={{ margin: '0 auto 20px', color: '#76afe5' }}>{icon}</div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#7aa8cc', fontSize: '0.9rem', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

function IndustryCard({ icon, title, stat }: { icon: React.ReactNode; title: string; stat: string }) {
  return (
    <div className="glass-card" style={{ padding: '32px 24px', borderRadius: '20px', textAlign: 'center' }}>
      <div className="industry-icon" style={{ margin: '0 auto 16px', color: '#76afe5' }}>{icon}</div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{title}</h3>
      <p style={{ color: '#1780e3', fontSize: '0.82rem', fontWeight: 600 }}>{stat}</p>
    </div>
  );
}

export default function HomePage() {
  useSectionReveal();

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', padding: '0 24px',
      }}>
        <div className="animated-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        <div className="hero-gradient" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        <ParticleCanvas />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(23, 128, 227, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '860px' }}>
          <div className="fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px',
            borderRadius: '50px', background: 'rgba(23, 128, 227, 0.1)',
            border: '1px solid rgba(23, 128, 227, 0.3)', marginBottom: '32px',
            fontSize: '0.85rem', color: '#76afe5', fontWeight: 500,
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%', background: '#1780e3',
              boxShadow: '0 0 10px #1780e3', display: 'inline-block',
            }} />
            Blockchain-Powered Anti-Counterfeiting
          </div>

          <h1 className="fade-in-up fade-in-up-delay-1" style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-2px', marginBottom: '24px',
          }}>
            End Counterfeiting Forever
            <span className="text-gradient">Forever</span>
            <br />with Blockchain
          </h1>

          <p className="fade-in-up fade-in-up-delay-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#7aa8cc', lineHeight: 1.7,
            maxWidth: '640px', margin: '0 auto 40px',
          }}>
            Two solutions for every budget: QR + PIN for mass market, or HF chip technology for luxury brands. Both verified on blockchain.
          </p>

          <div className="fade-in-up fade-in-up-delay-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 40px', textDecoration: 'none' }}>
              Protect Your Products
            </a>
            <a href="#solution" className="btn-secondary" style={{ fontSize: '1rem', padding: '16px 40px', textDecoration: 'none' }}>
              See How It Works
            </a>
          </div>

          <div className="fade-in-up fade-in-up-delay-4" style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '64px', flexWrap: 'wrap' }}>
            {[['ISO 27001', 'Certified'], ['500+', 'Brands'], ['99.99%', 'Uptime']].map(([value, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: '#5a7a99', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: '#3a5a7a', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase',
          animation: 'float 3s ease-in-out infinite',
        }}>
          <span>Scroll</span>
          <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, #1780e3, transparent)' }} />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section-reveal" id="problem" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ color: '#1780e3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Crisis</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>
              A <span style={{ color: '#1780e3' }}>$2.8 Trillion</span> Problem
            </h2>
            <div className="line-accent" style={{ margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { number: '$2.8T', label: 'Annual Global Economic Loss', sub: 'From counterfeit goods' },
              { number: '1 in 5', label: 'Products from China are Counterfeit', sub: 'OECD report findings' },
              { number: '700K+', label: 'Deaths Annually', sub: 'From counterfeit pharmaceuticals alone' },
              { number: '3.3%', label: 'of World Trade', sub: 'Is counterfeit goods' },
            ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: '36px', borderRadius: '20px' }}>
                <div className="counter-stat" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#1780e3', lineHeight: 1, marginBottom: '10px' }}>{stat.number}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '6px' }}>{stat.label}</div>
                <div style={{ fontSize: '0.85rem', color: '#5a7a99' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section-reveal" id="solution" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, rgba(8, 48, 86, 0.15) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ color: '#1780e3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Solution</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Solutions for Every Brand</h2>
            <p style={{ color: '#7aa8cc', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Whether you sell alcohol or luxury watches, we have a solution that fits your budget and security needs.
            </p>
            <div className="line-accent" style={{ margin: '20px auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '40px 32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(23, 128, 227, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'inline-block', background: '#1780e3', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '16px' }}>MASS MARKET</div>
              <div style={{ color: '#76afe5', marginBottom: '20px' }}><QRCodeIcon size={56} /></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>QR + PIN Activation</h3>
              <p style={{ color: '#7aa8cc', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Each product has a unique QR code with hidden PIN under scratch-off. Consumer scratches to reveal, enters online - activating ownership.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Works with any smartphone', 'No special app needed', 'One-time PIN activation', 'Scratch-off security', '$0.005-0.01 per product'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0c4e8', fontSize: '0.85rem' }}>
                    <span style={{ color: '#1780e3', fontSize: '1.1rem' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '40px 32px', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '2px solid #1780e3' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(118, 175, 229, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #1780e3, #76afe5)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '16px' }}>LUXURY BRANDS</div>
              <div style={{ color: '#76afe5', marginBottom: '20px' }}><ChipIcon size={56} /></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>HF Chip Technology</h3>
              <p style={{ color: '#7aa8cc', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                High-frequency NFC chips embedded in product. Patent-registered technology with advanced encryption. For luxury watches, handbags, jewelry.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Patent-registered technology', 'Military-grade encryption', 'Supply chain tracking', 'Ownership transfer app', 'Full data dashboard'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0c4e8', fontSize: '0.85rem' }}>
                    <span style={{ color: '#1780e3', fontSize: '1.1rem' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '40px 32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(118, 175, 229, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ color: '#76afe5', marginBottom: '20px' }}><BlockchainIcon size={56} /></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Blockchain Verification</h3>
              <p style={{ color: '#7aa8cc', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Both solutions verified on immutable blockchain. Complete audit trail from manufacturing to end consumer.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Activation rate tracking', 'Geographic verification', 'Ownership transfers', 'Grey market detection'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0c4e8', fontSize: '0.85rem' }}>
                    <span style={{ color: '#1780e3', fontSize: '1.1rem' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-reveal" id="how-it-works" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ color: '#1780e3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Simple Process</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Three Steps to Authenticity</h2>
            <div className="line-accent" style={{ margin: '0 auto' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
            {[
              { title: 'Scan', description: 'Consumer scans the product with any NFC-enabled smartphone. No app required — just tap and go.', icon: <ScanIcon size={32} /> },
              { title: 'Verify', description: "The microchip sends a cryptographically signed challenge to the blockchain, verifying the product's unique identity.", icon: <VerifyIcon size={32} /> },
              { title: 'Authenticate', description: 'Instant result: genuine, counterfeit-alert, or gray-market. Full supply chain history displayed transparently.', icon: <AuthIcon size={32} /> },
            ].map((item, i) => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', width: '100%', position: 'relative' }}>
                {i < 2 && <div className="step-connector" style={{ position: 'absolute', left: '31px', top: '64px', zIndex: 0 }} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexShrink: 0, zIndex: 1 }}>
                  <div className="step-badge">{item.icon}</div>
                </div>
                <div style={{ paddingTop: '8px', paddingBottom: i < 2 ? '60px' : '0' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#7aa8cc', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '500px' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="section-reveal" id="benefits" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, rgba(8, 48, 86, 0.12) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ color: '#1780e3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Why GeBeCert</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Enterprise-Grade Benefits</h2>
            <div className="line-accent" style={{ margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <BenefitCard icon={<ShieldIcon size={40} />} title="Secure" description="Military-grade AES-256 encryption with hardware-backed key storage" />
            <BenefitCard icon={<TrackingIcon size={40} />} title="Tracking" description="Real-time supply chain visibility from factory to consumer" />
            <BenefitCard icon={<ConnectIcon size={40} />} title="Connect" description="Seamless integration with existing ERP and inventory systems" />
            <BenefitCard icon={<AnalyticsIcon size={40} />} title="Analytics" description="Deep consumer insights and product journey intelligence" />
            <BenefitCard icon={<ShieldIcon size={40} />} title="Stop Counterfeit" description="100% detection rate with zero false positives" />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-reveal" id="industries" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ color: '#1780e3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Industries</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Trusted Across Sectors</h2>
            <div className="line-accent" style={{ margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <IndustryCard icon={<MedicineIcon size={40} />} title="Medicine" stat="Anti-counterfeit critical" />
            <IndustryCard icon={<WineIcon size={40} />} title="Wine & Spirits" stat="Provenance verified" />
            <IndustryCard icon={<HandbagIcon size={40} />} title="Luxury Goods" stat="Brand protection" />
            <IndustryCard icon={<WatchIcon size={40} />} title="Watches" stat="Authenticity guaranteed" />
            <IndustryCard icon={<JewelryIcon size={40} />} title="Jewelry" stat="Full traceability" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-reveal" id="contact" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, rgba(8, 48, 86, 0.15) 0%, rgba(8, 48, 86, 0.25) 100%)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#1780e3', fontSize: '0.85rem',  fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Get Started</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Ready to End Counterfeiting?</h2>
          <p style={{ color: '#7aa8cc', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '40px' }}>
            Join 500+ brands already protecting their products and customers with GeBeCert technology.
          </p>

          <form
            onSubmit={e => { e.preventDefault(); alert('Thank you! We will be in touch shortly.'); }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}
          >
            <input
              type="email"
              placeholder="Enter your work email"
              required
              className="input-glass"
              style={{ flex: '1 1 280px', minWidth: '0', maxWidth: '360px', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              Request Demo
            </button>
          </form>

          <p style={{ color: '#3a5a7a', fontSize: '0.82rem' }}>
            No spam. Unsubscribe anytime. We respond within 24 hours.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
