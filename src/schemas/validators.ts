// src/schemas/validators.ts
import prisma from '../lib/prisma';
import { z } from 'zod';

// Validador assíncrono para verificar se igreja existe
export const churchExistsValidator = z.string().uuid().superRefine(async (id, ctx) => {
  const exists = await prisma.church.findUnique({ where: { id } });
  if (!exists) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Igreja não encontrada"
    });
  }
});

// Validador para datas futuras
export const futureDateValidator = z.string().datetime().superRefine((val, ctx) => {
  const date = new Date(val);
  if (date < new Date()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Data deve ser no futuro"
    });
  }
});