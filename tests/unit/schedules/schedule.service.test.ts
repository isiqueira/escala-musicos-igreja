import { ScheduleService } from '../../../src/modules/schedules/schedule.service';
import { prismaMock } from '../../setup/prisma-mock';
import { mockMusicians, mockEvents } from '../../setup/mock-data';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(() => {
    service = new ScheduleService();
    jest.clearAllMocks();
  });

  describe('createSchedule', () => {
    it('deve criar uma escala com sucesso', async () => {
      // Dados de teste
      const input = { event_id: 1, musician_id: 1 };
      const mockSchedule = { 
        id: 1, 
        ...input, 
        substitute_id: null,
        created_at: new Date(),
        is_recurring: false
      };

      // Configurar mocks
      prismaMock.schedule.create.mockResolvedValue(mockSchedule);
      prismaMock.scheduleAudit.create.mockResolvedValue({} as any);
      prismaMock.event.findUnique.mockResolvedValue(mockEvents[0]);
      prismaMock.musician.findUnique.mockResolvedValue(mockMusicians[0]);

      // Executar
      const result = await service.createSchedule(input, 'admin@igreja.com');

      // Verificar
      expect(prismaMock.schedule.create).toHaveBeenCalledWith({
        data: input
      });
      expect(result).toMatchObject({
        id: 1,
        event_id: 1,
        musician_id: 1
      });
    });
  });
});
