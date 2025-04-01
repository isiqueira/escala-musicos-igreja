// src/routes/schedule.routes.ts
import { FastifyInstance } from 'fastify';
import { scheduleService } from '../services/schedule.service';
import {
  createScheduleSchema,
  scheduleParamsSchema,
  scheduleResponseSchema
} from '../schemas/schedule.schema';

export async function scheduleRoutes(fastify: FastifyInstance) {
  // CRUD Básico
  fastify.post('/', {
    schema: {
      body: createScheduleSchema,
      response: { 201: scheduleResponseSchema }
    }
  }, async (request, reply) => {
    const schedule = await scheduleService.createSchedule(request.body);
    return reply.code(201).send(schedule);
  });

  // Rotas Adicionais Específicas
  fastify.get('/church/:churchId', {
    schema: {
      params: z.object({ churchId: z.string().uuid() }),
      response: { 200: z.array(scheduleResponseSchema) }
    }
  }, async (request) => {
    return scheduleService.getSchedulesByChurch(request.params.churchId);
  });

  fastify.get('/upcoming', {
    schema: {
      querystring: z.object({
        days: z.number().int().positive().default(30)
      }),
      response: { 200: z.array(scheduleResponseSchema) }
    }
  }, async (request) => {
    return scheduleService.getUpcomingSchedules(request.query.days);
  });
}