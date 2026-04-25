import { journeySteps } from '../data/journeySteps.js'

export const journeyStepIds = journeySteps.map((step) => step.id)

export function getStepIndex(stepId) {
  return journeyStepIds.findIndex((id) => id === stepId)
}

export function getJourneyStep(stepId) {
  return journeySteps.find((step) => step.id === stepId) ?? null
}

export function getNextStepId(stepId) {
  const currentIndex = getStepIndex(stepId)
  if (currentIndex === -1 || currentIndex === journeyStepIds.length - 1) {
    return null
  }

  return journeyStepIds[currentIndex + 1]
}

export function getPreviousStepId(stepId) {
  const currentIndex = getStepIndex(stepId)
  if (currentIndex <= 0) {
    return null
  }

  return journeyStepIds[currentIndex - 1]
}

export function getJourneyPath(stepId) {
  return `/journey/${stepId}`
}
