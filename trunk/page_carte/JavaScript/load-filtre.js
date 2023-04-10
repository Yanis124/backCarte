var filter=document.getElementById("filtre-container") //bloquer les filtres lors du chargement des accidents
var switchTab=document.querySelectorAll("#switch-container")
var selectBtn=document.querySelectorAll(".select-btn")


function loadFiltre(){
        switchTab.forEach(element=>{
        element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.6"})

        selectBtn.forEach(element=>{
            element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.6"
        }) 
}

 function workFiltre(){
    switchTab.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"})

        selectBtn.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"
        })
    
 }
