function afficherChoix() {
    var choix = document.getElementById("choix-date");
    var choixDate = document.getElementById("choix-date-specifique");
    var choixInterval = document.getElementById("choix-intervalle-dates");
    if (choix.value == "date-specifique") {
        choixDate.style.display = "block";
        choixInterval.style.display = "none";
    } else if (choix.value == "intervalle-dates") {
        choixDate.style.display = "none";
        choixInterval.style.display = "block";
    } else {
        choixDate.style.display = "none";
        choixInterval.style.display = "none";
    }
}

function resetDepartement() {
    document.getElementById("departement").selectedIndex = 0;
    resetVille();
}

function resetVille() {
    document.getElementById("ville").selectedIndex = 0;
}

// Récupère tout les noms des regions de l'API
function nomRegions() {
    // URL de l'API récupérant les noms des régions
    var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=reg_name";
  
    // Récupération des regions de l'API
    fetch(apiUrl1)
      .then(response => response.json()) // Convertit en objet JSON les données récupérées
      .then(data => {
        var region = data.facet_groups[0].facets; //variable region contenant les données récupérées
        region.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
  

        var regionSelect = document.getElementById("region"); //Variable avec pour id = region
        region.forEach(region => {
            if (region.name !== "Mayotte" && region.name !== "Guadeloupe" && region.name !== "Martinique" && region.name !== "Guyane" && region.name !== "La Réunion"){ //Enlever les regions d'outre mer
                var option = document.createElement("option"); 
                option.value = region.name; 
                option.text = region.name;
                regionSelect.add(option);
            }
        });
      })
}

// Récupère tout les noms des départements de l'API
function nomDepartements(){
    // URL de l'API récupérant les noms des départements
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=dep_name";
  
      // Récupération des départements de l'API
        fetch(apiUrl2)
          .then(response => response.json()) // Convertit en objet JSON les données récupérées
          .then(data => {
            var departement = data.facet_groups[0].facets; //variable departement contenant les données récupérées
            departement.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
    
          // Ajout des communes à la liste déroulante
            var departementSelect = document.getElementById("departement"); //Variable avec pour id = departement
            departement.forEach(departement => {
                if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La Réunion"){ //Enlever les departements d'outre mer
                    var option = document.createElement("option");
                    option.value = departement.name;
                    option.text = departement.name;
                    departementSelect.add(option);
                }

            });
          })
}

// Récupère tout les noms des villes de l'API
function nomVilles(){
    // URL de l'API récupérant les noms des villes
	var apiUrl3 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=nom_com";

	// Récupération des communes de l'API
	fetch(apiUrl3)
		.then(response => response.json()) // Convertit en objet JSON les données récupérées
		.then(data => {
			var ville = data.facet_groups[0].facets; //variable ville contenant les données récupérées
			ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique


			// Ajout des communes à la liste déroulante
			var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
			ville.forEach(ville => {
				var option = document.createElement("option");
				option.value = ville.name;
				option.text = ville.name;
				villeSelect.add(option);
			});
	    })
}

   
// Filtre les départements et les villes en fonction de la région selectionnée
function filtreRegion() {

  // Région sélectionnée
  var regionSelect = document.getElementById("region"); //recupération de l'ID
  var selectedRegion = regionSelect.options[regionSelect.selectedIndex].text; //recupération du texte de l'option selectionne dans la barre déroulante d'ID = region

  // URL de l'API pour les départements de la région sélectionnée
  var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=dep_name&refine.reg_name=" + encodeURIComponent(selectedRegion); // permet encoder un nouvel URL avec la region selectionné

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
  var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=nom_com&refine.reg_name=" + encodeURIComponent(selectedRegion); // permet encoder un nouvel URL avec la region selectionné

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
}

// Filtre villes en fonction du département selectionnée
function filtreDepartement() {

  // Departement sélectionnée
  var departementSelect = document.getElementById("departement"); //recupération de l'ID
  var selectedDepartement = departementSelect.options[departementSelect.selectedIndex].text; //recupération du texte de l'option selectionne dans la barre déroulante d'ID = departement

  // URL de l'API pour les villes du département sélectionnée
  var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=nom_com&refine.dep_name=" + encodeURIComponent(selectedDepartement); // permet encoder un nouvel URL avec la region selectionné

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
}

//Initialisation de la carte
var map=L.map("map",{
    keyboardPanDelta:100,
    wheelDebounceTime:0,
    wheelPxPerZoomLevel:50,
    minZoom:5,
}).setView([48.862725, 2.287592],5);
var contenu=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

//Fonction pour créer un marqueur ainsi que le contenu de son popup.
//On peut rajouter plein d'options aux marqueurs et aux popups. A voir dans la documentation.
// function creer_marqueur(latitude,longitude){
//     var contenu_popup=latitude+","+longitude;
//     L.marker([latitude,longitude],{
//         riseOnhover:true,
//     }).bindPopup(contenu_popup).addTo(map)
// }

var lat_long="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&refine.datetime=2019";

async function get_lat_long(){   
    var res=await fetch(lat_long)
    var data=await res.json()
    
    for(var i=0;i<data.records.length;i++){
        
        try{  //il y a des accidents qui n'ont pas de corrdonnees
            var marker = L.marker([data.records[i].fields.coordonnees[0],data.records[i].fields.coordonnees[1]])
            marker.addTo(map)
        }
        catch{
            console.log("couldn't find cordinates")
        }
    }
    
}

get_lat_long();

