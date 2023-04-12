var carte=document.getElementById("map")
var spinner=document.getElementById("spinner-carte")

function loadCarte(){
    spinner.style.display="block"
    carte.style.opacity="0.3"
    

}

function workCarte(){
    carte.style.opacity="1"
    spinner.style.display="none"


}