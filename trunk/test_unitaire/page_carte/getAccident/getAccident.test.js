const getAccident = require('./getAccident')

describe('getAccident function', () => {
  it('should return an array of accident objects', async () => {
    const result = await getAccident()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('fields')
    expect(result[0].fields).toHaveProperty('num_acc')
    expect(result[0].fields).toHaveProperty('dep_name')
    expect(result[0].fields).toHaveProperty('reg_name')
    expect(result[0].fields).toHaveProperty('nom_com')
    expect(result[0].fields).toHaveProperty('jour')
    expect(result[0].fields).toHaveProperty('mois')
    expect(result[0].fields).toHaveProperty('an')
    expect(result[0].fields).toHaveProperty('hrmn')
    expect(result[0].fields).toHaveProperty('adr')
    expect(result[0].fields).toHaveProperty('atm')
    expect(result[0].fields).toHaveProperty('lum')
    expect(result[0].fields).toHaveProperty('grav')
    expect(result[0].fields).toHaveProperty('an_nais')
    expect(result[0].fields).toHaveProperty('datetime')
    expect(result[0].fields).toHaveProperty('coordonnees')
  })
})