// rendre l'affichage de la page dynamique


const graphContainer=document.getElementById("graph-container")
const canvas=document.getElementById("canvas")
const button=document.getElementById("button-graph")
const tableau=document.getElementById("table")
const graph=document.getElementById("graph-filtres-container")

const imageTelecharger=document.getElementById("image-telecharger")

const axeX = document.getElementById("axe-x");
const filtreLieu = document.querySelector(".filtre-lieu-container");
const filtreAnnee = document.querySelector(".filtre-annee-container");







function  disapearTableau(){  //faire disparaitre le tableau si l'utilisateur clique sur Graphe et le reapparait si on clique sur tableau
    if(tableau.style.display=="none"){
        tableau.style.display="flex"
        button.innerText="Graphe"
        graph.style.width="60%"
        
    }
    else{
        button.innerText="Tableau"
        tableau.style.display="none"
        graph.style.width="80%"
    }
}

function tableOpacity(){   //diminuer l'opacity du tableau ou du graphe si on survole le bouton graphe

    
    if(button.innerText=="Graphe"){
        tableau.style.opacity="0.7"
    }
    else{
        graph.style.opacity="0.7"
    }
    
}

function tableRemoveOpacity(){  //enlever l'effet d'opacity 

    
    if(button.innerText=="Graphe"){
        
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
    else{
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
}


function changeImageTelechargerWhite(){                   //changer l'image dans le boutton télécharger si on le survole
    imageTelecharger.src="../images/téléchargerwhite.svg"
}

function changeImageTelechargerDark(){
    imageTelecharger.src="../images/téléchargerdark.png"
}

function afficherFiltres() {


    filtreLieu.style.display = "flex"
    filtreAnnee.style.display = "flex"

    // Afficher le filtre correspondant
    if (axeX.value === "reg_name" || axeX.value === "dep_name") { //masquer le filtre lieu (secondaire)  si on choisi region ou dep
        filtreLieu.style.display = "none"

    }
    else if (axeX.value === "datetime") { //masquer annee (secondaire) si on choisi annee (principal)
        filtreAnnee.style.display = "none"
    }

}





