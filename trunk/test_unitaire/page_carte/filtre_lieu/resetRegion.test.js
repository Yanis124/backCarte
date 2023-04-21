const resetRegion = require('./resetRegion');

describe('resetRegion', () => {
  test('resets the region filter', () => {
    document.body.innerHTML = `
      <div id="region-choice">Ile-De-France</div>
      <div class="region-text" style="position: absolute"></div>
    `;
    resetRegion();
    
    // Check that the region filter is reset to an empty string
    expect(document.querySelector('#region-choice').innerHTML).toBe('');
    
    // Check that the "position" style property of the regionText element is set to "relative"
    expect(document.querySelector('.region-text').style.position).toBe('relative');
  });
});

