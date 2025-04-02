import { buildApp } from '../../src/app';
import prisma from '../../src/lib/prisma';
import { churchFixture } from '../fixtures/churches';

describe('Church API', () => {
  let app: any;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should create a church', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/churches',
      payload: churchFixture
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      name: churchFixture.name,
      address: churchFixture.address
    });
  });

  it('should list churches', async () => {
    await prisma.church.create({ data: churchFixture });
    
    const response = await app.inject({
      method: 'GET',
      url: '/api/churches'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: churchFixture.name
        })
      ])
    );
  });
});
