var carte=document.getElementById("map")
var spinner=document.getElementById("spinner-carte")


//Lance l'animation de chargement
async function loadCarte(){
    spinner.style.display="block"
    carte.style.opacity="0.3"   
    await new Promise(r => setTimeout(r, 100));
}

//Arrête l'animation de chargement
function workCarte(){
    carte.style.opacity="1"
    spinner.style.display="none"
}
