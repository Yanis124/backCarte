/* const regroupeAge = require('./regroupeAge');

describe('regroupeAge', () => {
  it('should group age ranges correctly', () => {
    const ageList = [      {name: 2005, count: 10},      {name: 1995, count: 5},      {name: 1980, count: 2},      {name: 1950, count: 3},    ];
    const expectedDatas = [10, 5, 2, 3];
    const expectedLabels = ['0-17', '18-30', '31-59', '+60'];

    regroupeAge(ageList);

    expect(datas).toEqual(expectedDatas);
    expect(label).toEqual(expectedLabels);
  });
});
 */
const regroupeAge = require('./regroupeAge');

describe('regroupeAge', () => {
  it('should group age ranges correctly', () => {
    const ageList = [      {name: 2005, count: 10},      {name: 1995, count: 5},      {name: 1980, count: 2},      {name: 1950, count: 3},    ];
    const expectedDatas = [10, 5, 2, 3];
    const expectedLabels = ['0-17', '18-30', '31-59', '+60'];
    datas = []; // définir la variable globale datas ici
    label = []; // définir la variable globale label ici

    regroupeAge(ageList);

    expect(datas).toEqual(expectedDatas);
    expect(label).toEqual(expectedLabels);
  });
});
