//afficher les animations et le message d'erreur dans le graph et le tableau 


const spinnerGraph=document.getElementById("spinner-graph")   
const erreursGraph=document.getElementById("erreurs-graph")

const spinnerTable=document.getElementById("spinner-table")
const errerusTable=document.getElementById("erreurs-table")

const tableRegionData=document.getElementById("table-region-data")

function loadGraph(){
    canvas.style.display="none"  
    spinnerGraph.style.display="block"         //afficher l'animation si les données ne sont pas encore chargées
    graphContainer.style.backgroundColor="white"
    erreursGraph.style.display="none"
}

function erreurGraph(){                              //afficher un message d'erreur 
    console.log("erreur de fetch")
    canvas.style.display="none"
    erreursGraph.style.display="block"
}
  
function workGraph() {                              //supprimer l'animation si les données ont été recuperé
    spinnerGraph.style.display="none"
    
    if(erreursGraph.style.display!="block"){
        canvas.style.display="block"
        graphContainer.style.backgroundColor="#dee5ef"
        

    }
}

function loadTable(){
    tableRegionData.style.display="none"
    spinnerTable.style.display="block"
    errerusTable.style.display="none"
}

function erreurTable(){
    console.log("erreur de fetch")
    tableRegionData.style.display="none"
    spinnerTable.style.display="none"
    errerusTable.style.display="block"
}

function workTable() {
    spinnerTable.style.display="none"
    
    if(errerusTable.style.display!="block"){
        tableRegionData.style.display="table"

        

    }
}