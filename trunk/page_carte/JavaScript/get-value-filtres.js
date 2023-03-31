//definir les valeurs des filtre comme variables globales pour avoir un access direct depuis tous les fichiers 

var selectedDate

var selectedDateStart  
var selectedDateEnd

var selectedRegion
var selectedDepartement
var selectedVille

var selectedMeteo

var selectedAge

var selectedGravite

var selectedLum

function getIntervalleDateStart(){  //limiter le choix dans le filtre date de fin et recuperer la date
    selectedDateEnd=dateStart.value
    console.log(selectedDateEnd)
    dateEnd.setAttribute("min",selectedDateEnd)    

}

function getIntervalleDateEnd(){  //limiter le choix dans le filtre date de debut et recuperrer la date
    selectedDateStart=dateEnd.value
    console.log(selectedDateStart)
    dateStart.setAttribute("max",selectedDateStart)  
}

function getDate(){  //recuperer la date 
    selectedDate=date.value
    console.log(selectedDate)
}

function getRegion() {      // Région sélectionnée



    selectedRegion = regionSelect.value; 
    getDataFiltre()

        // URL de l'API pour les départements de la région sélectionnée
        var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name&refine.reg_name=" + selectedRegion; // permet encoder un nouvel URL avec la region selectionné
    
        fetch(apiUrl)
            .then(response => response.json()) // Convertit en objet JSON les données récupérées
            .then(data => {
                var departement = data.facet_groups[0].facets; //variable departement contenant les données récupérées
                departement.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
    
                // Mise à jour de la liste déroulante des départements
                var departementSelect = document.getElementById("departement"); //Variable avec pour id = departement
                departementSelect.options.length = 1; // suppression des options précédentes
                departement.forEach(departement => {
                    var option = document.createElement("option");
                    option.value = departement.name;
                    option.text = departement.name;
                    departementSelect.add(option);
                });
            })
        
  
        
        // URL de l'API pour les villes de la région sélectionnée
        var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionné
    
        fetch(apiUrl1)
        .then(response => response.json()) // Convertit en objet JSON les données récupérées
        .then(data => {
            var ville = data.facet_groups[0].facets; //variable villes contenant les données récupérées
            ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
    
            // Mise à jour de la liste déroulante des villes
            var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
            villeSelect.options.length = 1; // Suppression des options précédentes
            ville.forEach(ville => {
                var option = document.createElement("option");
                option.value = ville.name;
                option.text = ville.name;
                villeSelect.add(option);
            });
        })

    console.log(selectedRegion)
}

function getDepartement() {
    

    // Departement sélectionnée
    
    selectedDepartement = departementSelect.value;
    

    if(selectedDepartement==="allDepartements"){  //si on selectionne tous les departements on affiche toutes les villes de la regions selectionné
        getRegion()
    }
    // URL de l'API pour les villes du département sélectionnée
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionné
  
    // Récupération des départements de l'API pour la région sélectionnée
    fetch(apiUrl2)
    .then(response => response.json())
    .then(data => {
        var ville = data.facet_groups[0].facets;
        ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
  
        // Mise à jour de la liste déroulante des villes
        var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
        villeSelect.options.length = 1; // Suppression des options précédentes
        ville.forEach(ville => {
            var option = document.createElement("option");
            option.value = ville.name;
            option.text = ville.name;
            villeSelect.add(option);
        });
    })
    console.log(selectedDepartement)
}

function getVille(){
    selectedVille=villeSelect.value
    console.log(selectedVille)
}


function getMeteo(){
    selectedMeteo=meteoSelect.value
    console.log(selectedMeteo)
}

function getAge(){
    selectedAge=ageSelect.value
    console.log(selectedAge)
}

function getGravite(){
    selectedGravite=graviteSelect.value
    console.log(selectedGravite)
}

function getJour(){
    selectedLum=jourSelect.value
    getDataFiltre()
    console.log(selectedLum)
}

function getNuit(){
    selectedLum=nuitSelect.value
    getDataFiltre()
    console.log(selectedLum)
}