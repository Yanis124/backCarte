const L = require('leaflet');
const popUp = require('./popUp');

describe('popUp', () => {
    it('returns a popup with correct data', () => {
        const list = [ { 
            fields: { 
                num_acc: '1234', 
                jour: '01',
                mois: '02', 
                an: '2015', 
                hrmn: '12:30', 
                adr: 'Rue A', 
                atm: 'Pluie', 
                lum: 'Plein Jour', 
                grav: 'Indemne' } 
            }];
   
        const i = 0;
        const expectedContent = "<h1 style='font-size:17px;'>"+"numero d'accident: "+"1234"+"</h1>"
        +"<p style='font-size:15px;color:#1b6698'>"+"<span style='font-size:15px;font-weight:700;'>01/02/2015, 12:30</span>"+"</p>"
        +"<ul style='display:flex;flex-direction:column; padding:0;align-items:start;'>"
        +"<li style='font-size:15px;color:#1b6698;'>"+"Adresse: "+"<span style='font-size:15px;font-weight:700;'>Rue A</span>"+"</li>"
        +"<li style='font-size:15px;color:#1b6698;'>"+"Condition atmosphérique: "+"<span style='font-size:+15px;font-weight:700;'>Pluie</span>"+"</li>"
        +"<li style='font-size:15px;color:#1b6698;'>"+"Lumiere: "+"<span style='font-size:15px;font-weight:700;'>Plein Jour</span>"+"</li>"
        +"<li style='font-size:15px;color:#1b6698;'>"+"Gravité: "+"<span style='font-size:15px;font-weight:700;'>Indemne</span> </li>"
        +"</ul>";
    
        const popUpObject = popUp(list, i);
    
        expect(popUpObject._content).toEqual(expectedContent);
  });
  it('returns a popup with correct data and Indisponible for the missing data', () => {
    const list = [ { 
        fields: { 
            num_acc: '1234', 
            jour: '01',
            mois: '02', 
            an: '2015', 
            hrmn: '12:30', 
            adr: 'Rue A', 
            atm: 'Indisponible', 
            lum: 'Plein Jour', 
            grav: 'Indisponible' } 
        }];

    const i = 0;
    const expectedContent = "<h1 style='font-size:17px;'>"+"numero d'accident: "+"1234"+"</h1>"
    +"<p style='font-size:15px;color:#1b6698'>"+"<span style='font-size:15px;font-weight:700;'>01/02/2015, 12:30</span>"+"</p>"
    +"<ul style='display:flex;flex-direction:column; padding:0;align-items:start;'>"
    +"<li style='font-size:15px;color:#1b6698;'>"+"Adresse: "+"<span style='font-size:15px;font-weight:700;'>Rue A</span>"+"</li>"
    +"<li style='font-size:15px;color:#1b6698;'>"+"Condition atmosphérique: "+"<span style='font-size:+15px;font-weight:700;'>Indisponible</span>"+"</li>"
    +"<li style='font-size:15px;color:#1b6698;'>"+"Lumiere: "+"<span style='font-size:15px;font-weight:700;'>Plein Jour</span>"+"</li>"
    +"<li style='font-size:15px;color:#1b6698;'>"+"Gravité: "+"<span style='font-size:15px;font-weight:700;'>Indisponible</span> </li>"
    +"</ul>";

    const popUpObject = popUp(list, i);

    expect(popUpObject._content).toEqual(expectedContent);
    });

  it('return null when i is not present in the list', () => {
    const list = [ { 
        fields: { 
            num_acc: '1234', 
            jour: '01',
            mois: '02', 
            an: '2015', 
            hrmn: '12:30', 
            adr: 'Rue A', 
            atm: 'Pluie', 
            lum: 'Plein Jour', 
            grav: 'Normale' } 
        }];
        const i = 2;
        const result = popUp(list, i);
        expect(result).toBeNull();
    });
  it('return undefined when list is empty', () => {
    const list = [];
    const i = 0;
    const result = popUp(list, i);
    expect(result).toBeNull();
  });
})