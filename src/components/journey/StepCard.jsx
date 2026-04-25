import {
  BadgeCheck,
  Briefcase,
  Cpu,
  Landmark,
  MapPinned,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react'
import { motion } from 'framer-motion'
import StepProgressBar from '../ui/StepProgressBar.jsx'

const iconMap = {
  BadgeCheck,
  Briefcase,
  Cpu,
  Landmark,
  MapPinned,
  ShieldCheck,
}

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

export default function StepCard({ currentIndex, step, totalSteps }) {
  const Icon = iconMap[step.icon] ?? BadgeCheck

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      {/* Progress bar */}
      <motion.div variants={fadeUp}>
        <StepProgressBar
          currentIndex={currentIndex}
          totalSteps={totalSteps}
          stepLabel={step.title}
        />
      </motion.div>

      {/* Main content area */}
      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: Step content ── */}
        <motion.div
          variants={fadeUp}
          className="glass-panel"
          style={{ padding: '32px' }}
        >
          {/* Step icon + title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.1 }}
              style={{
                flexShrink: 0,
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(34,197,94,0.2))',
                border: '1px solid rgba(234,88,12,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-mid)',
              }}
            >
              <Icon size={28} />
            </motion.div>

            <div>
              <h1
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.12,
                  color: 'var(--text)',
                  marginBottom: '8px',
                }}
              >
                {step.title}
              </h1>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* Content points */}
          <motion.div
            variants={stagger}
            style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {step.content.slice(0, 3).map((point, i) => (
              <motion.div
                key={point}
                variants={fadeUp}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: 'var(--surface-strong)',
                  border: '1px solid var(--surface-border)',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginTop: '2px',
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                  {point}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Tips panel ── */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Quick memory aid */}
          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              background: 'linear-gradient(160deg, rgba(249,115,22,0.18), rgba(34,197,94,0.12))',
              border: '1px solid rgba(234,88,12,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative glow blob */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-30%',
                right: '-10%',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'rgba(234,88,12,0.15)',
                filter: 'blur(40px)',
              }}
            />
            {/* Indian flag bottom strip */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--saffron), rgba(255,255,255,0.4), var(--green))',
              }}
            />

            <div style={{ position: 'relative' }}>
              <span className="tag-pill" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                <Lightbulb size={11} />
                Quick memory aid
              </span>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'var(--text)',
                  fontWeight: 500,
                }}
              >
                {step.tips[0]}
              </p>
            </div>
          </div>

          {/* Helpful reminder */}
          <div
            style={{
              padding: '20px 22px',
              borderRadius: '16px',
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span className="tag-pill" style={{ marginBottom: '12px', display: 'inline-flex' }}>
              Helpful reminder
            </span>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
              {step.tips[1]}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
