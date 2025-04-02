export const scheduleFixture = {
  date: new Date(Date.now() + 86400000).toISOString(), // Amanhã
  description: 'Missa Dominical',
  musicianIds: ['550e8400-e29b-41d4-a716-446655440000']
};

export const invalidScheduleFixture = {
  date: new Date('2000-01-01').toISOString(), // Passado
  churchId: 'invalid-uuid',
  musicianIds: ['invalid']
};

export const conflictScheduleFixture = {
  date: new Date(Date.now() + 86400000).toISOString(),
  churchId: '550e8400-e29b-41d4-a716-446655440000',
  musicianIds: ['550e8400-e29b-41d4-a716-446655440001']
};
