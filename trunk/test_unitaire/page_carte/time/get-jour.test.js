const setTime=require("./get-value-filtres")

const getDataFiltre=require("./filtres-data")

describe("getJour()",()=>{
     
    document.body.innerHTML =`<div class="lum-container">

    <div class="jour-container" id="switch-container">
        <p>Jour</p>
        <label class="switch">
            <input type="checkbox" value="jour" onclick="getJour(this)" id="jour">
            <span class="slider round"></span>
        </label>
    </div>

    <div class="nuit-container" id="switch-container">
        <p>Nuit</p>
        <label class="switch">
            <input type="checkbox" value="nuit" onclick="getNuit(this)" id="nuit">
            <span class="slider round"></span>
        </label>

    </div>
      
    </div>`
    var textLum=document.querySelectorAll('.lum-container p')
    var inputJour=document.querySelector(".jour-container input")
    var inputNuit=document.getElementById("nuit")
    var selectedLum
    test("reset selectedLum if inputJour is not checked and change the style of textLum[0] ",()=>{
       


        
        expect(setTime.getJour(inputJour,selectedLum,getDataFiltre)).toBe(null)
        expect(textLum[0].style.color).toBe("rgb(51, 51, 51)")

    })

    test("change the style of textLum[0] and textLum[1] if inputJour is checked and inputNuit is not checked and set selectedLum to jour",()=>{
    inputJour.checked=true
    expect(setTime.getJour(inputJour,selectedLum,getDataFiltre)).toBe("jour")
    expect(textLum[0].style.color).toBe("rgb(0, 0, 0)")
    expect(textLum[1].style.color).toBe("rgb(51, 51, 51)")
    })

    test("change the style of textLum[0] and textLum[1] if inputJour  and inputNuit are checked and set selectedLum to jour",()=>{
    inputJour.checked=true
    inputNuit.checked=true
    expect(setTime.getJour(inputJour,selectedLum,getDataFiltre)).toBe("jour")
    expect(textLum[0].style.color).toBe("rgb(0, 0, 0)")
    expect(textLum[1].style.color).toBe("rgb(51, 51, 51)")
    expect(inputNuit.checked).toBe(false)


    
    })

})
        
