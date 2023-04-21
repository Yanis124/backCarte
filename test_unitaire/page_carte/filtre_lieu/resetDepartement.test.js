const resetDepartement = require('./resetDepatement');

describe('resetDepartement', () => {
  test('resets the departement filter', () => {
    document.body.innerHTML = `
      <div id="departement-choice">Ile-De-France</div>
      <div class="departement-text" style="position: absolute"></div>
    `;
    resetDepartement();
    
    // Check that the city filter is reset to an empty string
    expect(document.querySelector('#departement-choice').innerHTML).toBe('');
    
    // Check that the "position" style property of the villeText element is set to "relative"
    expect(document.querySelector('.departement-text').style.position).toBe('relative');
  });
});

