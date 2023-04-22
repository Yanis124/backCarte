
const setTime=require("./get-value-filtres")

describe("getIntervalleDateStart()",()=>{
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

        var dateStart=document.getElementById("date-debut")
        var textDate=document.querySelectorAll('#date-interval-container span')
        var selectedDateStart=0
        dateStart.value="2018-01-01"
        

    

    
    test("set the value of selectedDateStart",()=>{

        expect(setTime.getIntervalleDateStart(setTime.closeList,setTime.setDateLimit,selectedDateStart)).toBe("2018-01-01")
    })

    test("change the style of textDate",()=>{

        setTime.getIntervalleDateStart(setTime.closeList,setTime.setDateLimit,selectedDateStart,textDate,dateStart)
        
        expect(textDate[0].style.color).toBe("gray")
    })


})
