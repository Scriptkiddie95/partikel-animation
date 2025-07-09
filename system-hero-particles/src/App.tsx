import ParticleText from './ParticleText'
import EmailInput from './EmailInput'

export default function App() {
  return (
    <div style={{
      background: '#111',
      color: '#fff',
      fontFamily: 'Orbitron, Arial, sans-serif',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Willkommen bei <span style={{ color: '#0ff' }}>&nbsp;System Hero</span>
      </section>

      {/* Eigener Partikel-Effekt – mehrmals als Beispiel */}
      <section>
        <ParticleText text="IT Services" />
      </section>
      <section>
        <ParticleText text="Automation" />
      </section>
      <section>
        <ParticleText text="Security First" />
      </section>

      {/* m1guel Demo: Email Disintegrate (Original-Effekt zum Vergleich) */}
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: 600,
          background: '#191919',
          borderRadius: 12,
          boxShadow: '0 8px 40px #0006',
          padding: 48,
          margin: 'auto',
          border: '1px solid #4448'
        }}>
          <h2 style={{
            fontWeight: 600,
            fontSize: 28,
            marginBottom: 32,
            color: '#fff',
            letterSpacing: 1
          }}>
            m1guel E-Mail Disintegrate Demo
          </h2>
          <EmailInput
            onSubmit={email => {
              // Hier kannst du auch ein echtes Backend anbinden!
              // alert(`Email submitted: ${email}`)
            }}
          />
        </div>
      </section>

      {/* Footer Spacer */}
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>Made with ❤️ by System Hero</p>
      </div>
    </div>
  )
}
