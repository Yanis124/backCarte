const canvas = document.getElementsByTagName("canvas")
var graphSelect=document.getElementById("graph-select")
const button=document.getElementById("button-graph")
const tableauId=document.getElementById("table")
const graphId=document.getElementById("graph-filtres-container")
const graphCont=document.getElementById("graph-container")
const downloadImage=document.getElementById("image")




function  disapearTableau(){
    if(tableauId.style.display=="none"){
        tableauId.style.display="flex"
        tableauId.style.height="80%"
        button.innerText="Graph"
        graphId.style.flexBasis="50%"
        
    }
    else{
        button.innerText="Tableau"
        tableauId.style.display="none"
        graphId.style.flexBasis="80%"
    }
}

function tableOpacity(){

    
    if(button.innerText=="Graph"){
        tableauId.style.opacity="0.7"
    }
    else{
        graphId.style.opacity="0.7"
    }
    
}

function tableRemoveOpacity(){

    
    if(button.innerText=="Graph"){
        
        graphId.style.opacity="1"
        tableauId.style.opacity="1"
    }
    else{
        graphId.style.opacity="1"
        tableauId.style.opacity="1"
    }
}



