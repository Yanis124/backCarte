//definir les filtres comme variables globales pour avoir un accès à leurs valeurs depuis tous les fichiers 


var date=document.getElementById("date")
var startDate=document.getElementById("date-debut")
var endDate=document.getElementById("date-fin")

var dateStart=document.getElementById("date-debut")
var dateEnd=document.getElementById("date-fin")
var regionSelect = document.getElementById("region")
var departementSelect = document.getElementById("departement")
var villeSelect = document.getElementById("ville")
var graviteSelect=document.getElementById("gravite-container")
var meteoSelect=document.getElementById("weather-container")
var ageSelect=document.getElementById("tranche-age")

var jourSelect=document.getElementById("jour")
var nuitSelect=document.getElementById("nuit")

function displayDate(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textDate=document.querySelector('.date-specifique-container p')
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDateValue=document.querySelector("#date-specifique-container span")
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    

    if(!inputChoice.checked){
        dateSpecifiqueContainer.style.display="none"
        textDate.style.color="#333"
        selectedDate=null
        date.value = null; 
        textDateValue.innerText="Date"
        textDateValue.style.color="#333"
       


        getDataFiltre()
    }
    else{
        var inputDateInterval=document.getElementById("interval-date")

        dateSpecifiqueContainer.style.display="flex"
        dateIntervalContainer.style.display="none"
        textDate.style.color='#000'
        textIntervalDate.style.color="#333"
    
        

        if(inputDateInterval.checked){
            inputDateInterval.checked=false
            textDate.style.color='#333'
            textDateIntervalValue[0].innerText="Debut"
            textDateIntervalValue[1].innerText="Fin"
            textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
            startDate.value=endDate.value=null
            selectedDateEnd=selectedDateStart=null

            
        }
        getDataFiltre()
    }
}

function displayDateInterval(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDate=document.querySelector('.date-specifique-container p')
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    var textDateValue=document.querySelector("#date-specifique-container span")
    

    if(!inputChoice.checked){
        dateIntervalContainer.style.display="none"
        textIntervalDate.style.color="#333"
        selectedDateStart=selectedDataEnd =null
        textDateIntervalValue[0]=textDateIntervalValue[1]=""
        textDateIntervalValue[0].innerText="debut"
        textDateIntervalValue[1].innerText="Fin"
        textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
        startDate.value=endDate.value=null // reset  input date
        selectedDateEnd=selectedDateStart=null
        

   

        getDataFiltre()
    }
    else{

        var inputDateSpecifique=document.getElementById("specifique-date")

        dateIntervalContainer.style.display="flex"
        dateSpecifiqueContainer.style.display="none"
        textIntervalDate.style.color="#000"
        textDate.style.color="#333"

        if(inputDateSpecifique.checked){
            inputDateSpecifique.checked=false
            textDateValue.innerText="Date"
            textDateValue.style.color="#333"
            date.value=null
            selectedDate=null
            
            
        }
        getDataFiltre()
    }
}

function dateLimit(){  //definir une limite de date 

    date.setAttribute("min","2012-01-01") //limiter le choix de la date 
    date.setAttribute("max","2020-01-01")
    dateStart.setAttribute("min","2012-01-01") //limiter le choix de la date 
    dateStart.setAttribute("max","2020-01-01")
    dateEnd.setAttribute("min","2012-01-01") //limiter le choix de la date 
    dateEnd.setAttribute("max","2020-01-01")
}

function nomRegions() {
    // URL de l'API récupérant les noms des régions
    var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=reg_name";

    // Récupération des regions de l'API
    fetch(apiUrl1)
      .then(response => response.json()) // Convertit en objet JSON les données récupérées
      .then(data => {

        var region = data.facet_groups[0].facets; //variable region contenant les données récupérées

        region.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
        regionSelect.children[1].innerHTML="";
        regionSelect.children[1].append(createList("toutes les regions"))
        region.forEach(region => {

            if (region.name !== "Mayotte" && region.name !== "Guadeloupe" && region.name !== "Martinique" && region.name !== "Guyane" && region.name !== "La Réunion"){ //Enlever les regions d'outre mer
                var option = createList(region.name)

                regionSelect.children[1].append(option);
            }
        });
        addEventRegion()
      })
      .catch(console.log("erreur de fetch")) //gerer les erreurs
}

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
            departementSelect.children[1].innerHTML=""; // suppression des options précédentes
            departementSelect.children[1].append(createList("tous les departements"))
            departement.forEach(departement => {
                if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La Réunion"){ //Enlever les departements d'outre mer

                    var option = createList(departement.name)

                    departementSelect.children[1].append(option);
                }
            });
            addEventDepartement()
          })
          .catch(console.log("erreur de fetch")) //gerer les erreurs
}

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
            villeSelect.children[1].innerHTML=""  // Suppression des options prÃ©cÃ©dentes
            villeSelect.children[1].append(createList("toutes les villes"))
			ville.forEach(ville => {
				var option = createList(ville.name)

				villeSelect.children[1].append(option);
			})
            addEventVille()
	    })
        .catch(console.log("erreur de fetch")) //gerer les erreurs
}


//reset date/interval date

function resetDate(){
    var resetBtn = document.querySelector('input[type="reset"]');
    resetBtn.addEventListener("click",()=>{
        var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
        var dateIntervalContainer=document.getElementById("date-interval-container")

        dateSpecifiqueContainer.style.display="none"
        dateIntervalContainer.style.display="none"
    })
}
