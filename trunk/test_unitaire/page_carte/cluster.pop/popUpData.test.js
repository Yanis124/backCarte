const popUpData = require('./popUpData')

describe('popUpData', () => {
  it('should return "Indisponible" when data is undefined', () => {
    const data = undefined;
    const result = popUpData(data);
    expect(result).toBe('Indisponible');
  });

  it('should return the data when it is defined', () => {
    const data = 'Normale';
    const result = popUpData(data);
    expect(result).toBe(data);
  });
});