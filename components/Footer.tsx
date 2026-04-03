export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to top, #020c18, #041524)',
      borderTop: '1px solid rgba(118, 175, 229, 0.08)',
      padding: '60px 24px 30px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1780e3, #76afe5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: 'white',
                boxShadow: '0 0 15px rgba(23, 128, 227, 0.4)',
              }}>
                GC
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>
                GeBe<span style={{ color: '#76afe5' }}>Cert</span>
              </span>
            </div>
            <p style={{ color: '#5a7a99', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Blockchain-powered anti-counterfeiting technology for a world without fakes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Solution', 'How it Works', 'Industries', 'Benefits'].map(item => (
                <a key={item} href="#" style={{ color: '#5a7a99', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.3s' }}
                   onMouseEnter={e => (e.currentTarget.style.color = '#76afe5')}
                   onMouseLeave={e => (e.currentTarget.style.color = '#5a7a99')}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['About', 'Careers', 'Press', 'Contact'].map(item => (
                <a key={item} href="#" style={{ color: '#5a7a99', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.3s' }}
                   onMouseEnter={e => (e.currentTarget.style.color = '#76afe5')}
                   onMouseLeave={e => (e.currentTarget.style.color = '#5a7a99')}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ color: '#5a7a99', fontSize: '0.88rem' }}>info@gebecert.com</p>
              <p style={{ color: '#5a7a99', fontSize: '0.88rem' }}>Global Headquarters</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                {['X', 'Li', 'In'].map(social => (
                  <a key={social} href="#" style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(8, 48, 86, 0.5)', border: '1px solid rgba(118, 175, 229, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#5a7a99', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1780e3'; e.currentTarget.style.color = '#76afe5'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(118, 175, 229, 0.15)'; e.currentTarget.style.color = '#5a7a99'; }}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(118, 175, 229, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#3a5a7a', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} GeBeCert. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ color: '#3a5a7a', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.3s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#76afe5')}
                 onMouseLeave={e => (e.currentTarget.style.color = '#3a5a7a')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
