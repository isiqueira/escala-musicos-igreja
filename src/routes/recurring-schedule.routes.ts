// src/routes/recurring-schedule.routes.ts
import { FastifyInstance } from 'fastify';
import { recurringScheduleService } from '../services/recurring-schedule.service';
import {
  createRecurringScheduleSchema,
  updateRecurringScheduleSchema,
  recurringScheduleResponseSchema,
//   recurringScheduleParamsSchema
} from '../schemas/recurring-schedule.schema';
import { scheduleResponseSchema } from '../schemas/schedule.schema';
import { z } from 'zod';

export async function recurringScheduleRoutes(fastify: FastifyInstance) {
    // Create
    fastify.post('/', {
        schema: {
            body: createRecurringScheduleSchema,
            response: { 201: recurringScheduleResponseSchema }
        }
    }, async (request, reply) => {
        const recurringSchedule = await recurringScheduleService.createRecurringSchedule(request.body);
        return reply.code(201).send(recurringSchedule);
    });

    // Get All
    fastify.get('/', {
        schema: {
            response: { 200: z.array(recurringScheduleResponseSchema) }
        }
    }, async () => {
        return recurringScheduleService.getAllRecurringSchedules();
    });

    // Get By Id
    fastify.get('/:id', {
        schema: {
            params: recurringScheduleParamsSchema,
            response: { 200: recurringScheduleResponseSchema }
        }
    }, async (request, reply) => {
        const recurringSchedule = await recurringScheduleService.getRecurringScheduleById(request.params.id);
        if (!recurringSchedule) {
            return reply.code(404).send({ message: 'Recurring Schedule not found' });
        }
        return recurringSchedule;
    });

    // Update
    fastify.put('/:id', {
        schema: {
            params: recurringScheduleParamsSchema,
            body: updateRecurringScheduleSchema,
            response: { 200: recurringScheduleResponseSchema }
        }
    }, async (request) => {
        return recurringScheduleService.updateRecurringSchedule(request.params.id, request.body);
    });

    // Delete
    fastify.delete('/:id', {
        schema: {
            params: recurringScheduleParamsSchema,
            response: { 204: null }
        }
    }, async (request, reply) => {
        await recurringScheduleService.deleteRecurringSchedule(request.params.id);
        return reply.code(204).send();
    });
}