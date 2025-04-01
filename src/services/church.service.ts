// src/services/church.service.ts
import prisma from '../lib/prisma';
import { CreateChurchDto, UpdateChurchDto } from '../schemas/church.schema';

export const churchService = {
  async createChurch(data: CreateChurchDto) {
    return prisma.church.create({
      data: {
        name: data.name,
        description: data.description,
        address: data.address
      },
      include: {
        schedules: true,
        recurringSchedules: true
      }
    });
  },

  async getAllChurches() {
    return prisma.church.findMany({
      include: {
        schedules: true,
        recurringSchedules: true
      }
    });
  },

  async getChurchById(id: string) {
    return prisma.church.findUnique({
      where: { id },
      include: {
        schedules: true,
        recurringSchedules: true
      }
    });
  },

  async updateChurch(id: string, data: UpdateChurchDto) {
    return prisma.church.update({
      where: { id },
      data,
      include: {
        schedules: true,
        recurringSchedules: true
      }
    });
  },

  async deleteChurch(id: string) {
    return prisma.church.delete({
      where: { id }
    });
  }
};