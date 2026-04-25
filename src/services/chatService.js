import { getMockResponse } from '../data/chatMocks.js'
import { sanitizePlainText } from '../utils/sanitize.js'

const apiUrl = import.meta.env.VITE_CHATBOT_API_URL?.trim()

function buildMockReply(messages) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')
  const answer = getMockResponse(latestUserMessage?.content ?? '')

  return {
    content: answer,
    source: 'mock',
  }
}

export function getChatMode() {
  return apiUrl ? 'api' : 'mock'
}

export async function sendChatMessage(messages) {
  const cleanMessages = messages.map((message) => ({
    role: message.role,
    content: sanitizePlainText(message.content, 500),
  }))

  if (!apiUrl) {
    return buildMockReply(cleanMessages)
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: cleanMessages }),
    })

    if (!response.ok) {
      throw new Error(`Chatbot request failed with status ${response.status}`)
    }

    const payload = await response.json()
    const content = sanitizePlainText(
      payload.message ?? payload.reply ?? payload.content ?? '',
      800,
    )

    if (!content) {
      return buildMockReply(cleanMessages)
    }

    return {
      content,
      source: 'api',
    }
  } catch (error) {
    return {
      ...buildMockReply(cleanMessages),
      fallbackReason: error instanceof Error ? error.message : 'Request failed',
    }
  }
}
