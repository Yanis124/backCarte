





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





  map.on('enterFullscreen', function(){    
    if(window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function(){
    if(window.console) window.console.log('exitFullscreen');
});

 

//Fonction pour créer un marqueur ainsi que le contenu de son popup.
//On peut rajouter plein d'options aux marqueurs et aux popups. A voir dans la documentation.


async function createPin(){
    loadCarte()
    await getAccident()
   var markerCluster = new L.markerClusterGroup();  //créer un marqueurcluster pour regrouper les marqueurs

    for(var i=0;i<listAccident.length;i++){
        try{
            var a=listAccident[i].fields.coordonnees[0]; 
            var b=listAccident[i].fields.coordonnees[1];
            var marker=L.marker([a,b])
            pop=L.popup({content:"<h1> numero d'accident : "+listAccident[i].fields.num_acc+"</h1> "+ //numero d'accident
                        "<p style='font-size:15px'>"+listAccident[i].fields.jour+"/"+listAccident[i].fields.mois+"/"+listAccident[i].fields.an+", "+ //date et l'heure
                        listAccident[i].fields.hrmn+"</p>"+
                    "<p style='font-size:15px'>"+"adresse: "+listAccident[i].fields.adr+"</p>"+
                "<p style='font-size:15px'>"+"Condition Atmosphériques: "+listAccident[i].fields.atm+"</p>"
            })  //adresse
            marker.bindPopup(pop)    //ajouter le popup
            markerCluster.addLayer(marker);
            
           
        }
        catch{
            console.log("couldn't find cordinnate")
        }
    }
   map.addLayer(markerCluster); //ajouter le cluster a la map
   workCarte()
}


function regrouper(){

    
    const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
    const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
    const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")
    //selectionner les objets  a chaque fois qu'on zoom ou on dezoom des numeros apparaissent pour indiquer le nombre de marqueurs regrouper
    
        
    if(noteSmall.length>0){  //note sont des tableaux d'element
        style(noteSmall)
    }
    if(noteMedium.length>0){
        style(noteMedium)
    }
    if(noteLarge.length>0){
        style(noteLarge) //appeler la fonction style
    }
}

function style(note){ 
    for(var i=0;i<note.length;i++){  //iterer le tableau pour styler les elements
       
        
    
        note[i].style.backgroundColor = 'gray'
        note[i].style.padding="15px"
        note[i].style.borderRadius="70px"
        note[i].style.color = 'white' 
        
        
    }

}  

function regrouper(){  //appliquer le style a tous les clusters

    
    const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
    const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
    const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")
    //selectionner les objets  a chaque fois qu'on zoom ou on dezoom des numeros apparaissent pour indiquer le nombre de marqueurs regrouper
    
        
    if(noteSmall.length>0){  //note sont des tableaux d'element
        style(noteSmall)
    }
    if(noteMedium.length>0){
        style(noteMedium)
    }
    if(noteLarge.length>0){
        style(noteLarge) //appeler la fonction style
    }
}

setInterval(regrouper, 500)  //on appel la fonction regrouper tous les 500ms


