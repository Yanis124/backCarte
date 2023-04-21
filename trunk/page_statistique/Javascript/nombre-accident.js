//Retrieve the total number of accidents

const nombreAccident=document.getElementById("nombre-accident")

var apiNombreAccident="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0"

async function getNombreAccident(){
    var res=await fetch(apiNombreAccident)
    var data=await res.json()

    nombreAccident.innerText=data.nhits    
}

getNombreAccident()


