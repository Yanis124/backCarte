var listAccidentFiltre=[]   //definir une liste d'accident par filtre
var listAccidentDate=[]
var listAccidentIntervallDate=[]
var listAccidentLum=[]
var listAccidentRegions=[]
var listAccidentDepartement=[]
var listAccidentVille=[]
var listAccidentAtm=[]
var listAccidentAge=[]
var listAccidentGravite=[]
var filtre=false //pour indiquer a la fonction createPin d'utiliser listAccidentFiltre
async function getDataFiltre(){
    loadCarte()  //ajouter une animation de chargement 
    // loadFiltre()
    await new Promise(r => setTimeout(r, 100)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 
    filtre=true   
    if(selectedLum){  //filtre lunmiere
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
    
    if(selectedRegion){ //filtre region
        listAccidentRegions=[]
        for(var i=0;i<listAccident.length;i++){
            if(listAccident[i].fields.reg_name==selectedRegion){
                listAccidentRegions.push(listAccident[i])
            }
        }
       
    }
    if(selectedDepartement&&selectedDepartement!="allDepartements"){ //filtre departement
        listAccidentDepartement=[];
        for(var i=0;i<listAccident.length;i++){
            if(selectedDepartement==listAccident[i].fields.dep_name){
                listAccidentDepartement.push(listAccident[i]);   
            }
        }
    }
    if(selectedVille&&selectedVille!="allVilles"){ //filtre ville
        listAccidentVille=[];
        
        for(var i=0;i<listAccident.length;i++){
            
            if(selectedVille == listAccident[i].fields.nom_com){
                listAccidentVille.push(listAccident[i]);   
            }
        }
    } 
    if(selectedDate){  //filtre date specifique
        listAccidentDate=[];
        for(var i=0;i<listAccident.length;i++){
            if((listAccident[i].fields.datetime).substring(0,10)==selectedDate){
                listAccidentDate.push(listAccident[i]);
            }
        }
    }
    //Intervalle de dates
    if(selectedDateStart && selectedDateEnd){
        listAccidentIntervallDate=[];
        var date_debut=new Date(selectedDateStart).getTime();
        var date_fin=new Date(selectedDateEnd).getTime();
        console.log(date_debut);
        console.log(date_fin);
        
        for(var i=0;i<listAccident.length;i++){
            var date_accident=new Date((listAccident[i].fields.datetime).substring(0,10)).getTime();
            //console.log(date_accident);
        
            if((date_debut<=date_accident)&&(date_fin>=date_accident)){
				
                listAccidentIntervallDate.push(listAccident[i]);
            }
            
        }
        
    }
    selectDataFiltre()  //intersection des listes
    removePin()
    createPin()
   
}
async  function filterList() {   //selectedValueAtm contient les valeurs selectionnées dans le filtre atm
    loadCarte()  //ajouter une animation de chargement 
    //loadFiltre()
    await new Promise(r => setTimeout(r, 100)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire
    
        filtre=true;
        
        
/*----------GRAVITE----------*/
        if(selectedValuesGravite){   
            listAccidentGravite=[]                                 
             for (let i = 0; i < selectedValuesGravite.length; i++) {
                 var gravIncluded = selectedValuesGravite[i];
               
                 //On boucle sur la liste des accidents
                 for (let j = 0; j < listAccident.length; j++) {
                    
                    //Pour chaque accident, on extrait la liste des gravitÃ©s & on indique que le sÃ©parateur est une virgule
                    let gravi = listAccident[j].fields.grav;
					let gravArray =[];
                     
                     //si il y a une personne 
                    try{                      
						gravArray = gravi.split(",");
					}
					catch{
						console.log("only 1 person harmed")
						gravArray.push(gravi)
					}
                     
                     //console.log(gravi);
                    
                     //On tourne sur cette liste et on vÃ©rifie si elle contient une des gravitÃ©s selectionnÃ©es par l'utilisateur
                     for (let y = 0; y < gravArray.length; y++) {
                         let gravite_ind = gravArray[y];
                         let isIncluded = false;
                         
                        
                         if (gravIncluded =="Indemne" && gravite_ind == "Indemne") {
                             isIncluded = true;
                         } else if (gravIncluded == "Blessé" && gravite_ind == "Blessé") {
                             isIncluded = true;
                         } else if (gravIncluded == "Tué" && gravite_ind == "Tué") {
                             isIncluded = true;
                         }
                         if (isIncluded) {
                             listAccidentGravite.push(listAccident[j]);
                             break //quitter la boucle une fois que l'accident est ajouter dans la liste 
                         }
                     }
                 }
             }
             console.log("end of grav")
         }   
    
    
        if(selectedValuesAtm){  //filtre meteo
        listAccidentAtm=[];
        for (var i=0; i<selectedValuesAtm.length; i++){
            if(selectedValuesAtm[i]=="normale"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="normale" || listAccident[j].fields.atm=="Normale"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="pluie_legere"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie l\u00e9g\u00e8re"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="pluie_forte"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie forte"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="temps_couverts"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps couvert"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="temps_eblouissant"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps \u00e9blouissant"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="neige_grêle"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Neige - gr\u00eale"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="brouillard_fumée"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Brouillard - fum\u00e9e"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            } 
            if(selectedValuesAtm[i]=="vent_fort_tempêtes"){
                // console.log("Essaie")
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Vent fort - temp\u00eate"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
            } 
        }
    }
    if(selectedValuesAge){ //filtre age
        listAccidentAge=[]
        for (let i = 0; i < selectedValuesAge.length; i++) {
            var ageRange = selectedValuesAge[i];
            for (let j = 0; j < listAccident.length; j++) {
                let deathYear = listAccident[j].fields.an;
                let years = listAccident[j].fields.an_nais;
                var yearArray=[]
                try{                              //si il y a une personne 
                    yearArray = years.split(",");
                }
                catch{
                    console.log("only 1 person")
                    yearArray.push(years)
                }
        
                for (let y = 0; y < yearArray.length; y++) {
                    let age = deathYear - yearArray[y];
                    let isInRange = false;
                    if (ageRange == "0-18" && age <= 18) {
                        isInRange = true;
                    } else if (ageRange == "18-30" && age >= 18 && age <= 30) {
                        isInRange = true;
                    } else if (ageRange == "30-50" && age >= 30 && age <= 50) {
                        isInRange = true;
                    } else if (ageRange == "50-65" && age >= 50 && age <= 65) {
                        isInRange = true;
                    } else if (ageRange == "65_et_plus" && age >= 65) {
                        isInRange = true;
                    }
                    if (isInRange) {
                        listAccidentAge.push(listAccident[j]);
                        break;
                    }
                }
            }
        }
    }
    
    selectDataFiltre()
    removePin()
    createPin()
}  
function selectDataFiltre(){
    if(!selectedLum){
        listAccidentLum=listAccident
    }
    listAccidentFiltre = listAccidentLum.filter((x) =>    //Reduire la compexité 
                                                            // faire une intersection que si le filtre est selectionné
    listAccident.includes(x))
    
    if(selectedRegion){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentRegions.includes(x))
    }
    
   
 
    if (selectedValuesAtm && selectedValuesAtm.length>0) {  
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentAtm.includes(x))
    }
    if(selectedDepartement){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentDepartement.includes(x))
    }
    if(selectedVille){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentVille.includes(x))
    }
    if(selectedDate){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentDate.includes(x))
    }
    if(selectedDateStart && selectedDateEnd){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentIntervallDate.includes(x))
    }
    if(selectedValuesAge && selectedValuesAge.length>0){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentAge.includes(x))
    }
	if(selectedValuesGravite && selectedValuesGravite.length>0){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentGravite.includes(x))
	}
	
	
    console.log(listAccidentFiltre)
      
}
async function initFiltre(){
    selectedVille=selectedDepartement=selectedDate=selectedLum=selectedRegion=selectedValuesAtm=selectedValuesAge=selectedValuesGravite=selectedDateEnd=selectedDateStart= null //remettre a 0 les filtres 
    loadCarte()  //ajouter une animation de chargement 
    //loadFiltre()
    await new Promise(r => setTimeout(r, 100)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 
      
    filtre=false   
    removePin()     //supprimer lss marqueurs de la carte
    createPin()     
}