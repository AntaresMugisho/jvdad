import z from "zod";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegisterAuthSchema = z
  .object({
    name: z.string().trim().min(1, "Vous devez mentionner le nom"),

    email: z
      .string()
      .trim()
      .min(1, { message: "Le mail est obligatoir " })
      .toLowerCase()
      .regex(EMAIL_REGEX, { message: "Cet email n'est pas valide" }),
    password: z
      .string()
      .min(1, { message: "Le mot de pass est obligatoir - \n " })
      .min(8, { message: "Le mot de pass doit au mois avoir 8 caracteres - " })
      .regex(/[a-zA-Z]/, {
        message: "Le Mot de pass doit aumois avoir une lettre - ",
      })
      .regex(/[0-9]/, {
        message: "Le Mot de pass doit aumois avoir un chiffre - ",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Le Mot de pass doit aumois avoir un caractere special",
      })
      .trim(),
    password_confirmation: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Le mot de pass de correspond pas!",
        path: ["password_confirmation"],
      });
    }
  });

export const LoginAuthSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Le mail est obligatoir " })
    .toLowerCase()
    .regex(EMAIL_REGEX, { message: "Cet email n'est pas valide" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Le mot de pass est obligatoir - \n " })
    .trim(),
});
