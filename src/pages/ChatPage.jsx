import { useEffect, useRef, useState } from 'react'
import { MessageSquareMore, RefreshCcw, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FullscreenLayout from '../components/ui/FullscreenLayout.jsx'
import ChatBubble from '../components/chatbot/ChatBubble.jsx'
import ChatInput from '../components/chatbot/ChatInput.jsx'
import SuggestedQuestions from '../components/chatbot/SuggestedQuestions.jsx'
import { starterQuestions } from '../data/chatMocks.js'
import { useChatbot } from '../hooks/useChatbot.js'
import { getChatMode } from '../services/chatService.js'

export default function ChatPage() {
  const { isSending, lastSource, messages, resetChat, sendMessage } = useChatbot()
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150
      
      if (isNearBottom || isSending) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }
  }, [messages, isSending])

  async function handleSend(nextText = draft) {
    if (!nextText.trim()) return
    await sendMessage(nextText)
    setDraft('')
  }

  return (
    <FullscreenLayout contentClassName="py-6">
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: 'calc(100vh - 7.5rem)',
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'minmax(320px, 0.85fr) minmax(400px, 1.15fr)',
        }}
      >
        {/* ── LEFT panel: Context ── */}
        <motion.div
          initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(34,197,94,0.2))',
                  border: '1px solid rgba(234,88,12,0.25)',
                  color: 'var(--accent-mid)',
                }}
              >
                <MessageSquareMore size={24} />
              </div>
              <div>
                <span className="tag-pill" style={{ marginBottom: '4px' }}>
                  Ask anything
                </span>
                <h1
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1.2,
                  }}
                >
                  Election helper chat
                </h1>
              </div>
            </div>

            <p style={{ marginTop: '20px', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
              This assistant answers common questions about registration, voter ID readiness, polling
              booths, EVMs, and what to expect inside the polling station.
            </p>

            {/* Status pills */}
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'var(--surface-strong)',
                  border: '1px solid var(--surface-border)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-soft)',
                }}
              >
                Mode: {getChatMode()}
              </span>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'var(--surface-strong)',
                  border: '1px solid var(--surface-border)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-soft)',
                }}
              >
                Source: {lastSource}
              </span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="tag-pill">Suggested starts</span>
            <SuggestedQuestions questions={starterQuestions} onSelect={handleSend} />
          </div>

          <button
            type="button"
            onClick={resetChat}
            className="action-button secondary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
          >
            <RefreshCcw size={15} />
            Reset conversation
          </button>
        </motion.div>

        {/* ── RIGHT panel: Chat interface ── */}
        <motion.div
          initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ display: 'flex', flexDirection: 'column', padding: '24px', overflow: 'hidden' }}
        >
          {/* Scrollable messages area */}
          <div
            ref={listRef}
            className="hidden-scrollbar"
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingRight: '8px',
              paddingBottom: '20px',
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isSending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
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
                <div className="chat-bubble-bot" style={{ display: 'flex', gap: '4px', padding: '16px', alignItems: 'center' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input area */}
          <div style={{ paddingTop: '16px' }}>
            <ChatInput
              value={draft}
              onChange={setDraft}
              onSend={() => handleSend()}
              disabled={isSending}
            />
          </div>
        </motion.div>
      </div>
    </FullscreenLayout>
  )
}
