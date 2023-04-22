
const dateLimit=require("./get-option-filtres")

describe("dateLimit()",()=>{
    document.body.innerHTML =`<div class="date-container" id="date-specifique-container" style="display: none;">
    <input onkeydown="return false" onclick="closeList()"  onchange="getDate()" id="date" type="date" id="date-specifique" name="date-specifique",min="2012-01-01",max="2020-01-01">
    <span>Date</span>
        </div>
        <!-- Si sélectionne du filtre Intervalle de Date alors affichage d'un élément choix de date Début et d'un élément choix de date de Fin-->
        <div class="date-container" id="date-interval-container" style="display: none;">
            <div class="interval-container">
                <input onkeydown="return false" onclick="closeList()" onchange="getIntervalleDateStart(); getIntervalleDate()" type="date" id="date-debut" name="date-debut",min="2012-01-01",max="2020-01-01">
                <span>Debut</span>
            </div>
            <div class="interval-container">
                <input onkeydown="return false" onclick="closeList()" onchange="getIntervalleDateEnd(); getIntervalleDate()" type="date" id="date-fin" name="date-fin",min="2012-01-01",max="2020-01-01">
                <span>Fin</span>
            </div>
        </div>`

        var date=document.getElementById("date")
        var dateStart=document.getElementById("date-debut")
        var dateEnd=document.getElementById("date-fin")



        dateLimit()
    test("initialise min and max attribut of date dateStart dateEnd",()=>{

        expect(date.min).toBe("2012-01-01")
        expect(date.max).toBe("2020-01-01")
        expect(dateStart.min).toBe("2012-01-01")
        expect(dateStart.max).toBe("2020-01-01")
        expect(dateEnd.min).toBe("2012-01-01")
        expect(dateEnd.max).toBe("2020-01-01")

    })
})
