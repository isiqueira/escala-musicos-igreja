// src/routes/recurring-schedule.routes.ts
import { FastifyInstance } from 'fastify';
import { recurringScheduleService } from '../services/recurring-schedule.service';

export async function recurringScheduleRoutes(fastify: FastifyInstance) {
  fastify.post('/generate', {
    schema: {
      body: z.object({
        startDate: z.string().datetime(),
        endDate: z.string().datetime()
      }),
      response: { 201: z.array(scheduleResponseSchema) }
    }
  }, async (request, reply) => {
    const schedules = await recurringScheduleService.generateSchedules(
      new Date(request.body.startDate),
      new Date(request.body.endDate)
    );
    return reply.code(201).send(schedules);
  });
}