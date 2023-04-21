//Make the page display dynamic


const graphContainer=document.getElementById("graph-container")
const canvas=document.getElementById("canvas")
const button=document.getElementById("button-graph")
const tableau=document.getElementById("table")
const graph=document.getElementById("graph-filtres-container")

const imageTelecharger=document.getElementById("image-telecharger")

const axeX = document.getElementById("axe-x");
const filtreLieu = document.querySelector(".filtre-lieu-container");
const filtreAnnee = document.querySelector(".filtre-annee-container");







function  disapearTableau(){  //Make the chart disappears if the user clicks on "Graphe" and reappears if the user clicks on "Tableau"
                                
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

function tableOpacity(){   //Decrease the chart opacity or graph opacity if we hover the graph button

    
    if(button.innerText=="Graphe"){
        tableau.style.opacity="0.7"
    }
    else{
        graph.style.opacity="0.7"
    }
    
}

function tableRemoveOpacity(){  //Remove the opacity effect

    
    if(button.innerText=="Graphe"){
        
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
    else{
        graph.style.opacity="1"
        tableau.style.opacity="1"
    }
}


function afficherFiltres() {


    filtreLieu.style.display = "flex"
    filtreAnnee.style.display = "flex"

    // Display the corresponding filter
    if (axeX.value === "reg_name" || axeX.value === "dep_name") { //Hide the secondary filter "lieu" if we chose region or dep as the X-axis
        filtreLieu.style.display = "none"

    }
    else if (axeX.value === "datetime") { //Hide secondary filter "année" if we chose année as the X-axis
        filtreAnnee.style.display = "none"
    }

}