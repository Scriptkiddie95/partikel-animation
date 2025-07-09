
import React, { useEffect, useRef } from 'react'

const M1guelOriginal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://gist.github.com/m1guelpf/f17540f221b575d2f818c9585664f55f.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    containerRef.current?.appendChild(script)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        margin: '100vh auto',
        padding: '2rem',
        background: '#222',
        borderRadius: '12px',
        maxWidth: '800px',
        color: '#fff'
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Referenz: Original M1guel Text Canvas</h2>
    </div>
  )
}

export default M1guelOriginal
