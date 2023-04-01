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
    const date_debut=new Date(selectedDateStart);
    const date_fin=new Date(selectedDateEnd);
    for(var i=0;i<listAccident.length;i++){
        var date_accident=new Date((listAccident[i].fields.datetime).substring(0,9));
        if(date_debut.getTime()<=date_accident.getTime()&&date_fin.getTime()>=date_accident.getTime()){
            listAccidentDate.push(listAccident[i]);
        }
}
}

listAccidentDepartement=[]
if(selectedDepartement){

       for(var i=0;i<listAccident.length;i++){
        if(selectedDepartement==listAccident[i].fields.dep_name){
            listAccidentDepartement.push(listAccident[i]);   
        }
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
    listAccidentFiltre=listAccidentFiltre.filter(x => listAccidentDate.includes(x));
    listAccidentFiltre=listAccidentFiltre.filter(x => listAccidentDepartement.includes(x));

}