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
exports.churchRoutes = churchRoutes;
const church_service_1 = require("../services/church.service");
const church_schema_1 = require("../schemas/church.schema");
function churchRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/', {
            schema: {
                body: church_schema_1.createChurchSchema,
                response: { 201: church_schema_1.churchResponseSchema }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const church = yield church_service_1.churchService.createChurch(request.body);
            return reply.code(201).send(church);
        }));
        fastify.get('/', {
            schema: {
                response: { 200: z.array(church_schema_1.churchResponseSchema) }
            }
        }, () => __awaiter(this, void 0, void 0, function* () {
            return church_service_1.churchService.getAllChurches();
        }));
        fastify.get('/:id', {
            schema: {
                params: church_schema_1.churchParamsSchema,
                response: { 200: church_schema_1.churchResponseSchema }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const church = yield church_service_1.churchService.getChurchById(request.params.id);
            if (!church) {
                return reply.code(404).send({ message: 'Igreja não encontrada' });
            }
            return church;
        }));
        fastify.put('/:id', {
            schema: {
                params: church_schema_1.churchParamsSchema,
                body: church_schema_1.updateChurchSchema,
                response: { 200: church_schema_1.churchResponseSchema }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const updatedChurch = yield church_service_1.churchService.updateChurch(request.params.id, request.body);
            return updatedChurch;
        }));
        fastify.delete('/:id', {
            schema: {
                params: church_schema_1.churchParamsSchema,
                response: { 204: { type: 'null' } }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            yield church_service_1.churchService.deleteChurch(request.params.id);
            return reply.code(204).send();
        }));
    });
}
