export default function ProgressDots({ currentStep, totalSteps }) {
  // Upgraded to a slim progress bar style (dots kept for small counts)
  const percent = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep
        const isPast = index < currentStep

        return (
          <div
            key={index}
            style={{
              height: '4px',
              borderRadius: '999px',
              flex: isActive ? 2.5 : 1,
              background: isPast
                ? 'var(--green)'
                : isActive
                  ? 'linear-gradient(90deg, var(--accent-from), var(--accent-to))'
                  : 'var(--surface-border)',
              boxShadow: isActive ? '0 0 8px var(--accent-glow-sm)' : 'none',
              transition: 'all 380ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )
      })}
    </div>
  )
}
