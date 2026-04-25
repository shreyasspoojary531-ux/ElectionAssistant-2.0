import { useFlowContext } from '../context/FlowContext.jsx'

export function useFlowState() {
  return useFlowContext()
}
