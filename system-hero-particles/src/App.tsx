import ParticleText from './ParticleText'
import M1guelOriginal from './M1guelOriginal'

export default function App() {
  return (
    <div style={{ background: '#111', color: '#fff', fontFamily: 'Orbitron, Arial, sans-serif' }}>
      {/* Hero Section (oben, ohne Animation) */}
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

      {/* Scroll-Abschnitt 1 */}
      <section>
        <ParticleText text="IT Services" />
      </section>

      {/* Scroll-Abschnitt 2 */}
      <section>
        <ParticleText text="Automation" />
      </section>

      {/* Scroll-Abschnitt 3 */}
      <section>
        <ParticleText text="Security First" />
      </section>

      {/* Vergleich mit Original-Gist */}
      <M1guelOriginal />

      {/* Footer Spacer */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Made with ❤️ by System Hero</p>
      </div>
    </div>
  )
}
