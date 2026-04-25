import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getJourneyPath } from '../../flows/journeyFlow.js'

export default function JourneyNav({ nextStepId, previousStepId }) {
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowRight' && nextStepId) {
        navigate(getJourneyPath(nextStepId))
      }
      if (event.key === 'ArrowLeft' && previousStepId) {
        navigate(getJourneyPath(previousStepId))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, nextStepId, previousStepId])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      {/* Back button */}
      <motion.button
        type="button"
        onClick={() => previousStepId && navigate(getJourneyPath(previousStepId))}
        disabled={!previousStepId}
        whileHover={previousStepId ? { x: -3 } : {}}
        whileTap={previousStepId ? { scale: 0.97 } : {}}
        className="action-button secondary"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={17} />
        Previous
      </motion.button>

      {/* Keyboard hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
        }}
      >
        <kbd
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '20px',
            borderRadius: '5px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-strong)',
            fontSize: '0.68rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)',
          }}
        >
          ←
        </kbd>
        <kbd
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '20px',
            borderRadius: '5px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-strong)',
            fontSize: '0.68rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)',
          }}
        >
          →
        </kbd>
        <span>to navigate</span>
      </div>

      {/* Next / Finish button */}
      <motion.button
        type="button"
        onClick={() => navigate(nextStepId ? getJourneyPath(nextStepId) : '/done')}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.97 }}
        className="action-button"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        {nextStepId ? 'Next step' : 'Finish journey'}
        <ArrowRight size={17} />
      </motion.button>
    </div>
  )
}
