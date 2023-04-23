//Block filters during the load of accidents

//Récupère les éléments "date" et "luminosité"
var switchTab=document.querySelectorAll("#switch-container")

//récupère tous les autres filtres
var selectBtn=document.querySelectorAll(".select-btn")

//Quand un accident est sélectionné, les filtres sont inaccessibles
function loadFiltre(){
        switchTab.forEach(element=>{
        element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"})

        selectBtn.forEach(element=>{
            element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"
        }) 
}


//Une fois les marqueurs chargés, l'utilisateur peut réutiliser les filtres
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
