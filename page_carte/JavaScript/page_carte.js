var zoom=10


var carIcon = new L.Icon({ //modifier le marqueur
    iconUrl: '../images/marker.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var map
var locationBase=[48.862725, 2.287592]


function initMap(){  //Initialisation de la carte
    map=L.map("map",{
        fullscreenControl: true,
        fullscreenControlOptions: {
        position: 'topright'},
        wheelDebounceTime:0,
        wheelPxPerZoomLevel:50,
        minZoom:5,
    }).setView(locationBase,8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    

    
    L.control.scale({   //ajouter les dimensions de la carte 
        metric:true,
        imperial:true,
        maxwidth:100,
        position:"bottomleft"
    }).addTo(map)

    map.on('zoom', ()=> {
        zoom=map.getZoom()
    })

    
}








var listMarkerCluster=[]


function removePin(){  //supprimer tous les marqueurs

    listMarkerCluster.forEach(element => {
        element.clearLayers()
    });
    listMarkerCluster=[]


    
    
}




 
//Fonction pour créer un marqueur ainsi que le contenu de son popup.
//On peut rajouter plein d'options aux marqueurs et aux popups. A voir dans la documentation.


async function createPin(){

    loadCarte()
    loadFiltre()

    
    if(!filtre){ //on afficher tous les pin si on ne filtre pas
        var list=listAccident
        if(list.length<=0){
            await getAccident()
        }
        
    }
    else{   //sinon ceux qui sont filtres
        var list=listAccidentFiltre
    }


    


    const record=50000
    const waitingTime=2000
    let a
    let b
    let marker
    let pop


    for(let j=0; j<~~(list.length/record)+1;j++ ){   //create a list of markerclusters
        listMarkerCluster.push(new L.markerClusterGroup( { animate: true,animateAddingMarkers: true}) )
    }
    

    
    let markers=[]
    for (let i = 0; i < 100000; i++) {
          
        try {
            a = list[i].fields.coordonnees[0];
            b = list[i].fields.coordonnees[1];
            marker = L.marker([a, b], { icon: carIcon });
            pop = popUp(list, i);
            marker.bindPopup(pop);
            markers.push(marker)
            listMarkerCluster[~~(i/record)].addLayers(marker);
            if(i%record==0){  //add only 100000 markers at once 
                
                
                
                map.addLayer(listMarkerCluster[~~(i/record)-1]);
                loadCarte()
                await new Promise(r => setTimeout(r, waitingTime)); //sleep(2) 
                workCarte() 
                
            }
            
            
            else if(i==(list.length -2) && (i%record!=0)){ //add the rest of the markers
                
                
                map.addLayer(listMarkerCluster[~~(i/record)]);
                loadCarte
                await new Promise(r => setTimeout(r, waitingTime)); 

               
            }
            

        } 
        catch (error) {
            console.log("Couldn't find coordinates");
        }
    }

    workCarte()
    workFiltre()

    try{

        if(selectedRegion || selectedDepartement || selectedVille){ //center the map to a specific location if a region | dep | ville is selected

            setViewUser(list[0].fields.coordonnees)
        }
    }
    catch{
        console.log("couldn't find coordinates")
    }

    
    

    

    
}

function setViewUser(listCoordonnees){   //center the map to a specific location
    console.log(listCoordonnees)
    map.setView(listCoordonnees,zoom, {  //make the animation smooth 
        "animate": true,
        "pan": {
          "duration": 1
        }})
}


