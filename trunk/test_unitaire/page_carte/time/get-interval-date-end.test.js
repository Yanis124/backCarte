const setTime=require("./get-value-filtres")

describe("getIntervalleDateEnd()",()=>{
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

        var dateEnd=document.getElementById("date-fin")
        var textDate=document.querySelectorAll('#date-interval-container span')
        var selectedDateEnd=0
        dateEnd.value="2018-01-01"
        var selectedDateEnd
        

    

    
    test("set the value of selectedDateEnd",()=>{

        expect(setTime.getIntervalleDateEnd(setTime.closeList,setTime.setDateLimit,selectedDateEnd)).toBe("2018-01-01")
    })

    test("change the style of textDate",()=>{

        setTime.getIntervalleDateEnd(setTime.closeList,setTime.setDateLimit,selectedDateEnd)
        
        expect(textDate[1].style.color).toBe("gray")
    })


})