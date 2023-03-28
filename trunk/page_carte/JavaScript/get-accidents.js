var listDepartement=[]  
var listAccident=[] 
var listAnnee=[]


async function getAnnee(){
    var api="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&row=0&facet=datetime"

    try{
        var res= await fetch(api)
        var data=await res.json()
        console.log(data)

        for(var i=0;i<data.facet_groups[0].facets.length;i++){
            listAnnee.push(data.facet_groups[0].facets[i].name)
        }
    }
    catch{
        console.log("erreur de fetch")
    }
    console.log(listAnnee)
}

async function getDepartement(){  //recuperer les departements

    
    var api="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&row=0&facet=dep_name"
    try{

        
        var res= await fetch(api)
        var data=await res.json()
        for(var i=0;i<data.facet_groups[0].facets.length;i++){
            var departement=data.facet_groups[0].facets[i]
            if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La Réunion"){ //Enlever les departements d'outre mer

                listDepartement.push(data.facet_groups[0].facets[i].name)
            }
        }
    }
    
    catch{
        console.log("erreur de fetch")
    }

    console.log(listDepartement)

}





async function getAccident(){  //faire des appels par departement et par année pour etre sur d'avoir moin de 10000 accident a la fois
    loadCarte()
    await getDepartement()
    await getAnnee()

    
    
    
    var api="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=9999&refine.dep_name="

  
    for(var i=0;i<listDepartement.length;i++){ //iterer tous les departements
        for(var j=0;j<listAnnee.length;j++){  //iterer les années
            console.log(listDepartement[i])
            console.log(i)
            try{
                console.log(listDepartement[i]+" année : "+listAnnee[j])
                console.log(i)
                
                var res=await fetch(api+listDepartement[i]+"&refine.datetime"+listAnnee[j])
                var data=await res.json()
                
                for(var j=0;j<data.records.length;j++){
                    listAccident.push(data.records[j])
                }
                //console.log(listAccident)
                
                
            }
            catch{
                console.log("erreur de fetch")
            }
        }
    }
    console.log(listAccident.length)
    createPin()
}








