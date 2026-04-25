import { IdCard, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const choices = [
  {
    value: 'yes',
    icon: IdCard,
    title: 'Yes, I have one',
    description: 'Show me what to keep ready and how the polling booth journey works.',
    accentColor: 'rgba(34,197,94,0.18)',
    accentBorder: 'rgba(34,197,94,0.35)',
    accentGlow: 'rgba(34,197,94,0.12)',
    iconColor: '#22c55e',
    ringColor: 'rgba(34,197,94,0.5)',
  },
  {
    value: 'no',
    icon: ShieldAlert,
    title: 'No, I need to apply',
    description: 'Walk me through the application basics before the voting-day journey.',
    accentColor: 'rgba(249,115,22,0.14)',
    accentBorder: 'rgba(249,115,22,0.32)',
    accentGlow: 'rgba(249,115,22,0.1)',
    iconColor: 'var(--saffron)',
    ringColor: 'rgba(249,115,22,0.5)',
  },
]

export default function VoterIdPage() {
  const navigate = useNavigate()
  const { hasVoterId, setVoterId } = useFlowState()

  function handleChoice(nextValue) {
    setVoterId(nextValue)
    navigate('/apply')
  }

  return (
    <FullscreenLayout>
      <div className="w-full max-w-4xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="tag-pill">Voter ID check</span>
            <h1
              style={{
                marginTop: '20px',
                fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: 'var(--text)',
              }}
            >
              Do you already have a{' '}
              <span className="gradient-text">voter ID?</span>
            </h1>
            <p
              style={{
                marginTop: '14px',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-soft)',
                maxWidth: '440px',
                margin: '14px auto 0',
              }}
            >
              Your answer shapes the next screen — we frame the guidance around
              where you currently stand.
            </p>
          </motion.div>

          {/* Choice cards */}
          <motion.div
            variants={stagger}
            style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            }}
          >
            {choices.map((choice) => {
              const isSelected = hasVoterId === choice.value
              return (
                <motion.div key={choice.value} variants={fadeUp}>
                  <motion.button
                    type="button"
                    onClick={() => handleChoice(choice.value)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '28px',
                      borderRadius: '20px',
                      border: `1px solid ${isSelected ? choice.ringColor : 'var(--surface-border)'}`,
                      background: isSelected ? choice.accentColor : 'var(--surface)',
                      backdropFilter: 'blur(20px)',
                      cursor: 'pointer',
                      boxShadow: isSelected
                        ? `0 0 0 1px ${choice.ringColor}, 0 16px 40px ${choice.accentGlow}`
                        : 'none',
                      transition: 'all 220ms ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        {/* Icon */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            background: choice.accentColor,
                            border: `1px solid ${choice.accentBorder}`,
                            color: choice.iconColor,
                            marginBottom: '18px',
                          }}
                        >
                          <choice.icon size={24} />
                        </div>

                        <h2
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: '8px',
                          }}
                        >
                          {choice.title}
                        </h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-soft)' }}>
                          {choice.description}
                        </p>
                      </div>

                      {/* Selected checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <CheckCircle2 size={22} style={{ color: choice.iconColor, flexShrink: 0 }} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
