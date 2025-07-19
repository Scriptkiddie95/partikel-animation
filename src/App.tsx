import { lazy, Suspense } from 'react'
import './App.css'
import './fonts.css'
import HeroTitleEffect from './HeroTitleEffect'

const ParticleText = lazy(() => import('./ParticleText'))
const EmailInput = lazy(() => import('./EmailInput'))

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
      {/* Hero Section mit verbessertem HeroTitleEffect */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          fontWeight: 'bold',
          perspective: '1000px'
        }}
      >
        <HeroTitleEffect 
          text="System Hero" 
          particleColor="#0ff"
          particleCount={400}
          delay={800}
        />
      </section>

      <Suspense fallback={<div style={{ height: '20vh' }} />}>
        {/* ParticleText Sections mit gestaffelter Animation */}
        <section style={{ 
          padding: '5rem 0', 
          textAlign: 'center',
          transform: 'translateZ(0)'
        }}>
          <ParticleText text="IT Services" />
        </section>
        <section style={{ 
          padding: '5rem 0', 
          textAlign: 'center',
          transform: 'translateZ(0)'
        }}>
          <ParticleText text="Automation" />
        </section>
        <section style={{ 
          padding: '5rem 0', 
          textAlign: 'center',
          transform: 'translateZ(0)'
        }}>
          <ParticleText text="Security First" />
        </section>

        {/* Email Input Demo mit verbessertem Styling */}
        <section
          style={{
            padding: '4rem',
            maxWidth: 960,
            margin: '0 auto',
            position: 'relative',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '1rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 style={{ 
            marginBottom: '2rem',
            fontSize: '2rem',
            color: '#0ff',
            textAlign: 'center'
          }}>
            E-Mail Partikel Demo
          </h2>
          <EmailInput
            onSubmit={(email) => {
              if (import.meta.env.DEV) {
                console.log('[E-Mail eingegeben]:', email)
              }
            }}
          />
        </section>
      </Suspense>

      {/* Footer mit Animation */}
      <footer
        style={{
          height: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          opacity: 0.6,
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))'
        }}
      >
        <span style={{ opacity: 0.8 }}>Made with</span>
        <span style={{ 
          margin: '0 0.5rem',
          color: '#ff0066',
          animation: 'pulse 2s infinite'
        }}>❤️</span>
        <span>by</span>
        <strong style={{ 
          marginLeft: '0.5rem',
          color: '#0ff',
          textShadow: '0 0 10px rgba(0,255,255,0.5)'
        }}>
          System Hero
        </strong>
      </footer>
    </div>
  )
}
