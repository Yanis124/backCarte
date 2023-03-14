function afficherChoix() {
    var choix = document.getElementById("choix-date");
    var choixDate = document.getElementById("choix-date-specifique");
    var choixInterval = document.getElementById("choix-intervalle-dates");
    if (choix.value == "date-specifique") {
        choixDate.style.display = "block";
        choixInterval.style.display = "none";
    } else if (choix.value == "intervalle-dates") {
        choixDate.style.display = "none";
        choixInterval.style.display = "block";
    } else {
        choixDate.style.display = "none";
        choixInterval.style.display = "none";
    }
}

function Lieu1(){
    let choixRegion=document.getElementById("region");
    let choixDepartement=document.getElementById("departement1");
    if(choixRegion.value!="vide"){
        choixDepartement.style.display="block";
    }
}

function Lieu2(){
    let choixDepartement=document.getElementById("departement1");
    let choixVille=document.getElementById("ville1");
    if(choixDepartement.value!="vide"){
        choixVille.style.display="block";
    }
}
