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

async function creation_marqueur(){

    var res=await fetch("https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=1000&refine.an=2012");
    var data=await res.json();
    console.log(data);
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
creation_marqueur();
