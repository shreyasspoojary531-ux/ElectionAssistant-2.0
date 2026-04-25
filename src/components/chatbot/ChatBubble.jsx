import { Bot, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { sanitizePlainText } from '../../utils/sanitize.js'

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  const cleanContent = sanitizePlainText(message.content, 900)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {!isUser && (
        <div
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(34,197,94,0.05))',
            border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--green)',
          }}
        >
          <Bot size={16} />
        </div>
      )}

      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        {cleanContent}
      </div>

      {isUser && (
        <div
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(34,197,94,0.05))',
            border: '1px solid rgba(234,88,12,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-mid)',
          }}
        >
          <UserRound size={16} />
        </div>
      )}
    </motion.div>
  )
}
