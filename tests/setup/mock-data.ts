import { Musician, Event, RecurringSchedule, Schedule, ScheduleAudit, WhatsAppMessage } from '@prisma/client';

export const mockMusicians: Musician[] = [
  {
    id: 1,
    name: 'Alexandre',
    email: 'alexandre@igreja.com',
    phone: '5511912345678',
    whatsapp_id: '5511912345678@c.us',
    is_active: true,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 2,
    name: 'Izael',
    email: 'izael@igreja.com',
    phone: '5511912345679',
    whatsapp_id: '5511912345679@c.us',
    is_active: true,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 3,
    name: 'Luzia',
    email: 'luzia@igreja.com',
    phone: '5511912345680',
    whatsapp_id: '5511912345680@c.us',
    is_active: true,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z')
  }
];

export const mockEvents: Event[] = [
  {
    id: 1,
    date: new Date('2024-05-02T19:00:00Z'), // 1ª Quinta
    day_of_week: 'Thursday',
    time: '19:00',
    location: 'Capela Principal',
    type: 'Mass',
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 2,
    date: new Date('2024-05-04T17:00:00Z'), // 1º Sábado
    day_of_week: 'Saturday',
    time: '17:00',
    location: 'Capela Principal',
    type: 'Mass',
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z')
  }
];

export const mockRecurringSchedules: RecurringSchedule[] = [
  {
    id: 1,
    musician_id: 1, // Alexandre
    week_of_month: 1,
    day_of_week: 'Thursday',
    created_at: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 2,
    musician_id: 2, // Izael
    week_of_month: 1,
    day_of_week: 'Saturday',
    created_at: new Date('2024-01-01T10:00:00Z')
  }
];

export const mockSchedules: Schedule[] = [
  {
    id: 1,
    event_id: 1,
    musician_id: 1, // Alexandre
    substitute_id: null,
    is_recurring: true,
    created_at: new Date('2024-04-25T10:00:00Z')
  },
  {
    id: 2,
    event_id: 2,
    musician_id: 2, // Izael
    substitute_id: null,
    is_recurring: true,
    created_at: new Date('2024-04-25T10:00:00Z')
  }
];

export const mockScheduleAudits: ScheduleAudit[] = [
  {
    id: 1,
    action: 'CREATE',
    old_data: null,
    new_data: null,
    changed_by: 'admin@igreja.com',
    schedule_id: 1,
    created_at: new Date('2024-04-25T10:00:00Z')
  }
];

export const mockWhatsAppMessages: WhatsAppMessage[] = [
  {
    id: 1,
    musician_id: 1,
    message: 'Sua escala: Quinta (02/05) às 19:00',
    status: 'SENT',
    api_response: { message_id: 'ABC123' },
    created_at: new Date('2024-04-28T09:00:00Z')
  }
];

// Utilitário para resetar dados mockados
export const resetMockDatabase = async (prisma: any) => {
  await prisma.$transaction([
    prisma.scheduleAudit.deleteMany(),
    prisma.whatsAppMessage.deleteMany(),
    prisma.schedule.deleteMany(),
    prisma.recurringSchedule.deleteMany(),
    prisma.event.deleteMany(),
    prisma.musician.deleteMany(),
    
    prisma.musician.createMany({ data: mockMusicians }),
    prisma.event.createMany({ data: mockEvents }),
    prisma.recurringSchedule.createMany({ data: mockRecurringSchedules }),
    prisma.schedule.createMany({ data: mockSchedules }),
    prisma.scheduleAudit.createMany({ data: mockScheduleAudits }),
    prisma.whatsAppMessage.createMany({ data: mockWhatsAppMessages })
  ]);
};
