const selectBtn = document.querySelector(".select-btn"),
    items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});
items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
    });
}) 






//Initialisation de la carte
var map=L.map("map",{
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: 'topright'},
    wheelDebounceTime:0,
    wheelPxPerZoomLevel:50,
    minZoom:5,
}).setView([48.862725, 2.287592],5);
var contenu=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);



L.Control.geocoder().addTo(map);  //ajouter une barre de recherche

L.control.scale({   //ajouter les dimensions de la carte 
    metric:true,
    imperial:true,
    maxwidth:100,
    position:"bottomleft"
}).addTo(map)

// Close and clear searchbox 600ms after pressing ENTER in the search box
searchbox.onInput("keyup", function (e) {
    if (e.keyCode == 13) {
        setTimeout(function () {
            searchbox.hide();
            searchbox.clear();
        }, 600);
    }
});

// Close and clear searchbox 600ms after clicking the search button
searchbox.onButton("click", function () {
    setTimeout(function () {
        searchbox.hide();
        searchbox.clear();
    }, 600);
});



  map.on('enterFullscreen', function(){    
    if(window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function(){
    if(window.console) window.console.log('exitFullscreen');
});

 

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

