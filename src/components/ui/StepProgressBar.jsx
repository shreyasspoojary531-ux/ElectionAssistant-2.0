/**
 * StepProgressBar — full-width animated gradient progress bar
 * for the journey step pages.
 */
export default function StepProgressBar({ currentIndex, totalSteps, stepLabel }) {
  const percent = totalSteps > 0 ? ((currentIndex + 1) / totalSteps) * 100 : 0

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Step {currentIndex + 1} of {totalSteps}
          {stepLabel ? ` · ${stepLabel}` : ''}
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--accent-mid)',
          }}
        >
          {Math.round(percent)}%
        </span>
      </div>
      <div className="step-progress-track">
        <div
          className="step-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
