// src/routes/musician.routes.ts
import { FastifyInstance } from 'fastify';
import { musicianService } from '../services/musician.service';
import {
  musicianParamsSchema,
  musicianResponseSchema
} from '../schemas/musician.schema';

export async function musicianRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createMusicianSchema,
      response: { 201: musicianResponseSchema }
    }
  }, async (request, reply) => {
    const musician = await musicianService.createMusician(request.body);
    return reply.code(201).send(musician);
  });

  fastify.get('/available', {
    schema: {
      querystring: z.object({
        date: z.string().datetime(),
        instrument: z.string().optional()
      }),
      response: { 200: z.array(musicianResponseSchema) }
    }
  }, async (request) => {
    return musicianService.getAvailableMusicians(
      new Date(request.query.date),
      request.query.instrument
    );
  });
}