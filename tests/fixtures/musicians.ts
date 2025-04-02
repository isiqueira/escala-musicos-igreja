export const musicianFixture = {
    name: 'Test Musician',
    email: 'musician@test.com',
    instruments: ['Violão', 'Voz']
  };
  
  export const invalidMusicianFixture = {
    name: 'A', // Nome muito curto
    email: 'invalid-email',
    instruments: [] // Lista vazia
  };
  
  export const conflictingMusicianFixture = {
    name: 'Conflict',
    email: 'musician@test.com', // Email duplicado
    instruments: ['Piano']
  };