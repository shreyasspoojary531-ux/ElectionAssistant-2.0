import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function DecisionCard({
  icon: Icon,
  title,
  description,
  eyebrow,
  onClick,
  accentTheme = 'orange', // 'orange' or 'green'
}) {
  const isOrange = accentTheme === 'orange'
  const baseColor = isOrange ? '249,115,22' : '34,197,94'
  const darkColor = isOrange ? '234,88,12' : '21,128,61'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%',
        textAlign: 'left',
        background: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        borderRadius: '20px',
        backdropFilter: 'blur(24px)',
        padding: '28px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 220ms ease, box-shadow 220ms ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 0 0 1px rgba(${darkColor},0.35), 0 20px 48px rgba(${baseColor},0.18)`,
      }}
    >
      {/* Subtle gradient shimmer on top edge */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${darkColor},0.5), transparent)`,
          opacity: 0,
          transition: 'opacity 220ms ease',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
        }}
      >
        {/* Top row: eyebrow + icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="tag-pill">{eyebrow}</span>
          <motion.span
            whileHover={{ rotate: 8, scale: 1.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, rgba(${baseColor},0.18), rgba(${darkColor},0.14))`,
              border: `1px solid rgba(${darkColor},0.2)`,
              color: `rgb(${baseColor})`,
            }}
          >
            <Icon size={22} />
          </motion.span>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.25,
              marginBottom: '10px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--text-soft)',
            }}
          >
            {description}
          </p>
        </div>

        {/* Bottom CTA hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: `rgb(${baseColor})`,
          }}
        >
          Select
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.button>
  )
}
