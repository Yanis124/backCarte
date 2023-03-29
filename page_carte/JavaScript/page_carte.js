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
    });
});  
items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
});

var greenIcon = new L.Icon({ //modifier le marqueur
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


function removeMap(){
    map.off()
    map.remove()
}












 

//Fonction pour créer un marqueur ainsi que le contenu de son popup.
//On peut rajouter plein d'options aux marqueurs et aux popups. A voir dans la documentation.


async function createPin(){
    initMap()
    loadCarte()
    //loadFiltre()
    //console.log(listAccidentFiltre.length)
    var markerCluster = new L.markerClusterGroup( { animate: true,animateAddingMarkers: true});  //créer un marqueurcluster pour regrouper les marqueurs
    if(!filtre){ //on afficher tous les pin si on ne filtre pas
        await getAccident()
        var list=listAccident
    }
    else{   //sinon ceux qui sont filtres
        var list=listAccidentFiltre
    }
        
    for(var i=0;i<list.length;i++){
        try{
                    var a=list[i].fields.coordonnees[0]; 
                    var b=list[i].fields.coordonnees[1];
                    var marker=L.marker([a,b],{icon: greenIcon})
                    var pop=L.popup({content:"<h1> numero d'accident : "+list[i].fields.num_acc+"</h1> "+ //numero d'accident
                    "<p style='font-size:15px;color:#1b6698';>"+"<span style=' font-size:15px ;font-weight: 700;'>"+list[i].fields.jour+"/"+list[i].fields.mois+"/"+list[i].fields.an+", "+ //date et l'heure
                    list[i].fields.hrmn+"</span>"+"</p>"+
                                "<ul style='display:flex;flex-direction:column; padding:0'>"+
                            "<li style='font-size:15px;color:#1b6698';>"+"adresse: "+"<span style='font-size:15px;font-weight: 700';>"+list[i].fields.adr+"</span>"+"</li>"+
                        "<li style='font-size:15px;color:#1b6698;'>"+"Condition Atmosphériques: "+"<span style= 'font-size:15px; font-weight: 700;'>"+list[i].fields.atm+"</span>"+"</li>"+
                        "<li style='font-size:15px;color:#1b6698;'>"+"lumiere: "+"<span style= 'font-size:15px; font-weight: 700;'>"+list[i].fields.lum+"</span>"+"</li>"+"</ul>"
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
    workFiltre()
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
       
        
    
        note[i].style.backgroundColor = "black"
        note[i].style.fontSize="10px"
        
        note[i].style.fontSize="20px"
        note[i].style.padding="15px"
        
        note[i].style.borderRadius="70px"
        note[i].style.borderColor="white"
        note[i].style.borderWidth="2px"
        note[i].style.borderStyle="solid"

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

