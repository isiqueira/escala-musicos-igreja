"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = scheduleRoutes;
const schedule_service_1 = require("../services/schedule.service");
const schedule_schema_1 = require("../schemas/schedule.schema");
function scheduleRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        // CRUD Básico
        fastify.post('/', {
            schema: {
                body: schedule_schema_1.createScheduleSchema,
                response: { 201: schedule_schema_1.scheduleResponseSchema }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const schedule = yield schedule_service_1.scheduleService.createSchedule(request.body);
            return reply.code(201).send(schedule);
        }));
        // Rotas Adicionais Específicas
        fastify.get('/church/:churchId', {
            schema: {
                params: z.object({ churchId: z.string().uuid() }),
                response: { 200: z.array(schedule_schema_1.scheduleResponseSchema) }
            }
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            return schedule_service_1.scheduleService.getSchedulesByChurch(request.params.churchId);
        }));
        fastify.get('/upcoming', {
            schema: {
                querystring: z.object({
                    days: z.number().int().positive().default(30)
                }),
                response: { 200: z.array(schedule_schema_1.scheduleResponseSchema) }
            }
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            return schedule_service_1.scheduleService.getUpcomingSchedules(request.query.days);
        }));
    });
}
