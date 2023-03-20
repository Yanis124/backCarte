// recuperer les donées a mettre dans le graph,recuperer la valeur des diferent filtres


const colonneSelect=document.getElementById("graph-select")
const xSelect =document.getElementById("axe-x")
const lieuSelect=document.getElementById("lieu-select")
const anneeGraphSelect=document.getElementById("annee-graph-select")

var listRegion=[]
var listAnnee=[]
var label=[] //la legende des graphs
var datas=[] //chaque list represente un type de donnée datetime,atm ,sex,an-nais, grav,lum
var chart  //des variables globale qui contient le graph l'anne le lieu l'axe-x
var inputAnneeGraph
var inputLieu
var typeChart
var inputValueX="année"

var apiGraphLieu="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=reg_name" 

var apiGraphAnnee="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=datetime&refine.reg_name=" 

var apiGraph="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=datetime&facet=reg_name&facet=dep_name&facet=atm&facet=sexe&facet=an_nais&facet=grav&facet=lum" //regrouper le nombre d'accident par date/atm/sexe/année naissance/gravité/lumiere

async function DrawFiltreLieu(){  //recuperer toutes les régions
    try{
        var res=await fetch(apiGraphLieu)  
        var data=await res.json()
        listRegion=data.facet_groups[0].facets
        console.log(listRegion)
    }
    catch{
        // console.log("erruer")
    }
    for(var i=0;i<listRegion.length;i++){
        lieuSelect.innerHTML+="<option>"+listRegion[i].name+"</option>"
    }

}

async function DrawFiltreAnnee(){  // mettre a jour le filtre année (secondaire) pour qu'il affiche que les années correspendant a un lieu
                                      //par exemple l'api n'a pas les données de l'Aquitaine pour l'année 2013 donc on ne propose pas 2013 dans le filtre annee
    
    if(inputLieu && inputLieu !="toute-les-lieus"){ //on recupere les années de la region selectionée
        try{                                              
            var res=await fetch(apiGraphAnnee+inputLieu)
            var data=await res.json()
        }
        catch{
            // console.log("erreur")
        }
        listAnnee=data.facet_groups[0].facets
        console.log(listAnnee)

        if(anneeGraphSelect.childElementCount>0){
            anneeGraphSelect.innerHTML="<select  name='annee' onchange='getAnnee()' id='annee-graph-select'></select>"
        }

        anneeGraphSelect.innerHTML+="<option value='toutes-les-annees'>"+"toutes les années"+"</option>"

        for(var i=0;i<listAnnee.length;i++){
            anneeGraphSelect.innerHTML+="<option value="+listAnnee[i].name+">"+listAnnee[i].name+"</option>"
        }
    }
    else{  //si on choisis toutes les annees on doit afficher 2011-2019 dans le filtre année(secondaire)
        var n=2011
        

        if(anneeGraphSelect.childElementCount>0){
            anneeGraphSelect.innerHTML="<select  name='annee' onchange='getAnnee()' id='annee-graph-select'></select>"
        }

        anneeGraphSelect.innerHTML+="<option value='toutes-les-annees'>"+"toutes les années"+"</option>"

        for(var i=0;i<9;i++){
            anneeGraphSelect.innerHTML+="<option value="+(n+i)+">"+(n+i)+"</option>"
        }
    }
    
}





async function getData(){  //recuperer les données datetime, atm ,atm ,an-nais ,sex, grav et creer le graph

    loadGraph() //afficher l'annimation

    if(inputLieu && inputAnneeGraph && inputAnneeGraph!="toutes-les-annees" && inputLieu!="tous-les-lieus"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(apiGraph+"&refine.datetime="+inputAnneeGraph+"&refine.reg_name="+inputLieu) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur

        }
    }

    else if(inputLieu && (!inputAnneeGraph || inputAnneeGraph=="toutes-les-annees") && inputLieu!="tous-les-lieus"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(apiGraph+"&refine.reg_name="+inputLieu) //ajouter le filtre lieu a l'api
        
            var data=await res.json()
            
        }
        catch(error){
            erreurGraph() //afficher une erreur

        }
    }
    
    else if(inputAnneeGraph &&(!inputLieu || inputLieu=="tous-les-lieus") && inputAnneeGraph!="toutes-les-annees"){ //si l'utilisateur rentre une annee
        try{
            var res=await fetch(apiGraph+"&refine.datetime="+inputAnneeGraph) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur

        } 
    }

    else{ //si l'utilisateur ne choisit pas d'année ou il choisit toutes les années
        try{
            var res=await fetch(apiGraph)
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur
        }
    }

    
    workGraph() //les données ont bien été récuperer

    
    for(var n=0;n<data.facet_groups.length;n++){
        datas[n]=[] //renitialiser la liste datas et label 
        label[n]=[]
        if(data.facet_groups[n].name=="an_nais"){
            regroupeAge(data.facet_groups[n].facets,n) //regrouper les tranches d'age
        }
        else if(data.facet_groups[n].name=="lum"){
            regroupeLum(data.facet_groups[n].facets,n) //regrouper en jour/nuit
        }
        else{
            for(var i=0;i<data.facet_groups[n].facets.length;i++){
                datas[n].push(data.facet_groups[n].facets[i].count)
                label[n].push(data.facet_groups[n].facets[i].name)
            }
        }
    }

    updateTitles() //mettre a jour les titres des graphs 


    if(!chart){
        chart=courbe() //creer le graph si il n'existe pas
    }
    //console.log(datas)
    
    selectX() //creer le graphe en descident son type et ses données
        
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
        getData()
    }

    else{
        selectX()
    }

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






function selectX(){  //selectionner le type de graph(par defaut date=>courbe sexe=>camembert ....) et les données 
    console.log(inputValueX)
    if(inputValueX=="année"){
        selectData(1,1)
        if(!typeChart){ //si l'utilisateur n'a pas choisi de type de graph on affiche le type par defaut
            selectColonne("courbe")

        } 
        
    }
    if(inputValueX=="région"){


        selectData(2,2)
        if(!typeChart){
            selectColonne("colonne")
            
        } 
        
    }
    if(inputValueX=="département"){
        selectData(3,3)


        if(!typeChart){
            selectColonne("colonne")
            
        } 
        
    }
    else if(inputValueX=="conditions métérologiques"){
        selectData(4,4)
        if(!typeChart){
            selectColonne("camembert")  
        }


    }
    else if(inputValueX=="sexe"){
        selectData(5,5) 
        if(!typeChart){
            selectColonne("camembert")
            
        }

    }
    else if(inputValueX=="tranche d'age"){
        selectData(6,6) 
        
        if(!typeChart){
            selectColonne("camembert")
            
        }

    }
    else if(inputValueX=="gravité"){
        selectData(7,7) 
        if(!typeChart){
            selectColonne("camembert")
            
        }

    }
    else if(inputValueX=="jour/nuit"){
        selectData(8,8)
        if(!typeChart){
            selectColonne("camembert")
        }
    }
    
}




//recuperer les données et affichier la charte

getData()  
DrawFiltreLieu()





        

