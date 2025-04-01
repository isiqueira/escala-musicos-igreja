import prisma from '../lib/prisma';
import { scheduleService } from './schedule.service';

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
            date: new Date(currentDate),
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

  private shouldGenerate(recurring: any, date: Date) {
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