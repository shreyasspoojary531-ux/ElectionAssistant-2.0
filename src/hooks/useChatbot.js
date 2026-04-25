import { startTransition, useEffect, useRef, useState } from 'react'
import { introMessage } from '../chatbot/chatbotConfig.js'
import { sendChatMessage } from '../services/chatService.js'
import { sanitizePlainText } from '../utils/sanitize.js'

function createMessage(role, content, extra = {}) {
  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${role}-${Date.now()}-${Math.random()}`,
    role,
    content,
    ...extra,
  }
}

const initialMessages = [createMessage('assistant', introMessage)]

export function useChatbot() {
  const [messages, setMessages] = useState(initialMessages)
  const [status, setStatus] = useState('idle')
  const [lastSource, setLastSource] = useState('mock')
  const historyRef = useRef(initialMessages)

  useEffect(() => {
    historyRef.current = messages
  }, [messages])

  async function sendMessage(text) {
    const cleanText = sanitizePlainText(text, 400)

    if (!cleanText || status === 'sending') {
      return
    }

    const userMessage = createMessage('user', cleanText)
    const nextHistory = [...historyRef.current, userMessage]

    setMessages(nextHistory)
    setStatus('sending')

    const reply = await sendChatMessage(nextHistory)

    startTransition(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', reply.content, { source: reply.source }),
      ])
      setLastSource(reply.source)
      setStatus('idle')
    })
  }

  function resetChat() {
    setMessages(initialMessages)
    setStatus('idle')
    setLastSource('mock')
  }

  return {
    isSending: status === 'sending',
    lastSource,
    messages,
    resetChat,
    sendMessage,
  }
}
