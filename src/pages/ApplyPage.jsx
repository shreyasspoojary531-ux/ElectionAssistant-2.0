import {
  ArrowRight,
  ExternalLink,
  FileCheck2,
  Home,
  Image,
  Smartphone,
  CheckCircle2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'

const documentCards = [
  {
    icon: FileCheck2,
    title: 'Identity proof',
    description: 'A valid government-issued identity document.',
    color: 'rgba(249,115,22,0.15)',
    iconColor: 'var(--accent-mid)',
  },
  {
    icon: Home,
    title: 'Address proof',
    description: 'A current document matching your voting address.',
    color: 'rgba(34,197,94,0.12)',
    iconColor: '#22c55e',
  },
  {
    icon: Image,
    title: 'Photo',
    description: 'A recent passport-style photograph if required.',
    color: 'rgba(249,115,22,0.12)',
    iconColor: 'var(--saffron)',
  },
  {
    icon: Smartphone,
    title: 'Mobile & email',
    description: 'For OTP and application status tracking.',
    color: 'rgba(34,197,94,0.12)',
    iconColor: 'var(--green)',
  },
]

const steps = [
  'Visit the official voter services portal and choose the registration or status flow.',
  'Upload or enter your identity, age, and address details carefully.',
  'Save the acknowledgement number after submission.',
  'Return here and continue into the booth walkthrough when ready.',
]

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export default function ApplyPage() {
  const navigate = useNavigate()
  const { hasVoterId, voterStatus } = useFlowState()
  const alreadyReady = hasVoterId === 'yes'

  return (
    <FullscreenLayout contentClassName="py-10">
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT panel ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="glass-panel"
          style={{ padding: '36px' }}
        >
          <motion.span variants={fadeUp} className="tag-pill">
            {alreadyReady ? 'Ready to carry forward' : 'Application essentials'}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{
              marginTop: '20px',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--text)',
            }}
          >
            {alreadyReady ? (
              <>
                Great.{' '}
                <span className="gradient-text">Keep your voter ID</span>
                {' '}within easy reach.
              </>
            ) : (
              <>
                No voter ID yet?{' '}
                <span className="gradient-text">Here is your path</span>
                {' '}to get started.
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              marginTop: '14px',
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: 'var(--text-soft)',
            }}
          >
            {alreadyReady
              ? `Since you marked yourself as ${voterStatus ?? 'a voter'}, the next step is a guided walkthrough of polling-day confidence.`
              : 'Use the official voter services portal for the current registration workflow, then save your acknowledgement to track progress.'}
          </motion.p>

          {/* Document cards grid */}
          <motion.div
            variants={stagger}
            style={{
              marginTop: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {documentCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: card.color,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    color: card.iconColor,
                    marginBottom: '12px',
                  }}
                >
                  <card.icon size={18} />
                </div>
                <h3
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '4px',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          <div>
            <span className="tag-pill">Simple checklist</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {index + 1}
                  </span>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--text-soft)' }}>
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="action-button secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={15} />
              Official ECI portal
            </a>
            <motion.button
              type="button"
              onClick={() => navigate('/journey/booth')}
              className="action-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Start the voting journey
              <ArrowRight size={17} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
