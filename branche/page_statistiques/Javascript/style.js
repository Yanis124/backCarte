// rendre l'affichage de la page dynamique


const canvas = document.getElementsByTagName("canvas")
const button=document.getElementById("button-graph")
const tableau=document.getElementById("table")
const graph=document.getElementById("graph-filtres-container")





function  disapearTableau(){  //faire disparaitre le tableau si l'utilisateur clique sur Graph et le reapparaitre si on clique sur tableau
    if(tableau.style.display=="none"){
        tableau.style.display="flex"
        button.innerText="Graph"
        
    }
    else{
        button.innerText="Tableau"
        tableau.style.display="none"
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



