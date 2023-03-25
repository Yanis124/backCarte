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


function creer_marqueur(latitude,longitude,donnees,indice){
    var contenu_popup=latitude+","+longitude+"\n";
    contenu_popup+=donnees.records[indice].recordid;
    L.marker([latitude,longitude],{
        riseOnhover:true,
    }).bindPopup(contenu_popup).addTo(map)
}

async function creations_marqueur(){
    var res1=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1&facet=nom_com");
    var data1=await res.json();
    var liste_communes=data1.facet_groups[0].facets;

    var res=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=10000&refine.nom_com=Nice");
    var data=await res.json();
    for(var i=0;i<data.records.length;i++){
        try{
            var a=data.records[i].geometry.coordinates[0]; 
            var b=data.records[i].geometry.coordinates[1];
            creer_marqueur(b,a,data,i);
        }
        catch{
            console.log("Couldn't find coordinates");
        }
    }
}
creations_marqueur();


