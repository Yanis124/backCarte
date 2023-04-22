const setTime=require("./get-value-filtres")

const mockInnerFunction = jest.fn()

var filtreData=require("./filtres-data")

describe("getIntervalleDate()",()=>{
    let selectedDate="2017-01-14"
    let selectedDataStart
    let selectedDataEnd
    filtreData=mockInnerFunction
    

    test("set selectedData to null",()=>{
        
        selectedDate=setTime.getIntervalleDate(filtreData,selectedDate,selectedDataStart,selectedDataEnd)    
        expect(selectedDate).toBe(null)
    })
    

    test("set selectedDate to null if both are null",()=>{
        selectedDataEnd=null,
        selectedDataStart=null
           
        
        expect(filtreData).toHaveBeenCalledTimes(0);   //make sur that filtreData is not called inside getIntervalleDate()
        
    })
    test("set selectedDate to null if selectedDateEnd is null",()=>{
        selectedDataEnd=null,
        selectedDataStart='2017-01-14'
        selectedDate=setTime.getIntervalleDate(filtreData, selectedDate,selectedDataStart,selectedDataEnd)    
        
        expect(filtreData).toHaveBeenCalledTimes(0);   //make sur that filtreData is not called inside getIntervalleDate()
    })
    test("set selectedDate to null  if selectedDateStart is null",()=>{
        selectedDataEnd='2017-01-14',
        selectedDataStart=null
        selectedDate=setTime.getIntervalleDate(filtreData, selectedDate,selectedDataStart,selectedDataEnd)    
        
        expect(filtreData).toHaveBeenCalledTimes(0);   //make sur that filtreData is not called inside getIntervalleDate()
    })
    test("call getDateFiltre if selectedDateStart and selectedDateEnd are defined",()=>{
        


        selectedDataStart="2015-01-01"
        selectedDataEnd="2020-01-01"
        setTime.getIntervalleDate(filtreData,selectedDate,selectedDataStart,selectedDataEnd)
        expect(filtreData).toHaveBeenCalledTimes(1);   //make sur that filtreData is called inside getIntervalleDate()

    })
})