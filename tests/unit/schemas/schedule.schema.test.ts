import { createScheduleSchema } from '../../../src/schemas/schedule.schema';

describe('Schedule Schema', () => {
  const validData = {
    date: new Date(Date.now() + 86400000).toISOString(),
    churchId: '550e8400-e29b-41d4-a716-446655440000',
    musicianIds: ['550e8400-e29b-41d4-a716-446655440001']
  };

  it('should validate correct data', () => {
    expect(() => createScheduleSchema.parse(validData)).not.toThrow();
  });

  it('should require churchId', () => {
    expect(() => createScheduleSchema.parse({
      ...validData,
      churchId: undefined
    })).toThrow('churchId: Obrigatório');
  });

  it('should reject past dates', () => {
    expect(() => createScheduleSchema.parse({
      ...validData,
      date: new Date('2000-01-01').toISOString()
    })).toThrow('Data deve ser no futuro');
  });

  it('should validate musician UUIDs', () => {
    expect(() => createScheduleSchema.parse({
      ...validData,
      musicianIds: ['invalid-uuid']
    })).toThrow('ID do músico inválido');
  });
});
