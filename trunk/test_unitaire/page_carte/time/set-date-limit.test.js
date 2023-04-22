const setTime=require("./get-value-filtres")

describe("setDateLimit()",()=>{
    document.body.innerHTML = `<div class="date-container" id="date-interval-container" style="display: none;">
    <div class="interval-container">
        <input onkeydown="return false" onclick="closeList()" onchange="getIntervalleDateStart(); getIntervalleDate()" type="date" id="date-debut" name="date-debut">
        <span>Debut</span>
    </div>
    <div class="interval-container">
        <input onkeydown="return false" onclick="closeList()" onchange="getIntervalleDateEnd(); getIntervalleDate()" type="date" id="date-fin" name="date-fin">
        <span>Fin</span>
    </div>
    </div>`
    var selectedDataEnd='2018-01-01'
    let selectedDateStart='2020-01-01'
    let dateStart=document.getElementById("date-debut")
    let dateEnd=document.getElementById("date-fin")
    setTime.setDateLimit(selectedDateStart,selectedDataEnd)

    test("set a min value to dateEnd",()=>{
       
        

        expect(dateEnd.min).toBe(selectedDateStart)
    })

    test("set a max value to dateStart",()=>{
        expect(dateStart.max).toBe(selectedDataEnd)
    })
})