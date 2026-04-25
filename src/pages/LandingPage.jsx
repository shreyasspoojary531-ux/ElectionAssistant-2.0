import { useState } from 'react'
import { ArrowRight, CheckCircle2, Sparkles, Vote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'
import { sanitizePlainText } from '../utils/sanitize.js'

const featureItems = [
  'Step-by-step guided walkthrough of the voting process',
  'Voter ID readiness check and application guidance',
  'EVM & VVPAT explained with visual clarity',
  'Built-in election chatbot for instant answers',
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { setName } = useFlowState()
  const [draftName, setDraftName] = useState('')

  function handleContinue() {
    const cleanName = sanitizePlainText(draftName, 48)
    if (!cleanName) return
    setName(cleanName)
    navigate('/intent')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleContinue()
  }

  return (
    <FullscreenLayout contentClassName="py-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* ── LEFT: Hero ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <span className="tag-pill">
                <Sparkles size={12} />
                Decision-based election guide for India
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              style={{
                marginTop: '28px',
                fontSize: 'clamp(3rem, 6vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="gradient-text">Learn to vote</span>
              <br />
              <span style={{ color: 'var(--text)' }}>one calm step</span>
              <br />
              <span style={{ color: 'var(--text-soft)', fontWeight: 600 }}>at a time.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              style={{
                marginTop: '24px',
                fontSize: '1.2rem',
                lineHeight: 1.75,
                color: 'var(--text-soft)',
                maxWidth: '520px',
              }}
            >
              From voter ID to the polling booth — a guided journey built for
              first-time voters and returning citizens alike.
            </motion.p>

            {/* Input area */}
            <motion.div variants={fadeUp} style={{ marginTop: '36px', maxWidth: '480px' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                What should I call you?
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  id="name"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value.slice(0, 48))}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name…"
                  className="field-input text-lg py-3 px-4"
                  style={{ flex: 1 }}
                  autoFocus
                />
                <motion.button
                  type="button"
                  onClick={handleContinue}
                  disabled={!draftName.trim()}
                  className="action-button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    padding: '12px 24px',
                    fontSize: '1.05rem',
                  }}
                >
                  Begin
                  <ArrowRight size={16} />
                </motion.button>
              </div>
              <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Press Enter to continue ↵
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Info card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* EVM Illustration Card */}
            <div
              className="glass-panel"
              style={{
                padding: '40px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Top accent strip */}
              <div className="flag-band" style={{ marginBottom: '28px' }} />

              {/* Inline EVM SVG illustration */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px', transform: 'scale(1.2)' }}>
                <EVMIllustration />
              </div>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {featureItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-soft)',
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ marginTop: '4px', color: 'var(--accent-mid)', flexShrink: 0 }}
                    />
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* Bottom note */}
              <div
                style={{
                  marginTop: '18px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(249,115,22,0.06)',
                  border: '1px solid rgba(249,115,22,0.15)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                }}
              >
                <Vote size={13} style={{ display: 'inline', marginRight: '6px', color: 'var(--saffron)' }} />
                Always verify official election dates and constituency details on the ECI portal.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </FullscreenLayout>
  )
}

/* ── Inline EVM SVG Illustration ── */
function EVMIllustration() {
  return (
    <svg
      width="200"
      height="130"
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Electronic Voting Machine illustration"
      role="img"
    >
      {/* Main EVM body */}
      <rect x="20" y="20" width="160" height="90" rx="10" fill="rgba(249,115,22,0.12)" stroke="rgba(234,88,12,0.3)" strokeWidth="1.5" />

      {/* Screen area */}
      <rect x="30" y="28" width="100" height="50" rx="6" fill="rgba(0,0,0,0.3)" stroke="rgba(234,88,12,0.2)" strokeWidth="1" />
      <text x="80" y="50" textAnchor="middle" fill="rgba(234,88,12,0.8)" fontSize="8" fontWeight="600">ELECTION</text>
      <text x="80" y="62" textAnchor="middle" fill="rgba(234,88,12,0.5)" fontSize="6">COMMISSION OF INDIA</text>
      <rect x="38" y="68" width="84" height="2" rx="1" fill="rgba(234,88,12,0.2)" />

      {/* Candidate buttons */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle
            cx={150}
            cy={38 + i * 22}
            r="9"
            fill={i === 0 ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.06)'}
            stroke={i === 0 ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1"
          />
          {i === 0 && (
            <circle cx="150" cy="38" r="4" fill="rgba(249,115,22,0.9)" />
          )}
        </g>
      ))}

      {/* Bottom bar */}
      <rect x="20" y="100" width="160" height="10" rx="0" fill="rgba(249,115,22,0.08)" />
      <rect x="20" y="108" width="160" height="2" rx="0" fill="rgba(249,115,22,0.06)" />

      {/* Status LED */}
      <circle cx="35" cy="112" r="3" fill="rgba(34,197,94,0.8)" />
      <circle cx="35" cy="112" r="5" fill="rgba(34,197,94,0.15)" />

      {/* VVPAT paper slip */}
      <rect x="60" y="105" width="40" height="18" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <rect x="66" y="110" width="28" height="2" rx="1" fill="rgba(249,115,22,0.4)" />
      <rect x="66" y="115" width="20" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
    </svg>
  )
}
