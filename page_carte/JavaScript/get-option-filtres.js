//definir les filtres comme variables globales pour avoir un accès à leurs valeurs depuis tous les fichiers 

var date=document.getElementById("date")
var dateStart=document.getElementById("date-debut")
var dateEnd=document.getElementById("date-fin")

var regionSelect = document.getElementById("region")
var departementSelect = document.getElementById("departement")
var villeSelect = document.getElementById("ville")


var graviteSelect=document.getElementById("gravite")

var meteoSelect=document.getElementById("weather-container")

var ageSelect=document.getElementById("tranche-age")

var jourSelect=document.getElementById("jour")
var nuitSelect=document.getElementById("nuit")









function afficherChoix() {
    var choix = document.getElementById("choix-date");
    var choixDate = document.getElementById("choix-date-specifique");
    var choixInterval = document.getElementById("choix-intervalle-dates");
    if (choix.value == "date-specifique") {
        choixDate.style.display = "flex";
        choixInterval.style.display = "none";
    } else if (choix.value == "intervalle-dates") {
        choixDate.style.display = "none";
        choixInterval.style.display = "flex";
    } else {
        choixDate.style.display = "none";
        choixInterval.style.display = "none";
    }
}


function dateLimit(){
    
    date.setAttribute("min","2012-01-01") //limiter le choix de la date 
    date.setAttribute("max","2020-01-01")

    dateStart.setAttribute("min","2012-01-01") //limiter le choix de la date 
    dateStart.setAttribute("max","2020-01-01")


    dateEnd.setAttribute("min","2012-01-01") //limiter le choix de la date 
    dateEnd.setAttribute("max","2020-01-01")
}

// Récupère tout les noms des regions de l'API
function nomRegions() {
    // URL de l'API récupérant les noms des régions
    var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=reg_name";
  
    
    // Récupération des regions de l'API
    fetch(apiUrl1)
      .then(response => response.json()) // Convertit en objet JSON les données récupérées
      .then(data => {
        var region = data.facet_groups[0].facets; //variable region contenant les données récupérées
        region.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
        
  

        
        region.forEach(region => {
            if (region.name !== "Mayotte" && region.name !== "Guadeloupe" && region.name !== "Martinique" && region.name !== "Guyane" && region.name !== "La Réunion"){ //Enlever les regions d'outre mer
                var option = document.createElement("option"); 
                option.value = region.name; 
                option.text = region.name;
                regionSelect.add(option);
            }
        });
        
      },
      )
      
      .catch(console.log("erreur de fetch")) //gerer les erreurs
    
}

// Récupère tout les noms des départements de l'API

function nomDepartements(){
    // URL de l'API récupérant les noms des départements
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name";
    
  
   
      // Récupération des départements de l'API
        fetch(apiUrl2)
          .then(response => response.json()) // Convertit en objet JSON les données récupérées
          .then(data => {
            var departement = data.facet_groups[0].facets; //variable departement contenant les données récupérées
            departement.sort((a, b) => a.name.localeCompare(b.name));
            
    
          // Ajout des communes à la liste déroulante
            
            departementSelect.options.length = 1; // suppression des options précédentes
            departement.forEach(departement => {
                if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La Réunion"){ //Enlever les departements d'outre mer
                    var option = document.createElement("option");
                    option.value = departement.name;
                    option.text = departement.name;
                    departementSelect.add(option);
                }

            });
            
          },
          )
          .catch(console.log("erreur de fetch")) //gerer les erreurs
    
}

// Récupère tout les noms des villes de l'API
function nomVilles(){
    // URL de l'API rÃ©cupÃ©rant les noms des villes
	var apiUrl3 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com";
    
	// RÃ©cupÃ©ration des communes de l'API
	fetch(apiUrl3)
		.then(response => response.json()) // Convertit en objet JSON les donnÃ©es rÃ©cupÃ©rÃ©es
		.then(data => {
			var ville = data.facet_groups[0].facets; //variable ville contenant les donnÃ©es rÃ©cupÃ©rÃ©es
			ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabÃ©tique


			// Ajout des communes Ã  la liste dÃ©roulante
			
            villeSelect.options.length = 1; // Suppression des options prÃ©cÃ©dentes
			ville.forEach(ville => {
				var option = document.createElement("option");
				option.value = ville.name;
				option.text = ville.name;
				villeSelect.add(option);
			});
            
	    },
        )
        .catch(console.log("erreur de fetch")) //gerer les erreurs
}

function createElementCkeck(data){
    var option = document.createElement("li"); 
    option.className="item"
    //console.log(data.facet_groups[0].facets[i].name)
    option.value=data.name //ne marche pas
    var span1=document.createElement("span")
    span1.className="checkbox"
    var span2=document.createElement("span")
    span2.className="item-text"
    span2.innerText=data.name
    var I=document.createElement("i")
    I.className="fa-solid fa-check check-icon"
    span1.appendChild(I)
    
    option.appendChild(span1)
    option.appendChild(span2)
    return option

}

// Filtre les départements et les villes en fonction de la région selectionnée


// Filtre villes en fonction du département selectionnée

/* function addEventChecked(){  */ //ajouter l'evenement aux check box

const selectBtn = document.querySelectorAll(".select-btn"),
    items = document.querySelectorAll(".item"),
    resetBtn = document.querySelector('input[type="reset"]');

selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
});
items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const selectedItems = document.querySelectorAll(".checked"); // Récupérer tous les éléments avec la classe "checked"
        const selectedValues = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés
        console.log(selectedValues); // Afficher les valeurs sélectionnées dans la console
        filterList(selectedValues);    
    });
}); 


 items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
});


