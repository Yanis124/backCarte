

var apiGraphX="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet="



async function getData(){  //recuperer les données datetime, atm ,atm ,an-nais ,sexe, grav et creer le graph

    loadGraph() //afficher l'annimation

    if(inputLieu && inputAnneeGraph && inputAnneeGraph!="toutes-les-annees" && inputLieu!="tous-les-lieux"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.datetime="+inputAnneeGraph+"&refine.reg_name="+inputLieu) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur

        }
    }

    else if(inputLieu && (!inputAnneeGraph || inputAnneeGraph=="toutes-les-annees") && inputLieu!="tous-les-lieux"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.reg_name="+inputLieu) //ajouter le filtre lieu a l'api
        
            var data=await res.json()
            
        }
        catch(error){
            erreurGraph() //afficher une erreur

        }
    }
    
    else if(inputAnneeGraph &&(!inputLieu || inputLieu=="tous-les-lieux") && inputAnneeGraph!="toutes-les-annees"){ //si l'utilisateur rentre une annee
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.datetime="+inputAnneeGraph) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur

        } 
    }

    else{ //si l'utilisateur ne choisit pas d'année ni de lieu ou "toutes les années et tous les lieus"
        try{
            var res=await fetch(apiGraphX+inputValueX)
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //afficher une erreur
        }
    }

    console.log(data)

    
    workGraph() //les données ont bien été récuperé


        datas=[] //réinitialiser la liste datas et label 
        label=[]

        if(data.facet_groups[0].name=="an_nais"){
            regroupeAge(data.facet_groups[0].facets) //regrouper les tranches d'age
        }
        else if(data.facet_groups[0].name=="lum"){
            regroupeLum(data.facet_groups[0].facets) //regrouper en jour/nuit
        }
        else{
            for(var i=0;i<data.facet_groups[0].facets.length;i++){
                datas.push(data.facet_groups[0].facets[i].count)
                label.push(data.facet_groups[0].facets[i].name)
            }
        }
    console.log(datas)

    updateTitles() //mettre à jour les titres des graphes 


    if(!chart){
        chart=courbe() //créer le graphe s'il n'existe pas
    }
    //console.log(datas)
    
    //selectX() //creer le graphe en choisissant son type et ses données

    selectData()  //mettre les données dans le graphe

    selectX()    //selectionner le type de graphe par defaut
        
}


function selectX(){  //selectionner le type de graphe (par defaut date=>courbe sexe=>camembert ....) et les données 
    //console.log(inputValueX)
    if(inputValueX==facets[0]){
        if(!typeChart){ //si l'utilisateur n'a pas choisi de type de graphe on affiche le type par defaut
            selectColonne("courbe")

        } 
        colonneSelect.value="courbe";
        
    }
    else if(inputValueX==facets[1]|| inputValueX==facets[2]){

        if(!typeChart){
            selectColonne("colonne")
            
        } 
        colonneSelect.value="colonne";
    }

    else if(inputValueX==facets[3]|| inputValueX==facets[4] || inputValueX==facets[5]|| inputValueX==facets[6] || inputValueX==facets[7]|| inputValueX==facets[8]){
        if(!typeChart){
            selectColonne("camembert")  
        }
        colonneSelect.value="camembert";

    }
}
    
