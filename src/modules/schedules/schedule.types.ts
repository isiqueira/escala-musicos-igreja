import { Prisma } from '@prisma/client';

/**
 * Tipos para criação de escalas
 */
export type CreateScheduleInput = {
  event_id: number;
  musician_id: number;
  substitute_id?: number; // Opcional no create
};

/**
 * Tipos para atualização de escalas
 */
export type UpdateScheduleInput = {
  substitute_id?: number | null; // Permite remover substituto
};

/**
 * Tipo completo de uma escala com todas as relações
 * (Usando Prisma.GetPayload para inferência automática)
 */
export type ScheduleWithRelations = Prisma.ScheduleGetPayload<{
  include: {
    event: true;
    musician: {
      select: {
        id: true;
        name: true;
        whatsapp_id: true;
      };
    };
    substitute: {
      select: {
        id: true;
        name: true;
        whatsapp_id: true;
      } | null;
    };
    audits: {
      select: {
        action: true;
        changed_by: true;
        created_at: true;
      };
    };
  };
}>;

/**
 * Filtros para listagem de escalas
 */
export type ScheduleFilters = {
  event_id?: number;
  musician_id?: number;
  start_date?: Date;
  end_date?: Date;
};