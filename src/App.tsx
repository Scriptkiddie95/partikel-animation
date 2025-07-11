import ParticleText from './ParticleText'
import EmailInput from './EmailInput'
import AssembleTextEffect from './AssembleTextEffect'

export default function App() {

  return (
    <div
      style={{
        background: '#111',
        color: '#fff',
        fontFamily: 'Orbitron, Inter, sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* Hero Section mit AssembleTextEffect */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        <AssembleTextEffect text="System Hero" />
      </section>

      {/* ParticleText Sections */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <ParticleText text="IT Services" />
      </section>
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <ParticleText text="Automation" />
      </section>
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <ParticleText text="Security First" />
      </section>

      {/* Email Input Demo */}
      <section
        style={{
          padding: '4rem',
          maxWidth: 960,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>
          m1guel E-Mail Disintegrate Demo
        </h2>
        <EmailInput
          onSubmit={(email) => {
            console.log('[E-Mail eingegeben]:', email)
          }}
        />
      </section>

      {/* Footer */}
      <footer
        style={{
          height: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          opacity: 0.6,
        }}
      >
        Made with ❤️ by <strong style={{ color: '#0ff' }}>&nbsp;System Hero</strong>
      </footer>
    </div>
  )
}
