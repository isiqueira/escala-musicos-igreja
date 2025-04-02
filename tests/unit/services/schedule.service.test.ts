import prisma from '../../../src/lib/prisma';
import { scheduleService } from '../../../src/services/schedule.service';
import { churchFixture } from '../../fixtures/churches';
import { musicianFixture } from '../../fixtures/musicians';


describe('ScheduleService', () => {
  let testChurch: any;
  let testMusician: any;

  beforeAll(async () => {
    testChurch = await prisma.church.create({ data: churchFixture });
    testMusician = await prisma.musician.create({ data: musicianFixture });
  });

  afterEach(async () => {
    await prisma.schedule.deleteMany();
  });

  describe('createSchedule', () => {
    it('should create schedule with musicians', async () => {
      const schedule = await scheduleService.createSchedule({
        date: new Date(Date.now() + 86400000).toISOString(),
        churchId: testChurch.id,
        musicianIds: [testMusician.id]
      });

      expect(schedule.musicians.length).toBe(1);
      expect(schedule.churchId).toBe(testChurch.id);
    });
  });

  describe('getUpcomingSchedules', () => {
    it('should filter by date range', async () => {
      await prisma.schedule.createMany({
        data: [
          {
            date: new Date(Date.now() + 86400000), // Amanhã
            churchId: testChurch.id
          },
          {
            date: new Date(Date.now() + 86400000 * 8), // 8 dias
            churchId: testChurch.id
          }
        ]
      });

      const schedules = await scheduleService.getUpcomingSchedules(7); // 7 dias
      expect(schedules.length).toBe(1);
    });
  });

  describe('updateSchedule', () => {
    it('should replace musicians', async () => {
      const schedule = await prisma.schedule.create({
        data: {
          date: new Date(Date.now() + 86400000),
          churchId: testChurch.id,
          musicians: { connect: { id: testMusician.id } }
        }
      });

      const newMusician = await prisma.musician.create({
        data: { ...musicianFixture, email: 'new@test.com' }
      });

      const updated = await scheduleService.updateSchedule(schedule.id, {
        musicianIds: [newMusician.id]
      });

      expect(updated.musicians[0].id).toBe(newMusician.id);
    });
  });

  describe('Conflict Detection', () => {
    it('should detect musician schedule conflict', async () => {
      const musician = await prisma.musician.create({
        data: { ...musicianFixture, email: 'conflict@test.com' }
      });
  
      const date = new Date(Date.now() + 86400000).toISOString(); // Amanhã
      
      // Cria escala existente
      await prisma.schedule.create({
        data: {
          date,
          church: { create: { name: 'Conflict Church' } },
          musicians: { connect: { id: musician.id } }
        }
      });
  
      // Tenta criar nova escala no mesmo horário
      await expect(
        scheduleService.createSchedule({
          date,
          churchId: testChurch.id,
          musicianIds: [musician.id]
        })
      ).rejects.toThrow('Conflito de agenda');
    });
  });  

});
