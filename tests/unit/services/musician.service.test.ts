import prisma from '../../../src/lib/prisma';
import { musicianService } from '../../../src/services/musician.service';
import { musicianFixture } from '../../fixtures/musicians';


describe('MusicianService', () => {
  afterEach(async () => {
    await prisma.musician.deleteMany();
  });

  describe('createMusician', () => {
    it('should create a musician with instruments', async () => {
      const musician = await musicianService.createMusician(musicianFixture);
      
      expect(musician).toMatchObject({
        name: musicianFixture.name,
        email: musicianFixture.email
      });
      expect(musician.instruments).toEqual(
        expect.arrayContaining(musicianFixture.instruments)
      );
    });

    it('should reject duplicate email', async () => {
      await musicianService.createMusician(musicianFixture);
      await expect(musicianService.createMusician(musicianFixture))
        .rejects
        .toThrow('Unique constraint failed');
    });
  });

  describe('getAvailableMusicians', () => {
    it('should filter by instrument', async () => {
      // Setup
      await prisma.musician.create({
        data: { 
          ...musicianFixture,
          email: 'another@email.com' 
        }
      });

      // Test
      const available = await musicianService.getAvailableMusicians(
        new Date(Date.now() + 86400000), // Amanhã
        'Violão'
      );

      expect(available.length).toBe(1);
      expect(available[0].instruments).toContain('Violão');
    });
  });
  describe('Availability Conflicts', () => {
    it('should exclude musicians with scheduled events', async () => {
      // Cria músico com escala
      const busyMusician = await prisma.musician.create({
        data: {
          ...musicianFixture,
          email: 'busy@test.com',
          schedules: {
            create: {
              date: new Date(Date.now() + 86400000), // Amanhã
              church: { create: { name: 'Test Church' } }
            }
          }
        },
        include: { schedules: true }
      });
  
      const available = await musicianService.getAvailableMusicians(
        new Date(Date.now() + 86400000), // Amanhã
        'Violão'
      );
  
      expect(available).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: busyMusician.id })
        ])
      );
    });
  });  
});
