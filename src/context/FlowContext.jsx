import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { sanitizePlainText } from '../utils/sanitize.js'

const FlowContext = createContext(null)

export function FlowProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [intent, setIntent] = useState(null)
  const [voterStatus, setVoterStatus] = useState(null)
  const [hasVoterId, setHasVoterId] = useState(null)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)

  const setName = useCallback((nextName) => {
    setUserName(sanitizePlainText(nextName, 48))
  }, [])

  const setVoterId = useCallback((nextValue) => {
    setHasVoterId(nextValue)
  }, [])

  const restartFlow = useCallback(() => {
    setIntent(null)
    setVoterStatus(null)
    setHasVoterId(null)
    setCurrentJourneyStep(0)
  }, [])

  const value = useMemo(() => ({
    userName,
    intent,
    voterStatus,
    hasVoterId,
    currentJourneyStep,
    setName,
    setIntent,
    setVoterStatus,
    setVoterId,
    setCurrentJourneyStep,
    restartFlow,
  }), [
    userName,
    intent,
    voterStatus,
    hasVoterId,
    currentJourneyStep,
    setName,
    setVoterId,
    restartFlow
  ])

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlowContext() {
  const context = useContext(FlowContext)

  if (!context) {
    throw new Error('useFlowContext must be used inside FlowProvider')
  }

  return context
}
