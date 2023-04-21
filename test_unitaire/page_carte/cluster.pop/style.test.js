const style = require('./style');

describe('style', () => {
  it('should not throw an error when note is an empty array', () => {
    const emptyArray = [];
    expect(() => {
      style(emptyArray);
    }).not.toThrow();
  });

  it('should not throw an error when note is undefined', () => {
    expect(() => {
      style(undefined);
    }).not.toThrow();
  });

  it('should apply the correct styles when note is an array with one element', () => {
    const note = [document.createElement('div')];
    style(note);
    expect(note[0].style.background).toBe('green');
    expect(note[0].style.border).toBe('2px solid white');
    expect(note[0].style.borderRadius).toBe('50%');
    expect(note[0].style.width).toBe('30px');
    expect(note[0].style.height).toBe('30px');
    expect(note[0].style.textAlign).toBe('center');
    expect(note[0].style.fontSize).toBe('15px');
    expect(note[0].style.fontWeight).toBe('bold');
  });
});
