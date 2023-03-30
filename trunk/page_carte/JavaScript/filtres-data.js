var listAccidentFiltre=[];

var listAccidentLum=[];
var listAccidentRegions=[];
var listAccGravite = [];
var listAccidentVille=[];

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
    
    
    /*
    if(selectedVille){
		listAccidentVille = []
		
		for(let i = 0; i<listAccident.length; i++){
			if(listAccident[i].fields.com_name==selectedVille){
				listAccidentVille.push(listAccident[i])
			}
		}
	}
	else if(selectedVille=="allVilles"){
		listAccidentVille=listAccident);
	} */
    
    /*
    //Sert à sélectionner l'âge, la gravité de l'accident & les conditions météo
    if(selectedValues){
		listAccidentGAM = []
		
		//On commence par la météo
		listAccidentMeteo = []
		if(selectedValues.find(element => element == "Normale"){	
			const retourMeteoNormal = listAccident.filter(accident => accident.fields.atm == "Normale")
		}
		
		if(selectedValues.find(element => element == "Pluie forte"){	
			const retourMeteoPluieForte = listAccident.filter(accident => accident.fields.atm == "Pluie forte")
		}
		
		listAccidentMeteo = retournMeteoNormal + retourMeteoPluieForte
		console.log(listAccidentMeteo)
	}
	*/
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

