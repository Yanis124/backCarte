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
function creer_marqueur(latitude,longitude){
    var contenu_popup=latitude+","+longitude;
    L.marker([latitude,longitude],{
        riseOnhover:true,
    }).bindPopup(contenu_popup).addTo(map)
}

var lat_long="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1000&facet=lat&facet=long&refine.datetime=2019";

async function get_lat_long(){
    var res=await fetch(lat_long);
    var data=await res.json();
    var lat=data.facet_groups[0].facets;
    var long=data.facet_groups[1].facets;
    console.log(lat);
    console.log(long);
    for(var i=0;i<10;i++){
        creer_marqueur(lat[i].name,long[i].name);
}
}

get_lat_long();

