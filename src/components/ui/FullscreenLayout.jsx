import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from './PageTransition.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import AnimatedBlob from './AnimatedBlob.jsx'

export default function FullscreenLayout({
  children,
  className = '',
  contentClassName = '',
}) {
  return (
    <PageTransition className={`screen-shell ${className}`}>
      {/* Atmospheric blobs */}
      <AnimatedBlob
        color="rgba(249,115,22,0.14)"
        size={560}
        top="-12%"
        left="-8%"
        animationVariant={1}
        delay={0}
      />
      <AnimatedBlob
        color="rgba(34,197,94,0.12)"
        size={480}
        bottom="-15%"
        right="-6%"
        animationVariant={2}
        delay={3}
      />
      <AnimatedBlob
        color="rgba(249,115,22,0.07)"
        size={360}
        top="35%"
        right="15%"
        animationVariant={1}
        delay={6}
      />

      {/* Noise texture overlay for depth */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Main layout */}
      <div className="relative z-10 flex min-h-screen flex-col px-5 py-3 sm:px-8">
        {/* Top navigation */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px 6px 8px',
              borderRadius: '10px',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface-strong)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-soft)',
              textDecoration: 'none',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--surface-border-hover)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--surface-border)'
              e.currentTarget.style.color = 'var(--text-soft)'
            }}
          >
            {/* Mini India flag icon */}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '2px',
                width: '18px',
              }}
            >
              <span style={{ height: '3px', borderRadius: '2px', background: '#f97316' }} />
              <span style={{ height: '3px', borderRadius: '2px', background: 'var(--text-soft)' }} />
              <span style={{ height: '3px', borderRadius: '2px', background: '#22c55e' }} />
            </span>
            Indian Election Guide
          </Link>
          <ThemeToggle />
        </motion.div>

        {/* Page content */}
        <div className={`flex flex-1 items-center justify-center ${contentClassName}`}>
          {children}
        </div>
      </div>
    </PageTransition>
  )
}
