const resetVille = require('./resetVille');

describe('resetVille', () => {
  test('resets the city filter', () => {
    document.body.innerHTML = `
      <div id="ville-choice">Paris</div>
      <div class="ville-text" style="position: absolute"></div>
    `;
    resetVille();
    
    // Check that the city filter is reset to an empty string
    expect(document.querySelector('#ville-choice').innerHTML).toBe('');
    
    // Check that the "position" style property of the villeText element is set to "relative"
    expect(document.querySelector('.ville-text').style.position).toBe('relative');
  });
});

