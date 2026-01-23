
import { GoogleGenerativeAI } from '@google/generative-ai'
import { posts } from '@/lib/data/posts'
import { projects } from '@/lib/data/projects'
import { testimonials } from '@/lib/data/testimonials'
import { org, links } from '@/lib/config'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({ path: '.env.local' })

async function main() {
    console.log("Checking GEMINI_API_KEY...")
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY is missing in .env.local")
        process.exit(1)
    }
    console.log("✅ GEMINI_API_KEY found")

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Construct Context (same as in route.ts)
    const now = new Date()
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const drcTime = new Date(utc + (3600000 * 2))

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

    const userMessage = "Quels sont vos projets agricoles ?"
    console.log(`\nTesting with message: "${userMessage}"\n`)

    try {
        const chat = model.startChat({
            history: [],
        })
        const result = await chat.sendMessage(context + "\n\nQuestion utilisateur: " + userMessage)
        const response = result.response.text()

        console.log("✅ API Response received:")
        console.log("---------------------------------------------------")
        console.log(response)
        console.log("---------------------------------------------------")

        if (response.length > 0) {
            console.log("✅ Verification PASSED")
        } else {
            console.error("❌ Verification FAILED: Empty response")
            process.exit(1)
        }

    } catch (e) {
        console.error("❌ Verification FAILED:", e)
        process.exit(1)
    }
}

main()
