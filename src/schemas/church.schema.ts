// src/schemas/church.schema.ts
import { z } from 'zod';

// Base Schema
const churchBaseSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  address: z.string().optional()
});

// Create Schema
export const createChurchSchema = churchBaseSchema;
export type CreateChurchDto = z.infer<typeof createChurchSchema>;

// Update Schema
export const updateChurchSchema = churchBaseSchema.partial();
export type UpdateChurchDto = z.infer<typeof updateChurchSchema>;

// Params Schema
export const churchParamsSchema = z.object({
  id: z.string().uuid("ID inválido")
});

// Response Schema
export const churchResponseSchema = churchBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime())
});
export type ChurchResponse = z.infer<typeof churchResponseSchema>;
