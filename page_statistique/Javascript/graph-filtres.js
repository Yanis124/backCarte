// recuperer les donées a mettre dans le graphe,recuperer la valeur des differents filtres


const colonneSelect=document.getElementById("graph-select")
const xSelect =document.getElementById("axe-x")
const lieuSelect=document.getElementById("lieu-select")
const anneeGraphSelect=document.getElementById("annee-graph-select")


var label=[] //la legende des graphes
var datas=[] //chaque liste represente un type de donnée datetime,atm ,sex,an-nais, grav,lum
var chart  //des variables globales qui contiennent le graphe l'annee le lieu l'axe-x
var inputAnneeGraph
var inputLieu
var typeChart
var inputValueX="datetime"
var listAnneeLieu=[]


var apiGraphLieu="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=reg_name" //toutes les régions

var apiGraphAnnee="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=datetime&refine.reg_name=" 

var apiGraphToutesAnnee="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=datetime"



async function DrawFiltreLieu(){  //recuperer toutes les régions
    try{
        var res=await fetch(apiGraphLieu)  
        var data=await res.json()
        var listRegion=data.facet_groups[0].facets
        console.log(listRegion)
    }
    catch{
        // console.log("erreur")
    }
    for(var i=0;i<listRegion.length;i++){
        lieuSelect.innerHTML+="<option>"+listRegion[i].name+"</option>"
    }

}

async function DrawFiltreAnnee(){  // mettre a jour le filtre année (secondaire) pour qu'il affiche que les années correspendant a un lieu
                                      //par exemple l'api n'a pas les données de l'Aquitaine pour l'année 2013 donc on ne propose pas 2013 dans le filtre annee

    if(anneeGraphSelect.childElementCount>0){
        anneeGraphSelect.innerHTML="<select  name='annee' onchange='getAnnee()' id='annee-graph-select'></select>"
        anneeGraphSelect.innerHTML+="<option value='toutes-les-annees'>"+"toutes les années"+"</option>"
    }
    
    if(inputLieu && inputLieu !="tous-les-lieux"){ //on recupere les années de la region selectionée
        try{                                              
            var res=await fetch(apiGraphAnnee+inputLieu)
            var data=await res.json()
        }
        catch{
            console.log("erreur")
        }
        listAnneeLieu=data.facet_groups[0].facets
        //console.log(listAnnee)


        for(var i=0;i<listAnneeLieu.length;i++){
            anneeGraphSelect.innerHTML+="<option value="+listAnneeLieu[i].name+">"+listAnneeLieu[i].name+"</option>"
        }
    

    }
    else{
        try{                                              
            var res=await fetch(apiGraphToutesAnnee)
            var data=await res.json()
        }
        catch{
            console.log("erreur")
        }

        listAnneeLieu=data.facet_groups[0].facets


        for(var i=0;i<listAnneeLieu.length;i++){
            anneeGraphSelect.innerHTML+="<option value="+listAnneeLieu[i].name+">"+listAnneeLieu[i].name+"</option>"
        }


    }
}






function getValueColonne(){  //recuperer le type de graph choisi
    typeChart = colonneSelect.value
    
    selectColonne()   //changer le type de graph 
    
}

function getValueX(){    //recuperer la donnée a afficher

    inputValueX=xSelect.value

    
                                          
    if(inputAnneeGraph || inputLieu){  //initialiser les filtres secondaires
        if(inputLieu){
            inputLieu=null
            initLieuSelect()
        }
        if(inputAnneeGraph){
            inputAnneeGraph=null
            initAnneeSelect()
        }
        
    }

    getData()  //recuperer les données

}

function getAnnee(){
    inputAnneeGraph=anneeGraphSelect.value
    
    getData() //mettre a jour les données
}

function getLieu(){
    inputLieu=lieuSelect.value
    inputAnneeGraph="toutes-les-annees" //mettre a 0 le filtre annee (secondaire) si on change de lieu

    DrawFiltreAnnee()  //afficher que les années durant lequelles on a des données pour un lieu
    


    getData() //mettre a jour les données
}


//recuperer les données et affichier le graph

getData()  
DrawFiltreLieu()





        

