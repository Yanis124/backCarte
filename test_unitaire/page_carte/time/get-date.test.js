//time



const setTime=require("./get-value-filtres")

const dateLimit=require("./get-option-filtres")

var filtreData=require("./filtres-data")



const mockInnerFunction = jest.fn()










// Replace the original inner function with the mock











describe("getDate()",()=>{
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
        var textDate=document.querySelectorAll('#date-specifique-container span')
        var selectedDate
        date.value="2018-01-01"
        var selectedDateStart="2018-01-01"
        var selectedDateEnd="2020-01-01"

        

    

    
    test("set the value of selectedDateStart",()=>{

        expect(setTime.getDate(setTime.closeList,setTime.setDateLimit,selectedDate,date,selectedDateStart,selectedDateEnd)).toBe("2018-01-01")
    })

    test("change the style of textDate",()=>{

        

        setTime.getDate(setTime.closeList,setTime.setDateLimit,selectedDate,date,selectedDateStart,selectedDateEnd)
        
        expect(textDate[0].style.color).toBe("gray")
    })

  


})

