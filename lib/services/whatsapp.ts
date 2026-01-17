// Préparation pour une intégration WhatsApp Cloud API ou Twilio WhatsApp
// Ces fonctions sont des stubs côté client. La logique sécurisée doit vivre côté serveur.

export const whatsapp = {
  // Crée un deep link pour ouvrir une conversation WhatsApp
  getDeepLink(phoneE164: string, message?: string) {
    const base = `https://wa.me/${phoneE164.replace('+', '')}`
    return message ? `${base}?text=${encodeURIComponent(message)}` : base
  },
}
