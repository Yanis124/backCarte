// rendre l'affichage de la page dynamique
const spinner=document.getElementById("spinner")
const graphContainer=document.getElementById("graph-container")
const canvas=document.getElementById("canvas")
const button=document.getElementById("button-graph")
const tableau=document.getElementById("table")
const graph=document.getElementById("graph-filtres-container")
const erreurs=document.getElementById("erreurs")
const imageTelecharger=document.getElementById("image-telecharger")

const axeX = document.getElementById("axe-x");
const filtreLieu = document.querySelector(".filtre-lieu-container");
const filtreAnnee = document.querySelector(".filtre-annee-container");







function  disapearTableau(){  //faire disparaitre le tableau si l'utilisateur clique sur Graph et le reapparaitre si on clique sur tableau
    if(tableau.style.display=="none"){
        tableau.style.display="flex"
        button.innerText="Graph"
        graph.style.width="60%"
        
    }
    else{
        button.innerText="Tableau"
        tableau.style.display="none"
        graph.style.width="80%"
    }
}

function tableOpacity(){

    
    if(button.innerText=="Graph"){
        tableau.style.opacity="0.7"
    }
    else{
        graph.style.opacity="0.7"
    }
    
}

function tableRemoveOpacity(){

    
    if(button.innerText=="Graph"){
        
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
    else{
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
}


function changeImageTelechargerWhite(){
    imageTelecharger.src="../images/téléchargerwhite.svg"
}

function changeImageTelechargerDark(){
    imageTelecharger.src="../images/téléchargerdark.png"
}

function afficherFiltres() {


    

    filtreLieu.style.display = "flex";
    filtreAnnee.style.display = "flex";
    // Afficher le filtre correspondant
    if (axeX.value === "région" || axeX.value === "département") { //masquer le filtre secondaire lieu si on choisi region ou dep
        filtreLieu.style.display = "none"; 
        console.log(axeX.value)
    }
    else if (axeX.value === "date") { //masquer annee (secondaire) si on choisi annee (principal)
        filtreAnnee.style.display = "none";
    }


  }



