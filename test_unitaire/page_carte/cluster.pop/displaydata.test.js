const displaydata = require('./displayData');

describe('displaydata', () => {
  it('should return the same input if not a string', () => {
    expect(displaydata(123)).toBe(123);
    expect(displaydata(true)).toBe(true);
    expect(displaydata(null)).toBe(null);
    expect(displaydata(undefined)).toBe(undefined);
    expect(displaydata([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return the input string if less than or equal to 3 elements', () => {
    expect(displaydata('')).toBe('');
    expect(displaydata('1')).toBe('1');
    expect(displaydata('1,2')).toBe('1,2');
    expect(displaydata('1,2,3')).toBe('1,2,3');
  });

  it('should return a formatted string if more than 3 elements', () => {
    expect(displaydata('1,2,3,4')).toBe('1,2,3, 4,');
    expect(displaydata('1,2,3,4,5,6')).toBe('1,2,3, 4,5,6,');
    expect(displaydata('1,2,3,4,5,6,7,8,9')).toBe('1,2,3, 4,5,6,7,8,9,');
  });
});
