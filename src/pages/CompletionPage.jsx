import { MessageSquareMore, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'

// Simple CSS particle explosion instead of confetti strips
const particles = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  angle: (i * 360) / 12,
  delay: i * 0.04,
  distance: 120 + Math.random() * 80,
  scale: 0.5 + Math.random() * 0.8,
  color: i % 3 === 0 ? 'var(--saffron)' : i % 3 === 1 ? 'var(--green)' : 'var(--accent-mid)',
}))

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}

export default function CompletionPage() {
  const navigate = useNavigate()
  const { restartFlow, userName } = useFlowState()

  function handleLearnAgain() {
    restartFlow()
    navigate('/learn')
  }

  return (
    <FullscreenLayout>
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          padding: '60px 40px',
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Background glow radial */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Checkmark Celebration */}
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
          {/* Particle burst */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                scale: p.scale,
                opacity: 0,
              }}
              transition={{ duration: 1.2, delay: 0.2 + p.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: p.color,
                marginLeft: '-4px',
                marginTop: '-4px',
                boxShadow: `0 0 10px ${p.color}`,
              }}
            />
          ))}

          {/* Core Checkmark SVG */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(34,197,94,0.2))',
              border: '1px solid rgba(234,88,12,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(234,88,12,0.2), inset 0 0 20px rgba(249,115,22,0.2)',
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M20 6L9 17L4 12"
                stroke="url(#paint0_linear)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="paint0_linear" x1="4" y1="6" x2="20" y2="17" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fed7aa" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 10 }}>
          <motion.span variants={fadeUp} className="tag-pill">
            Journey complete
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{
              marginTop: '24px',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text)',
            }}
          >
            {userName ? (
              <>
                <span className="gradient-text">{userName}</span>
                <span style={{ color: 'var(--text-soft)' }}>, you're ready</span>
                <br />
                <span>to vote.</span>
              </>
            ) : (
              <>
                You're <span className="gradient-text">ready to vote!</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              marginTop: '20px',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--text-soft)',
              maxWidth: '540px',
            }}
          >
            You have covered booth checks, documents, the EVM flow, and how your vote is recorded.
            Keep the official voter portal handy for election dates.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: '40px',
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={handleLearnAgain}
              className="action-button secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={16} />
              Learn again
            </button>
            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="action-button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquareMore size={16} />
              Ask questions
            </button>
          </motion.div>
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
