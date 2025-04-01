import  prisma from '../lib/prisma';
import { CreateScheduleDto } from '../schemas/schedule.schema';

export const scheduleService = {
  async createSchedule(data: CreateScheduleDto) {
    return prisma.schedule.create({
      data: {
        date: data.date,
        description: data.description,
        churchId: data.churchId,
        musicians: {
          connect: data.musicianIds?.map(id => ({ id })) || []
        }
      },
      include: {
        church: true,
        musicians: true
      }
    });
  },

  async getScheduleById(id: string) {
    return prisma.schedule.findUnique({
      where: { id },
      include: {
        church: true,
        musicians: true
      }
    });
  },

  async getSchedulesByChurch(churchId: string) {
    return prisma.schedule.findMany({
      where: { churchId },
      include: {
        church: true,
        musicians: true
      },
      orderBy: { date: 'asc' }
    });
  },

  async getUpcomingSchedules(days: number = 30) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);

    return prisma.schedule.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        church: true,
        musicians: true
      },
      orderBy: { date: 'asc' }
    });
  },

  async updateSchedule(id: string, data: any) {
    return prisma.schedule.update({
      where: { id },
      data: {
        date: data.date,
        description: data.description,
        musicians: {
          set: data.musicianIds?.map(id => ({ id })) || []
        }
      },
      include: {
        church: true,
        musicians: true
      }
    });
  },

  async deleteSchedule(id: string) {
    return prisma.schedule.delete({
      where: { id }
    });
  }
};