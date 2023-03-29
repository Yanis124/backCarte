var listAccidentFiltre=[]

var listAccidentLum=[]
var listAccidentRegions=[]

var filtre=false //pour indiquer a la fonction createPin d'utiliser listAccidntFiltre

function getDataFiltre(){
    filtre=true   
    if(selectedLum){
        listAccidentLum=[]

        if(selectedLum=="jour"){
            for(var i=0;i<listAccident.length;i++){
                if(listAccident[i].fields.lum=="Plein jour" || listAccident[i].fields.lum=="Crépuscule ou aube"){
                    listAccidentLum.push(listAccident[i])
                }
              
            }
        }
        else{
                for(var i=0;i<listAccident.length;i++){
                    if(listAccident[i].fields.lum=="Nuit avec éclairage public allumé" || listAccident[i].fields.lum=="Nuit sans éclairage public" || listAccident[i].fields.lum=="Nuit avec éclairage public non allumé"){
                        listAccidentLum.push(listAccident[i])
                    }
                }
        }       
    }
    

    if(selectedRegion){
        listAccidentRegions=[]

        for(var i=0;i<listAccident.length;i++){
            if(listAccident[i].fields.reg_name==selectedRegion){
                listAccidentRegions.push(listAccident[i])
            }
        }
       
    }

    selectDataFiltre()



   console.log(listAccidentLum)
   console.log(listAccidentRegions)
   
   
   console.log(listAccidentFiltre)
   initFiltreMap()
}


function initFiltreMap(){
    removeMap() //supprmier la map
    createPin()  //creer les marqueurs
}

function selectDataFiltre(){
    if(selectedRegion && !selectedLum){
        listAccidentFiltre= listAccidentRegions.filter(x => listAccident.includes(x));  //intersection entre les deux listes
    }

    if(selectedLum && !selectedRegion){
        listAccidentFiltre= listAccidentLum.filter(x => listAccident.includes(x));  //intersection entre les deux listes
    }

    if(selectedLum && selectedRegion){
        listAccidentFiltre=listAccidentLum.filter(x => listAccidentRegions.includes(x));

    }
}


