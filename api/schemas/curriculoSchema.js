import { z } from 'zod';

const base64 = z
  .string()
  .min(1, 'campo obrigatório')
  .refine(
    (v) => {
      try {
        return Buffer.from(v, 'base64').toString('base64').replace(/=+$/, '') === v.replace(/=+$/, '');
      } catch {
        return false;
      }
    },
    { message: 'valor não é um base64 válido' },
  );

export const curriculoSchema = z.object({
  nome: z.string().min(1, 'campo "nome" é obrigatório'),
  email: z.email('email inválido'),
  telefone: z
    .string()
    .regex(/^\(\d{2}\)\d{4,5}-\d{4}$/, 'telefone deve estar no formato (99)99999-9999'),
  linkedin: z.string().min(1, 'campo "linkedin" é obrigatório'),
  pdfcurriculo: base64,
  vaga: z.enum(['delphi', 'mobile', 'nodejs', 'react']).default('delphi'),
  ambiente: z.enum(['teste', 'producao']).default('teste'),
  zip: base64,
});
