import { useCallback } from 'react'
import { SendHorizonal } from 'lucide-react'

export default function ChatInput({
  disabled,
  onChange,
  onSend,
  value,
}) {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }, [onSend])

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface-strong)',
        border: '1px solid var(--surface-border)',
        borderRadius: '24px',
        padding: '8px 8px 8px 18px',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
      }}
      className="glass-panel-hover"
    >
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={400}
        aria-label="Message to chatbot"
        placeholder="Ask about registration, EVMs, or voting day..."
        style={{
          flex: 1,
          minHeight: '44px',
          maxHeight: '120px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text)',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          resize: 'none',
          outline: 'none',
          padding: '10px 0',
        }}
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="action-button"
        style={{
          flexShrink: 0,
          width: '40px',
          height: '40px',
          borderRadius: '16px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Send message"
        title="Send message"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  )
}
