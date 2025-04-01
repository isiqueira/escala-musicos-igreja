// src/routes/church.routes.ts
import { FastifyInstance } from 'fastify';
import { churchService } from '../services/church.service';
import {
  createChurchSchema,
  updateChurchSchema,
  churchParamsSchema,
  churchResponseSchema
} from '../schemas/church.schema';

export async function churchRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createChurchSchema,
      response: { 201: churchResponseSchema }
    }
  }, async (request, reply) => {
    const church = await churchService.createChurch(request.body);
    return reply.code(201).send(church);
  });

  fastify.get('/', {
    schema: {
      response: { 200: z.array(churchResponseSchema) }
    }
  }, async () => {
    return churchService.getAllChurches();
  });

  fastify.get('/:id', {
    schema: {
      params: churchParamsSchema,
      response: { 200: churchResponseSchema }
    }
  }, async (request, reply) => {
    const church = await churchService.getChurchById(request.params.id);
    if (!church) {
      return reply.code(404).send({ message: 'Igreja não encontrada' });
    }
    return church;
  });

  fastify.put('/:id', {
    schema: {
      params: churchParamsSchema,
      body: updateChurchSchema,
      response: { 200: churchResponseSchema }
    }
  }, async (request, reply) => {
    const updatedChurch = await churchService.updateChurch(
      request.params.id,
      request.body
    );
    return updatedChurch;
  });

  fastify.delete('/:id', {
    schema: {
      params: churchParamsSchema,
      response: { 204: { type: 'null' } }
    }
  }, async (request, reply) => {
    await churchService.deleteChurch(request.params.id);
    return reply.code(204).send();
  });
}