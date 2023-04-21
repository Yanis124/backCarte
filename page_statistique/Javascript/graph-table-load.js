//Diplay animations and the error message in the graph and in the chart


const spinnerGraph=document.getElementById("spinner-graph")   
const erreursGraph=document.getElementById("erreurs-graph")


const erreursTable=document.getElementById("erreurs-table")

const tableRegionData=document.getElementById("table-region-data")



function loadGraph(){
    canvas.style.display="none"  
    spinnerGraph.style.display="block"         //Display the animation if datas are not yet loaded
    graphContainer.style.backgroundColor="white"
    erreursGraph.style.display="none"
}

function erreurGraph(){                              //Error message
    console.log("erreur de fetch")
    canvas.style.display="none"
    erreursGraph.style.display="block"
}
  
function workGraph() {                              //Delete the animation if datas have been retrieved
    spinnerGraph.style.display="none"
    
    if(erreursGraph.style.display!="block"){
        canvas.style.display="block"
        graphContainer.style.backgroundColor="#dee5ef"
        

    }
}



async function loadTable(){
    
    tableRegionData.className="table-loading"
    erreursTable.style.display="none"
    await new Promise(r => setTimeout(r, 500)); 
}

function erreurTable(){
    console.log("erreur de fetch")
    tableRecords.style.display="none"
    erreursTable.style.display="block"
}

function workTable() {
    tableRegionData.className=""
    
    if(erreursTable.style.display!="block"){
        tableRegionData.style.display="table"
    }
}