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