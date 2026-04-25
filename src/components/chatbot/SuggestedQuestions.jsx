import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
}

export default function SuggestedQuestions({ onSelect, questions }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
    >
      {questions.map((question) => (
        <motion.div key={question} variants={fadeUp}>
          <button
            type="button"
            onClick={() => onSelect(question)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'var(--surface-strong)',
              border: '1px solid var(--surface-border)',
              color: 'var(--text-soft)',
              fontSize: '0.85rem',
              transition: 'all 200ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(234,88,12,0.45)'
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,88,12,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--surface-border)'
              e.currentTarget.style.color = 'var(--text-soft)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1)'
            }}
          >
            {question}
          </button>
        </motion.div>
      ))}
    </motion.div>
  )
}
