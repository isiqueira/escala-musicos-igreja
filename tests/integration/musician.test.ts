import { buildApp } from '../../src/app';
import prisma from '../../src/lib/prisma';
import { invalidMusicianFixture, musicianFixture } from '../fixtures/musicians';


describe('Musician API', () => {
  let app: any;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /musicians', () => {
    it('should create a musician with instruments', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/musicians',
        payload: musicianFixture
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        name: musicianFixture.name,
        instruments: expect.arrayContaining(musicianFixture.instruments)
      });
    });

    it('should reject invalid email', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/musicians',
        payload: { ...invalidMusicianFixture, email: 'not-an-email' }
      });

      expect(response.statusCode).toBe(400);
      expect(response.json()).toHaveProperty('message', 'body/email: E-mail inválido');
    });
  });

  describe('GET /musicians/available', () => {
    it('should filter available musicians by instrument', async () => {
      // Cria músicos de teste
      await prisma.musician.createMany({
        data: [
          { ...musicianFixture, email: 'musician1@test.com' },
          { 
            name: 'Guitarist', 
            email: 'guitarist@test.com',
            instruments: ['Guitar'] 
          }
        ]
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/musicians/available?instrument=Violão'
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            instruments: expect.arrayContaining(['Violão'])
          })
        ])
      );
    });
  });
});
