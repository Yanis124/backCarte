
const anneeRegionTable=document.getElementById("annee-table-select")
var records=document.getElementsByTagName("td")
const table=document.getElementById("table-region-data")

var tableRecords=document.createElement("tbody")
tableRecords.id="table-region"


var apiTable="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=reg_name"

var dataTableList=[] //contient les données du tableau

var inputAnneeTable  //contient l'année

async function getDataTable(){
    await loadTable() //afficher l'animation

    if(inputAnneeTable && inputAnneeTable !="toutes-les-annees"){ //si inputAnneeTable n'est pas definie et diferent de tout
        try{
        
            var res=await fetch(apiTable+"&refine.datetime="+inputAnneeTable)
            var data=await res.json()
            dataTableList=data.facet_groups[0].facets
        }
        catch{
            erreurTable() //afficher une erreur

        }
    }
    else{
        try{
            var res=await fetch(apiTable)
            var data=await res.json()
            dataTableList=data.facet_groups[0].facets
        }
        catch{
            erreurTable()       //afficher une erreur

        }
    }
    

}

async function DrawTable(){

    //createFirstTbody(10)
    
    await getDataTable() //recuperer les données

        if(tableRecords){  //remettre a 0 le tableau
            tableRecords.innerHTML=" "
        }
        

        
    
        for(var i=0;i<dataTableList.length;i++){  //creer le tableau
            var ligneTable=document.createElement("tr")
            ligneTable.innerHTML="<td>" +(i+1)+"</td>"+"<td>"+ dataTableList[i].name+"</td>"+"<td>"+ dataTableList[i].count+"</td>"
            tableRecords.appendChild(ligneTable)
        }
        if(table.children[1]){
            table.removeChild(table.children[1])
        }
        table.appendChild(tableRecords)
        workTable()  //afficher le tableau
        appearText()  //afficher les texte
        
        


}

function resetTable(){  //réinitialiser le tableau 



    for(var i=0;i<records.length;i++){
        records[i].style.color='transparent'
    }
}

function appearText(){
    for(var i=0;i<records.length;i++){
        records[i].style.color='#333'
    }
}

function createFirstTbody(){
    if(!table.children[1]){


        for(var i=0;i<20;i++){
            var ligneTable=document.createElement("tr")
            ligneTable.innerHTML="<td>" +(i+1)+"</td>"+"<td>"+ "sssssssssssssssssss"+"</td>"+"<td>"+ "ssssssssssssssssss" +"</td>"
            tableRecords.appendChild(ligneTable)
        }
        table.appendChild(tableRecords)
        resetTable()
    }
    
}




function getAnneeTable(){   //recuperer l'années
    inputAnneeTable=anneeRegionTable.value

    
    resetTable() //réinitialiser le tableau

    DrawTable() //creer le tableau
}