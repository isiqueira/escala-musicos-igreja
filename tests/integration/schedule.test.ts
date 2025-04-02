import { buildApp } from '../../src/app';
import { scheduleFixture } from '../fixtures/schedules';
import { churchFixture } from '../fixtures/churches';
import { musicianFixture } from '../fixtures/musicians';
import prisma from '../../src/lib/prisma';

describe('Schedule API', () => {
  let app: any;
  let testChurch: any;
  let testMusician: any;

  beforeAll(async () => {
    app = await buildApp();
    testChurch = await prisma.church.create({ data: churchFixture });
    testMusician = await prisma.musician.create({ data: musicianFixture });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /schedules', () => {
    it('should create a schedule with musicians', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/schedules',
        payload: {
          ...scheduleFixture,
          churchId: testChurch.id,
          musicianIds: [testMusician.id]
        }
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        church: { id: testChurch.id },
        musicians: [{ id: testMusician.id }]
      });
    });

    it('should reject schedule in the past', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/schedules',
        payload: {
          date: new Date('2000-01-01').toISOString(),
          churchId: testChurch.id
        }
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /schedules/upcoming', () => {
    it('should return upcoming schedules', async () => {
      await prisma.schedule.create({
        data: {
          date: new Date(Date.now() + 86400000), // Amanhã
          churchId: testChurch.id
        }
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/schedules/upcoming?days=7'
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().length).toBeGreaterThan(0);
    });
  });

  describe('PUT /schedules/:id', () => {
    it('should update musicians in schedule', async () => {
      const schedule = await prisma.schedule.create({
        data: {
          date: new Date(Date.now() + 86400000),
          churchId: testChurch.id
        }
      });

      const newMusician = await prisma.musician.create({
        data: { ...musicianFixture, email: 'new@test.com' }
      });

      const response = await app.inject({
        method: 'PUT',
        url: `/api/schedules/${schedule.id}`,
        payload: {
          musicianIds: [newMusician.id]
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().musicians[0].id).toBe(newMusician.id);
    });
  });
});