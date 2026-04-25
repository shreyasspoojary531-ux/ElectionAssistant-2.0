import { BookOpenCheck, UserRoundCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import DecisionCard from '../components/ui/DecisionCard.jsx'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function LearnGatePage() {
  const navigate = useNavigate()
  const { setVoterStatus } = useFlowState()

  function handleSelect(status) {
    setVoterStatus(status)
    navigate('/voter-id')
  }

  return (
    <FullscreenLayout>
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}
        >
          <motion.span variants={fadeUp} className="tag-pill">
            Your voter status
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{
              marginTop: '20px',
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: 'var(--text)',
            }}
          >
            Which starting point{' '}
            <span className="gradient-text">fits you best?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              marginTop: '16px',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--text-soft)',
            }}
          >
            Your answer shapes the guidance on the next screens — the core
            walkthrough stays the same.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            marginTop: '40px',
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          }}
        >
          <motion.div variants={fadeUp}>
            <DecisionCard
              icon={BookOpenCheck}
              title="First-time voter"
              description="You want the basics explained carefully, including what to expect on your very first visit to a polling station."
              eyebrow="New voter"
              onClick={() => handleSelect('first-time')}
              accentTheme="orange"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <DecisionCard
              icon={UserRoundCheck}
              title="Registered voter"
              description="You are already on the rolls and want a fast refresher on documents, booths, and the EVM process."
              eyebrow="Returning voter"
              onClick={() => handleSelect('registered')}
              accentTheme="green"
            />
          </motion.div>
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
