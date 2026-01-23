'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChatMessage } from '@/lib/types'
import { chatService } from '@/lib/services/chat'
import { links } from '@/lib/config'
import Markdown from 'react-markdown'

const STORAGE_KEY = 'jvdad_chat_history_v1'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      setMessages(JSON.parse(raw))
    } else {
      const hello: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "Bonjour 👋 Je suis l'assistant JVDAD. Comment puis-je vous aider ?",
        timestamp: new Date().toISOString(),
      }
      setMessages([hello])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const user: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim(), timestamp: new Date().toISOString() }
    setInput('')
    setMessages((prev) => [...prev, user])
    setLoading(true)
    try {
      const reply = await chatService.send([...messages, user])
      const assistant: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: reply, timestamp: new Date().toISOString() }
      setMessages((prev) => [...prev, assistant])
    } catch (e) {
      const assistant: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Je rencontre un souci pour répondre à votre rêquete. Vous pouvez reessayer un peu plus tard. \n\n_Si le problème persiste, n'hésitez pas à contacter notre service client (disponible du lundi au vendredi de 8h00 à 17h00) en cliquant ci-dessous:_\n- [**Ouvrir WhatsApp**](${links.whatsapp})\n- [**Envoyer un mail**](${links.mailto})`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistant])
    } finally {
      setLoading(false)
    }
  }

  const quick = [
    'Quels sont vos projets ?',
    'Comment vous contacter ?',
    "Qui êtes-vous ?",
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-[92vw] max-w-md rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <header className="flex items-center justify-between bg-primary-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Assistant Virtuel JVDAD</span>
            </div>
            <button aria-label="Fermer" onClick={() => setOpen(false)} className="p-1 rounded hover:bg-primary-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" /></svg>
            </button>
          </header>
          <div className="max-h-80 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white border'} rounded-2xl px-3 py-2 max-w-[80%] text-sm whitespace-pre-wrap`}>{m.role === 'user' ? m.content : <Markdown>{m.content}</Markdown>}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl px-3 py-2 text-sm">•••</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t p-2">
            <div className="flex items-center gap-2 p-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Écrivez votre message"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button onClick={send} className="rounded-lg bg-primary-600 px-3 py-2 text-white hover:bg-primary-700">Envoyer</button>
            </div>
            <div className="mt-1 flex flex-wrap gap-2 p-1">
              {quick.map((q) => (
                <button key={q} onClick={() => setInput(q)} className="text-xs rounded-full bg-slate-100 px-2 py-1 hover:bg-slate-200">{q}</button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <a href={links.whatsapp} target="_blank" rel="noreferrer" className="text-sm text-primary-700 hover:text-primary-800">Ouvrir WhatsApp officiel</a>
              <button onClick={() => { localStorage.removeItem(STORAGE_KEY); setMessages([]) }} className="text-xs text-slate-500 hover:text-slate-700">Effacer</button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-3 text-white shadow-lg hover:bg-primary-700"
        aria-label="Ouvrir le chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21.75 4.5v9a2.25 2.25 0 0 1-2.25 2.25H8.742L4.5 21.75v-6H4.5A2.25 2.25 0 0 1 2.25 13.5v-9z" /></svg>
        <span className="font-medium">Chat</span>
      </button>
    </div>
  )
}
