const tableRegion=document.getElementById("table-region")
const anneeRegionTable=document.getElementById("annee-table-select")



var apiTable="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=reg_name"

var dataTableList=[] //contient les données du tableau

var inputAnneeTable  //contient l'année

async function getDataTable(){
    loadTable() //afficher l'animation

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
    workTable()  //afficher le tableau

}

async function DrawTable(){
    
    await getDataTable() //recuperer les données
    
    
        for(var i=0;i<dataTableList.length;i++){  //creer le tableau
            var ligneTable=document.createElement("tr")
            ligneTable.innerHTML="<td>" +(i+1)+"</td>"+"<td>"+ dataTableList[i].name+"</td>"+"<td>"+ dataTableList[i].count+"</td>"
            tableRegion.appendChild(ligneTable)
            
        }


}

function getAnneeTable(){   //recuperer l'années
    inputAnneeTable=anneeRegionTable.value
    resetTable() //réinitialiser le tableau

    DrawTable() //creer le tableau
}

function resetTable(){  //réinitialiser le tableau
    if(tableRegion.childElementCount>0){
        tableRegion.innerHTML="<tbody></tbody>"
    }
}





DrawTable() //creer le tableau avec les données de toutes les années une fois connecter 