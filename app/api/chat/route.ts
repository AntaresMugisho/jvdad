import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const last = Array.isArray(messages) && messages.length ? messages[messages.length - 1] : { content: '' }
    const text: string = typeof last?.content === 'string' ? last.content : ''

    // Réponse mockée : reformule et propose WhatsApp si besoin
    const reply =
      text
        ? `Merci pour votre message: "${text}". Un membre de l'équipe JVDAD vous répondra bientôt. Pour une réponse immédiate, utilisez le bouton WhatsApp.`
        : `Bonjour, comment puis-je vous aider aujourd'hui ?`

    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ reply: "Désolé, une erreur est survenue. Vous pouvez nous écrire sur WhatsApp." }, { status: 200 })
  }
}
