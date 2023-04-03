var listAccidentFiltre=[]

var listAccidentLum=[]
var listAccidentRegions=[]

var listAccidentTps=[]

var listAccidentDate=[]
var choix_date=document.getElementById("choix-date");

var listAccidentDepartement=[]


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
    if(choix_date.value=="date-specifique"){
        listAccidentDate=[];
        for(var i=0;i<listAccident.length;i++){
            if((listAccident[i].fields.datetime).substring(0,10)==selectedDate){
                listAccidentDate.push(listAccident[i]);
            }
        }
    }
    if(selectedDepartement&&selectedDepartement!="allDepartements"){
        listAccidentDepartement=[];
        for(var i=0;i<listAccident.length;i++){
            console.log(listAccident[i].fields.dep_name);
            if(selectedDepartement==listAccident[i].fields.dep_name){
                listAccidentDepartement.push(listAccident[i]);   
            }
        }
    }



    selectDataFiltre()  //intersection des listes

    removePin()
    createPin()
   
}
async  function filterList(selectedValues) {
    loadCarte()  //ajouter une animation de chargement 
    loadFiltre()

    await new Promise(r => setTimeout(r, 2000)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 


        filtre=true;

        listAccidentTps=[];

        for (var i=0; i<selectedValues.length; i++){
            if(selectedValues[i]=="normale"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="normale" || listAccident[j].fields.atm=="Normale"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="pluie_legere"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie l\u00e9g\u00e8re"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="pluie_forte"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie forte"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="temps_couverts"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps couvert"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="temps_eblouissant"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps \u00e9blouissant"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="neige_grêle"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Neige - gr\u00eale"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValues[i]=="brouillard_fumée"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Brouillard - fum\u00e9e"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                
            } 
            if(selectedValues[i]=="vent_fort_tempêtes"){
                // console.log("Essaie")
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Vent fort - temp\u00eate"){
                        listAccidentTps.push(listAccident[j]);
                    }
                    
                } 
                console.log(listAccidentTps);
            } 
        }
    

    selectDataFiltre(selectedValues)
    removePin()
    createPin()
}  




function selectDataFiltre(selectedValues){
    if(!selectedRegion||selectedRegion=="allRegions"){
        listAccidentRegions=listAccident
    }

    if(!selectedLum){
        listAccidentLum=listAccident
    }

    if (!selectedValues) {  
        listAccidentTps = listAccident;
        console.log("undefined")
    }

    if (selectedValues){
        if(selectedValues.length == 0){ 
            listAccidentTps = listAccident;
            console.log("lenght==0")
        }
    }
    if(!choix_date){
        listAccidentDate=listAccident;
    }
    if(!selectedDepartement||selectedDepartement=="allDepartements"){
        listAccidentDepartement=listAccident;
    }
    

    console.log(listAccidentFiltre);
 
    var listAccidentFiltre1=listAccidentLum.filter(x => listAccidentRegions.includes(x)); //intersection entre listRegion et listLum
    listAccidentFiltre=listAccidentFiltre1.filter(x => listAccidentTps.includes(x)); //intersection entre listAccidentFiltre1 et listAccidentTps
    listAccidentFiltre=listAccidentFiltre.filter(x=>listAccidentDate.includes(x));
    listAccidentFiltre=listAccidentFiltre.filter(x=>listAccidentDepartement.includes(x));

    console.log(listAccidentFiltre)  
}


async function initFiltre(){
    selectedLum=selectedRegion=selectedValues=selectedDate=selectedDepartement=null //remettre a 0 les filtres 
    loadCarte()  //ajouter une animation de chargement 
    loadFiltre()

    await new Promise(r => setTimeout(r, 2000)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 
      
    filtre=false   
    removePin()     //supprimer lss marqueurs de la carte
    createPin()     
}

