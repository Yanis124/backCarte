var listAccidentFiltre=[];

var listAccidentLum=[];
var listAccidentRegions=[];
var listAccGravite = [];

var filtre=false //pour indiquer a la fonction createPin d'utiliser listAccidentFiltre

async function getDataFiltre(){
    loadCarte()  //ajouter une animation de chargement 
    loadFiltre()

    await new Promise(r => setTimeout(r, 2000)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 
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

    selectDataFiltre()  //intersection des listes



   
   removePin()
   createPin()
   
}



function selectDataFiltre(){
    if(!selectedRegion){
        listAccidentRegions=listAccident
    }

    if(!selectedLum){
        listAccidentLum= listAccident
    }
    console.log(listAccidentLum)
    console.log(listAccidentRegions)
   
   
   

   
    listAccidentFiltre=listAccidentLum.filter(x => listAccidentRegions.includes(x)); //intersection entre listRegion et listLum

    console.log(listAccidentFiltre)
}


function initFiltre(){
    selectedLum=selectedRegion=null //remettre a 0 les filtres 
      
    filtre=false   
    removePin()     //supprimer lss marqueurs de la carte
    createPin()     
}

