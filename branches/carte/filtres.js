var listAccidentFiltre=[]

var listAccidentDate=[]
var choix_date=(document.getElementById("choix-date")).value;

var listAccidentDepartement=[]
var choix_departement=(document.getElementById("departement")).value;

function getDataFiltre(){
    listAccidentDate=[];
if(choix_date=="date-specifique"){
    for(var i=0;i<listAccident.length;i++){
        if((listAccident[i].fields.datetime).substring(0,9)==selectedDate){
            listAccidentDate.push(listAccident[i]);
        }
    }
}
else if (choix_date=="intervalle-dates"){ //Comment comparer des dates ? AAAA-MM-JJ 
    for(var i=0;i<listAccident.length;i++){
}
}

listAccidentDepartement=[]
if(selectedDepartement)
       for(var i=0;i<listAccident.length;i++){
        if(selectedDepartement==listAccident[i].fields.dep_name){
            listAccidentDepartement.push(listAccident[i]);   
        }
       } 
}


function selectDataFiltre(){
    if(!choix_departement||choix_departement=="allDepartements"){
        listAccidentDepartement=listAccident;
    }
    if(choix_date==""){
        listAccidentDate=listAccident;
    }
    listAccidentFiltre=listAccidentDate.filter(x=>listAccidentDepartement.includes(x));
}