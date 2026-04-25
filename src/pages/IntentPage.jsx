import { MessageSquareMore, School } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import DecisionCard from '../components/ui/DecisionCard.jsx'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import { useFlowState } from '../hooks/useFlowState.js'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function IntentPage() {
  const navigate = useNavigate()
  const { setIntent, userName } = useFlowState()

  function handleSelect(nextIntent) {
    setIntent(nextIntent)
    navigate(nextIntent === 'learn' ? '/learn' : '/chat')
  }

  return (
    <FullscreenLayout>
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}
        >
          <motion.span variants={fadeUp} className="tag-pill">
            Choose your path
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{
              marginTop: '20px',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text)',
            }}
          >
            {userName ? (
              <>
                <span style={{ color: 'var(--text-soft)', fontWeight: 600 }}>Hey </span>
                <span className="gradient-text">{userName}</span>
                <span style={{ color: 'var(--text-soft)', fontWeight: 600 }}>, why</span>
                <br />
                <span>are you here today?</span>
              </>
            ) : (
              'Why are you here today?'
            )}
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
            Pick a guided walkthrough for the full story, or open the chatbot
            if you have a specific question in mind.
          </motion.p>
        </motion.div>

        {/* Decision cards */}
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
          {[
            {
              icon: School,
              title: 'Learn the full journey',
              description:
                'Walk step by step from voter ID readiness to the EVM, the polling station flow, and voting-day etiquette.',
              eyebrow: 'Guided mode',
              intent: 'learn',
            },
            {
              icon: MessageSquareMore,
              title: 'Ask a quick question',
              description:
                'Chat with the election assistant about booths, eligibility, documents, EVMs, and voting-day basics.',
              eyebrow: 'Chat mode',
              intent: 'ask',
            },
          ].map((option) => (
            <motion.div key={option.intent} variants={fadeUp}>
              <DecisionCard
                icon={option.icon}
                title={option.title}
                description={option.description}
                eyebrow={option.eyebrow}
                onClick={() => handleSelect(option.intent)}
                accentTheme={option.intent === 'learn' ? 'orange' : 'green'}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
