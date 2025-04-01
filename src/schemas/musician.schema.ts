// src/schemas/musician.schema.ts
import { z } from 'zod';

// Base Schema
const musicianBaseSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  instruments: z.array(z.string().min(1, "Instrumento não pode ser vazio"))
});

// Create Schema
export const createMusicianSchema = musicianBaseSchema;
export type CreateMusicianDto = z.infer<typeof createMusicianSchema>;

// Update Schema
export const updateMusicianSchema = musicianBaseSchema.partial();
export type UpdateMusicianDto = z.infer<typeof updateMusicianSchema>;

// Params Schema
export const musicianParamsSchema = z.object({
  id: z.string().uuid("ID inválido")
});

// Response Schema
export const musicianResponseSchema = musicianBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime())
});
export type MusicianResponse = z.infer<typeof musicianResponseSchema>;
