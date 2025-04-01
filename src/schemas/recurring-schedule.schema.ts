// src/schemas/recurring-schedule.schema.ts
import { z } from 'zod';

// Frequency Enum
export const frequencyEnum = z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']);

// Base Schema
const recurringScheduleBaseSchema = z.object({
  dayOfWeek: z.number().min(0).max(6, "Dia da semana deve ser entre 0 (Domingo) e 6 (Sábado)"),
  frequency: frequencyEnum,
  description: z.string().optional(),
  churchId: z.string().uuid("ID da igreja inválido"),
  musicianIds: z.array(z.string().uuid("ID do músico inválido")).optional()
});

// Create Schema
export const createRecurringScheduleSchema = recurringScheduleBaseSchema;
export type CreateRecurringScheduleDto = z.infer<typeof createRecurringScheduleSchema>;

// Update Schema
export const updateRecurringScheduleSchema = recurringScheduleBaseSchema.partial();
export type UpdateRecurringScheduleDto = z.infer<typeof updateRecurringScheduleSchema>;

// Response Schema
export const recurringScheduleResponseSchema = recurringScheduleBaseSchema.extend({
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
export type RecurringScheduleResponse = z.infer<typeof recurringScheduleResponseSchema>;
