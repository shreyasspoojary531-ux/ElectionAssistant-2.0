import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import JourneyNav from '../components/journey/JourneyNav.jsx'
import StepCard from '../components/journey/StepCard.jsx'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import {
  getJourneyStep,
  getNextStepId,
  getPreviousStepId,
  getStepIndex,
  journeyStepIds,
} from '../flows/journeyFlow.js'
import { useFlowState } from '../hooks/useFlowState.js'

export default function JourneyStepPage() {
  const { stepId } = useParams()
  const { setCurrentJourneyStep } = useFlowState()
  const step = getJourneyStep(stepId)

  useEffect(() => {
    if (!stepId) return
    const nextIndex = getStepIndex(stepId)
    if (nextIndex >= 0) {
      setCurrentJourneyStep(nextIndex)
    }
  }, [setCurrentJourneyStep, stepId])

  if (!step || !stepId) {
    return <Navigate to="/journey/booth" replace />
  }

  const currentIndex = getStepIndex(stepId)
  const previousStepId = getPreviousStepId(stepId)
  const nextStepId = getNextStepId(stepId)

  return (
    <FullscreenLayout contentClassName="py-8">
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StepCard
          currentIndex={currentIndex}
          step={step}
          totalSteps={journeyStepIds.length}
        />

        {/* Navigation bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ padding: '16px 24px' }}
        >
          <JourneyNav previousStepId={previousStepId} nextStepId={nextStepId} />
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
