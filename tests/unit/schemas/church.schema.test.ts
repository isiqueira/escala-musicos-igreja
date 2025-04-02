import { createChurchSchema } from "../../../src/schemas/church.schema";


describe('Church Schema', () => {
  it('should validate correct data', () => {
    const validData = {
      name: 'Valid Church',
      address: '123 Main St'
    };

    expect(() => createChurchSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid data', () => {
    const invalidData = {
      name: '', // Nome vazio
      address: 123 // Tipo errado
    };

    expect(() => createChurchSchema.parse(invalidData)).toThrow();
  });
});