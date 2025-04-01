// src/schemas/schedule.schema.ts
import { z } from 'zod';

// Base Schema
const scheduleBaseSchema = z.object({
  date: z.string().datetime("Data inválida"),
  description: z.string().optional(),
  churchId: z.string().uuid("ID da igreja inválido"),
  musicianIds: z.array(z.string().uuid("ID do músico inválido")).optional()
});

// Create Schema
export const createScheduleSchema = scheduleBaseSchema;
export type CreateScheduleDto = z.infer<typeof createScheduleSchema>;

// Update Schema
export const updateScheduleSchema = scheduleBaseSchema.partial();
export type UpdateScheduleDto = z.infer<typeof updateScheduleSchema>;

// Params Schema
export const scheduleParamsSchema = z.object({
  id: z.string().uuid("ID inválido")
});

// Response Schema
export const scheduleResponseSchema = scheduleBaseSchema.extend({
  id: z.string().uuid(),
  church: z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  musicians: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  ),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime())
});
export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;
