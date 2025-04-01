import  prisma from '../lib/prisma';
import { CreateScheduleInput, ScheduleWithRelations, UpdateScheduleInput } from '../modules/schedules/schedule.types';

export class ScheduleService {
  async createSchedule(data: CreateScheduleInput, changedBy: string) {
    const schedule = await prisma.schedule.create({
      data: {
        event_id: data.event_id,
        musician_id: data.musician_id,
      },
    });

    // Auditoria
    await prisma.scheduleAudit.create({
      data: {
        action: 'CREATE',
        new_data: schedule,
        changed_by: changedBy,
        schedule_id: schedule.id,
      },
    });

    return this.getScheduleById(schedule.id);
  }

  async updateSchedule(
    id: number,
    data: UpdateScheduleInput,
    changedBy: string
  ) {
    const oldSchedule = await prisma.schedule.findUnique({ where: { id } });

    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: {
        substitute_id: data.substitute_id,
      },
    });

    // Auditoria
    await prisma.scheduleAudit.create({
      data: {
        action: 'UPDATE',
        old_data: oldSchedule,
        new_data: updatedSchedule,
        changed_by: changedBy,
        schedule_id: id,
      },
    });

    return this.getScheduleById(id);
  }

  async getScheduleById(id: number): Promise<ScheduleWithRelations> {
    return prisma.schedule.findUniqueOrThrow({
      where: { id },
      include: {
        event: true,
        musician: true,
        substitute: true,
        audits: {
          orderBy: { created_at: 'desc' },
          take: 10,
        },
      },
    });
  }

  async listSchedulesByEvent(eventId: number) {
    return prisma.schedule.findMany({
      where: { event_id: eventId },
      include: {
        musician: true,
        substitute: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}