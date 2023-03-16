// recuperer les donées et afficher les graphs
color_bar=["#003f5c"]
color_pie=["#003f5c","#f95d6a","#2f4b7c","#665191","#a05195","#d45087","#ff7c43","#ffa600"]

const colonneSelect=document.getElementById("graph-select")
const xSelect =document.getElementById("axe-x")
const annee=document.getElementById("annee")
const lieu=document.getElementById("lieu")


var mois=["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"]
var label=[[],[],[],[],[],[]] //la legende des graphs
var datas=[[],[],[],[],[],[]] //chaque list represente un type de donnée datetime,atm ,sex,an-nais, grav,lum
var titlesExemple=["nombre d'accident par année","nombre d'accident par région","nombre d'accicent par département","nombre d'accident par conditions métérologique","nombre d'accident par sexe","nombre d'accident par année de naisance","nombre d'accident par gravité de l'accident","nombre d'accident jour/nuit"] //titre des graphs (exemple par default)
var chart  //des variables globale qui contient le graph l'anne le lieu
var inputAnnee
var inputLieu
var typeChart





var api="https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=datetime&facet=reg_name&facet=dep_name&facet=atm&facet=sexe&facet=an_nais&facet=grav&facet=lum" //regrouper le nombre d'accident par date/atm/sexe/année naissance/gravité/lumiere


async function getData(){  //recuperer les données datetime, atm ,atm ,an-nais ,sex, grav et creer le graph

    load()

    if(inputLieu && inputAnnee && inputAnnee!="toutes-les-annees" && inputLieu!="tous-les-lieus"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(api+"&refine.datetime="+inputAnnee+"&refine.reg_name="+inputLieu) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreur()

        }
    }

    else if(inputLieu && (!inputAnnee || inputAnnee=="toutes-les-annees") && inputLieu!="tous-les-lieus"){ //si l'utilisateur rentre annee
        try{
            var res=await fetch(api+"&refine.reg_name="+inputLieu) //ajouter le filtre lieu a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreur()

        }
    }
    
    else if(inputAnnee &&(!inputLieu || inputLieu=="tous-les-les lieus") && inputAnnee!="toutes-les-annees"){ //si l'utilisateur rentre une annee
        try{
            var res=await fetch(api+"&refine.datetime="+inputAnnee) //ajouter le filtre année a l'api
        
            var data=await res.json()
        }
        catch(error){
            erreur()

        } 
    }

    else{ //si l'utilisateur ne choisit pas d'année ou il choisit toutes les années
        try{
            var res=await fetch(api)
        
            var data=await res.json()
        }
        catch(error){
            erreur()
        }
    }

    //les données ont bien été récuperer
    
    work()
    
    for(var n=0;n<data.facet_groups.length;n++){
        datas[n]=[] //renitialiser la liste datas et label 
        label[n]=[]
        if(data.facet_groups[n].name=="an_nais"){
            regroupeAge(data.facet_groups[n].facets,n)
        }
        else if(data.facet_groups[n].name=="lum"){
            regroupeLum(data.facet_groups[n].facets,n)
        }
        else{
            for(var i=0;i<data.facet_groups[n].facets.length;i++){
                if(data.facet_groups[n].facets[i].facets){ //si l'utilisateur selectionne une date on affiche le nombre d'accident par moi
                    
                    for(var j=0;j<data.facet_groups[n].facets[0].facets.length;j++){ 
                        datas[n].push(data.facet_groups[n].facets[0].facets[j].count)
                        label[n].push(mois[j]) //au lieu d'ecrire 1 on ecrit janvier 
                    }  
                }
            

                else{            
                    datas[n].push(data.facet_groups[n].facets[i].count)
                    label[n].push(data.facet_groups[n].facets[i].name)
        
                }
                
            }
        }
    }

    updateTitles(inputAnnee) //mettre a jour les titres des graphs si l'utilisateur entre une année
      //afficher le nombre d'accident par année graph par default

    if(!chart){
        chart=courbe() //creer le graph si il n'existe pas
    }
    
    getValueX() //recuperer la valeur de axe-x et executer la fonction selecX qui va appeler la fonction selectColonne( pour rafrechir le graph avec les nouvelle donnée)
        
}
    
function updateTitles(){
    titles=[]//renitialiser les titres sinon on aura exemple : titre "nombre d'accident par année 2018 2019 2012" 
    for(var i=0;i<titlesExemple.length;i++){
        titles[i]=titlesExemple[i]
    }
    if(inputAnnee && inputAnnee!="toutes-les-annees"){ //ajouter l'année 
        for(var i=0;i<titlesExemple.length;i++){
            titles[i]=titles[i]+" "+inputAnnee
        }
    }
    if(inputLieu && inputLieu!="tous-les-lieus"){ //ajouter l'année 
        for(var i=0;i<titlesExemple.length;i++){
            titles[i]=titles[i]+" "+inputLieu
        }
    }
    
}


function getValueColonne(){  //recuperer le type de graph choisit
    typeChart = colonneSelect.value
    selectColonne()
    
}

function getValueX(inputAnnee){    //recuperer la donnée a afficher
    var inputValueX=xSelect.value
    selectX(inputValueX)
}

function getAnnee(){
    inputAnnee=annee.value
    getData() //mettre a jour les données
}

function getLieu(){
    inputLieu=lieu.value
    getData()
}





function selectX(inputValueX){  //selectionner le type de graph(par defaut date=>courbe sexe=>camembert ....) et les données 
    if(inputValueX=="date"){
        selectData(1,1)
        if(!typeChart){
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
        console.log(typeChart) 
        if(!typeChart){
            
            selectColonne("camembert")
           
        }

    }
    
}

function selectData(n_data,n_label){

    //mettre a jour les données du graph
    chart.data.labels=label[n_label-1]
    chart.data.datasets[0].data=datas[n_data-1]
    chart.options.plugins.title.text=titles[n_label-1]
    chart.update()
}

function selectColonne(inputChart){ //changer  le type de graph
    
    //si l'utilisateur choisir un type de graph (colonne)
    if(inputChart=="colonne" || typeChart=="colonne"){ //type de graph par defaut ou changer le type des graph par le filtre colonne
        
        chart.config.type="bar"
        chart.options.scales.x.display=true
        chart.options.scales.y.display=true
        chart.data.datasets[0].backgroundColor=color_bar
        chart.update() //mettre a jour la chart 
    }

    else if(inputChart=="camembert" || typeChart=="camembert"){
        
        chart.config.type="pie"
        chart.options.scales.x.display=false
        chart.options.scales.y.display=false
        chart.data.datasets[0].backgroundColor=color_pie
        chart.update()
    }

    else if(inputChart=="courbe" || typeChart=="courbe"){ 
        //chart=courbe()
        chart.config.type="line"
        chart.options.scales.x.display=true
        chart.options.scales.y.display=true
        chart.data.datasets[0].borderColor='rgb(255, 99, 132)'
        chart.data.datasets[0].backgroundColor='rgb(255, 200, 200)'
        chart.update()
    }
    
}

function courbe(){  //generer la courbe avec les données par default
    var chart =new Chart(canvas, configLine);
    chart.data.labels=label[0]
    chart.data.datasets[0].data=datas[0]
    chart.update()
    return chart
}


//recuperer les données et affichier la charte

getData()  





        

