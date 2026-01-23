import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { posts } from '@/lib/data/posts'
import { projects } from '@/lib/data/projects'
import { testimonials } from '@/lib/data/testimonials'
import { org, links } from '@/lib/config'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage.content

    // Check for human handover availability (8h-17h UTC+2)
    const now = new Date()
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const drcTime = new Date(utc + (3600000 * 2)) // UTC+2
    const hour = drcTime.getHours()
    const isBusinessHours = hour >= 8 && hour < 17

    // Construct Context
    const context = `
    Tu es l'assistant virtuel de JVDAD (${org.tagline}).
    Ton rôle est de répondre aux questions sur l'organisation, ses projets, et l'agriculture durable.
    
    INFORMATIONS JVDAD:
    Nom: ${org.name}
    Mission: Autonomiser les communautés rurales par l'agriculture durable.
    Contact WhatsApp: ${links.whatsapp}
    Email: ${links.mailto}
    
    PROJETS RÉCENTS:
    ${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}
    
    ARTICLES DE BLOG:
    ${posts.map(p => `- ${p.title}: ${p.excerpt}`).join('\n')}
    
    TÉMOIGNAGES:
    ${testimonials.map(t => `- ${t.name} (${t.role}): ${t.content}`).join('\n')}
    
    RÈGLES:
    1. Réponds uniquement aux questions concernant JVDAD, l'agriculture, ou les projets mentionnés.
    2. Si tu ne connais pas la réponse, ou si l'utilisateur demande un humain, propose de contacter l'équipe sur WhatsApp.
    3. Heure actuelle (RDC): ${drcTime.toLocaleTimeString()}. Heures d'ouverture: 8h-17h.
    4. Si l'utilisateur veut parler à un humain:
       - Si c'est entre 8h et 17h, dis que l'équipe est disponible et donne le lien WhatsApp: ${links.whatsapp}
       - Sinon, dis que l'équipe est indisponible mais qu'il peut laisser un message sur WhatsApp: ${links.whatsapp}
    5. Sois courtois, professionnel et encourageant.
    6. Réponds en français.
    `

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing")
      return NextResponse.json({ reply: "Configuration manquante: Clé API Gemini introuvable. Veuillez contacter l'administrateur." }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    })

    const result = await chat.sendMessage(context + "\n\nQuestion utilisateur: " + userMessage)
    const response = result.response
    const text = response.text()

    return NextResponse.json({ reply: text })
  } catch (e) {
    console.error("Chat API Error:", e)
    return NextResponse.json({ reply: "Désolé, je rencontre des difficultés techniques. Vous pouvez nous écrire sur WhatsApp ou nous envoyer un mail." }, { status: 500 })
  }
}
