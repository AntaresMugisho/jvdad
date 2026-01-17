import { ChatMessage } from '@/lib/types'

export const chatService = {
  async send(messages: ChatMessage[]): Promise<string> {
    // Envoi à l'endpoint interne (mock) / prêt pour un backend réel
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })
    if (!res.ok) throw new Error('Chat API error')
    const data = await res.json()
    return data.reply as string
  },
}
