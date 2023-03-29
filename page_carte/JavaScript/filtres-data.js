var listAccidentFiltre=[]

var listAccidentLum=[]
var listAccidentRegions=[]

var filtre=false //pour indiquer a la fonction createPin d'utiliser listAccidentFiltre

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
    else if (selectedRegion=="allRegions"){
        listAccidentRegions=listAccident;
    }

    selectDataFiltre()

   console.log(listAccidentLum)
   console.log(listAccidentRegions)
   
   console.log(listAccidentFiltre)
   initFiltreMap()
}


function initFiltreMap(){
    removeMap() //supprimer la map
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


