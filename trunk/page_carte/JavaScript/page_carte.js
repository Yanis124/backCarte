

var carIcon = new L.Icon({ //modifier le marqueur
    iconUrl: '../images/marker.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var map


function initMap(){  //Initialisation de la carte
    map=L.map("map",{
        fullscreenControl: true,
        fullscreenControlOptions: {
        position: 'topright'},
        wheelDebounceTime:0,
        wheelPxPerZoomLevel:50,
        minZoom:5,
    }).setView([48.862725, 2.287592],5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    

    
    L.control.scale({   //ajouter les dimensions de la carte 
        metric:true,
        imperial:true,
        maxwidth:100,
        position:"bottomleft"
    }).addTo(map)

    
}


function removePin(){  //supprimer tous les marqueurs
    markerCluster.clearLayers()
}

markerCluster = new L.markerClusterGroup( { animate: true,animateAddingMarkers: true});  //créer un marqueurcluster pour regrouper les marqueurs


 
//Fonction pour créer un marqueur ainsi que le contenu de son popup.
//On peut rajouter plein d'options aux marqueurs et aux popups. A voir dans la documentation.


async function createPin(){

    
    
    loadCarte()
    // loadFiltre()
    //console.log(listAccidentFiltre.length)
    markerCluster = new L.markerClusterGroup( { animate: true,animateAddingMarkers: true});  //créer un markercluster pour regrouper les marqueurs
    if(!filtre){ //on afficher tous les pin si on ne filtre pas
        var list=listAccident
        if(list.length<=0){
            await getAccident()
        }
        
    }
    else{   //sinon ceux qui sont filtres
        var list=listAccidentFiltre
    }

    var deb=Date.now()
    
    var i=0
    for (var item of list) {
        try {
          var a = item.fields.coordonnees[0]; 
          var b = item.fields.coordonnees[1];
          const marker = L.marker([a, b], { icon: carIcon }); // create a marker
          const pop = popUp(list, i);
          i=i+1
          marker.bindPopup(pop); // add the popup to the marker
          markerCluster.addLayer(marker); // add the marker to the markerCluster
        } catch (error) {
          console.log("Couldn't find coordinates");
        }
      }
      
      map.addLayer(markerCluster); // add the markerCluster to the map
      
   
    workCarte()   //enlever l'annimation de chargement
    //workFiltre()  
    var fin=Date.now()

    console.log(`draw pin time : ${ fin-deb} ms`)
}


//Lors changement de region le departement selectionnné revient a -- selectionner
function resetDepartement() {
    document.getElementById("departement").selectedIndex = 0;
    resetVille();
}

