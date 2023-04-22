const regroupeLum = require('./regroupeLum');

test('regroupeLum should group lumList by day and night', () => {
  const lumList = [
    { name: "Plein jour", count: 3 },    
    { name: "Plein jour", count: 4 },    
    { name: "Nuit", count: 2 },    
    { name: "Nuit", count: 5 },  
    ];

  regroupeLum(lumList);

  expect(datas).toEqual([7, 7]);
  expect(label).toEqual(["Jour", "Nuit"]);
});
