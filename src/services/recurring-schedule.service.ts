import prisma from '../lib/prisma';
import { scheduleService } from './schedule.service';
import { CreateRecurringScheduleDto, UpdateRecurringScheduleDto } from '../schemas/recurring-schedule.schema';

export const recurringScheduleService = {
  async generateSchedules(startDate: Date, endDate: Date) {
    const recurringSchedules = await prisma.recurringSchedule.findMany({
      include: {
        church: true,
        musicians: true
      }
    });

    const generatedSchedules = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      for (const recurring of recurringSchedules) {
        if (this.shouldGenerate(recurring, currentDate)) {
          const schedule = await scheduleService.createSchedule({
            date: new Date(currentDate).toISOString(),
            churchId: recurring.churchId,
            musicianIds: recurring.musicians.map(m => m.id),
            description: recurring.description || `Escala recorrente: ${recurring.church.name}`
          });
          generatedSchedules.push(schedule);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return generatedSchedules;
  },

    async createRecurringSchedule(data: CreateRecurringScheduleDto) {
        return prisma.recurringSchedule.create({
            data: {
                dayOfWeek: data.dayOfWeek,
                frequency: data.frequency,
                description: data.description,
                church: {
                    connect: { id: data.churchId }
                },
                musicians: {
                    connect: data.musicianIds?.map(id => ({ id }))
                }
            },
            include: {
                church: true,
                musicians: true
            }
        });
    },

    async getAllRecurringSchedules() {
        return prisma.recurringSchedule.findMany({
            include: {
                church: true,
                musicians: true
            }
        });
    },

    async getRecurringScheduleById(id: string) {
        return prisma.recurringSchedule.findUnique({
            where: { id },
            include: {
                church: true,
                musicians: true
            }
        });
    },

    async updateRecurringSchedule(id: string, data: UpdateRecurringScheduleDto) {
        return prisma.recurringSchedule.update({
            where: { id },
            data: {
                dayOfWeek: data.dayOfWeek,
                frequency: data.frequency,
                description: data.description,
                church: data.churchId ? { connect: { id: data.churchId } } : undefined,
                musicians: data.musicianIds ? { set: data.musicianIds.map(id => ({ id })) } : undefined
            },
            include: {
                church: true,
                musicians: true
            }
        });
    },

    async deleteRecurringSchedule(id: string) {
        return prisma.recurringSchedule.delete({
            where: { id }
        });
    },

    shouldGenerate(recurring: any, date: Date) {
        const dayMatches = date.getDay() === recurring.dayOfWeek;

        if (recurring.frequency === 'WEEKLY') return dayMatches;
        if (recurring.frequency === 'BIWEEKLY') {
            return dayMatches && Math.floor(date.getDate() / 7) % 2 === 0;
        }
        if (recurring.frequency === 'MONTHLY') {
            return dayMatches && date.getDate() <= 7;
        }

        return false;
    }
};