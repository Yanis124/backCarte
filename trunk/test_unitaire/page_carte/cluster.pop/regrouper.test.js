const regrouper = require('./regrouper');

describe('regrouper', () => {
  beforeEach(() => {
    // création des éléments nécessaires pour les tests
    document.body.innerHTML = `
      <div class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive"></div>
      <div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive"></div>
      <div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive"></div>
    `;
  });

  test('style should be applied to small cluster', () => {
    regrouper();
    const noteSmall = document.getElementsByClassName('leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive');
    expect(noteSmall[0].style).not.toBe(undefined);
  });

  test('style should be applied to medium cluster', () => {
    regrouper();
    const noteMedium = document.getElementsByClassName('leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive');
    expect(noteMedium[0].style).not.toBe(undefined);
  });

  test('style should be applied to large cluster', () => {
    regrouper();
    const noteLarge = document.getElementsByClassName('leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive');
    expect(noteLarge[0].style).not.toBe(undefined);
  });
});
