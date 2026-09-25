import { email, z } from 'zod';

export const passwordSchema = z.object({
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas são diferentes",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.email("Insira um e-mail válido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.")
})

export const registerShema = z.object({
  accountType: z.string(),
  fullName: z.string().min(15, "Insira seu nome completo.").max(100, "Nome longo demais, máximo de 100 caracteres."),
  email: z.email("Insira um e-mail válido."),
  password: passwordSchema,
})