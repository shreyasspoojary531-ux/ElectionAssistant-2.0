import { createContext, useContext, useState } from 'react'
import { sanitizePlainText } from '../utils/sanitize.js'

const FlowContext = createContext(null)

export function FlowProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [intent, setIntent] = useState(null)
  const [voterStatus, setVoterStatus] = useState(null)
  const [hasVoterId, setHasVoterId] = useState(null)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)

  const value = {
    userName,
    intent,
    voterStatus,
    hasVoterId,
    currentJourneyStep,
    setName(nextName) {
      setUserName(sanitizePlainText(nextName, 48))
    },
    setIntent,
    setVoterStatus,
    setVoterId(nextValue) {
      setHasVoterId(nextValue)
    },
    setCurrentJourneyStep,
    restartFlow() {
      setIntent(null)
      setVoterStatus(null)
      setHasVoterId(null)
      setCurrentJourneyStep(0)
    },
  }

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlowContext() {
  const context = useContext(FlowContext)

  if (!context) {
    throw new Error('useFlowContext must be used inside FlowProvider')
  }

  return context
}
