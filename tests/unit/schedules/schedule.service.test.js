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
const schedule_service_1 = require("../../../src/modules/schedules/schedule.service");
const prisma_mock_1 = require("../../setup/prisma-mock");
const mock_data_1 = require("../../setup/mock-data");
describe('ScheduleService', () => {
    let service;
    beforeEach(() => {
        service = new schedule_service_1.ScheduleService();
        jest.clearAllMocks();
    });
    describe('createSchedule', () => {
        it('deve criar uma escala com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const input = { event_id: 1, musician_id: 1 };
            const mockSchedule = Object.assign(Object.assign({ id: 1 }, input), { substitute_id: null, created_at: new Date(), is_recurring: false });
            // Configurar mocks
            prisma_mock_1.prismaMock.schedule.create.mockResolvedValue(mockSchedule);
            prisma_mock_1.prismaMock.scheduleAudit.create.mockResolvedValue({});
            prisma_mock_1.prismaMock.event.findUnique.mockResolvedValue(mock_data_1.mockEvents[0]);
            prisma_mock_1.prismaMock.musician.findUnique.mockResolvedValue(mock_data_1.mockMusicians[0]);
            // Executar
            const result = yield service.createSchedule(input, 'admin@igreja.com');
            // Verificar
            expect(prisma_mock_1.prismaMock.schedule.create).toHaveBeenCalledWith({
                data: input
            });
            expect(result).toMatchObject({
                id: 1,
                event_id: 1,
                musician_id: 1
            });
        }));
    });
});
