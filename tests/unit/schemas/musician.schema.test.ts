import { createMusicianSchema } from '../../../src/schemas/musician.schema';

describe('Musician Schema Validation', () => {
  const validMusician = {
    name: 'John Doe',
    email: 'john@example.com',
    instruments: ['Violão', 'Voz']
  };

  it('should validate correct data', () => {
    expect(() => createMusicianSchema.parse(validMusician)).not.toThrow();
  });

  it('should reject empty name', () => {
    expect(() => createMusicianSchema.parse({
      ...validMusician,
      name: ''
    })).toThrow('Nome deve ter pelo menos 2 caracteres');
  });

  it('should reject invalid email', () => {
    expect(() => createMusicianSchema.parse({
      ...validMusician,
      email: 'not-an-email'
    })).toThrow('E-mail inválido');
  });

  it('should reject empty instruments', () => {
    expect(() => createMusicianSchema.parse({
      ...validMusician,
      instruments: []
    })).toThrow('Array deve conter no mínimo 1 elemento(s)');
  });
});