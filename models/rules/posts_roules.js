import z from "zod";

export const categoryShema = z.object({
  name: z.string().trim().min(1, "Vous devez mentionner le nom de la category"),
  slug: z.string().trim().min(1, "mot clé est obligaoir"),
  description: z.string().trim().min(1, "Entrer lq description"),
});

export const postShema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Vous devez mentionner le nom de la category"),
  slug: z.string().trim().min(1, "mot clé est obligaoir"),
  description: z.string().trim().min(1, "Entrer la description"),
  tag: z.string().trim().min(1, "Entrer le tag"),
  category: z.string().trim().min(1, "selectionner la category"),
  content: z.string().trim().min(1, "Le contenu"),
  description: z.string().trim().min(1, "Entrer la description"),
  // author: z.string().trim().min(1, "Indiquer l'auteur"),
});
