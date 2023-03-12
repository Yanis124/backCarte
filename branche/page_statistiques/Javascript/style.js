// rendre l'affichage de la page dynamique
const spinner=document.getElementById("spinner")
const graphContainer=document.getElementById("graph-container")
const canvas=document.getElementById("canvas")
const button=document.getElementById("button-graph")
const tableau=document.getElementById("table")
const graph=document.getElementById("graph-filtres-container")
const erreur=document.getElementById("erreur")







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



