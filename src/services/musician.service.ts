import prisma from '../lib/prisma';
import { CreateMusicianDto } from '../schemas/musician.schema';

export const musicianService = {
  async createMusician(data: CreateMusicianDto) {
    return prisma.musician.create({
      data: {
        name: data.name,
        email: data.email,
        instruments: data.instruments
      }
    });
  },

  async getAvailableMusicians(date: Date, instrument?: string) {
    const whereClause: any = {
      schedules: {
        none: {
          date: {
            equals: date
          }
        }
      }
    };

    if (instrument) {
      whereClause.instruments = {
        has: instrument
      };
    }

    return prisma.musician.findMany({
      where: whereClause
    });
  },

  async getMusicianById(id: string) {
    return prisma.musician.findUnique({
      where: { id },
      include: {
        schedules: true,
        recurringSchedules: true
      }
    });
  },

  async updateMusician(id: string, data: any) {
    return prisma.musician.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        instruments: data.instruments
      }
    });
  },

  async deleteMusician(id: string) {
    return prisma.musician.delete({
      where: { id }
    });
  }
};