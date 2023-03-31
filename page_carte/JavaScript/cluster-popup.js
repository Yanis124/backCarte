function regrouper(){ //Appliquer le style a tous les clusters

    
    const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
    const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
    const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")
    //selectionner les objets  a chaque fois qu'on zoom ou on dezoom des numeros apparaissent pour indiquer le nombre de marqueurs regrouper
    
   
    
        
    if(noteSmall.length>0){  
        
        style(noteSmall)
        
    }
    if(noteMedium.length>0){
        
        style(noteMedium)
        
    }
    if(noteLarge.length>0){
        
        style(noteLarge) 
       
    }
}

function style(note){   //ajouter du style aux clusters    
    for(var i=0;i<note.length;i++){  //iterer le tableau pour styler les elements
            var Div=note[i]
            var number=note[i].children[0].children[0]
            var numberDiv=note[i].children[0]
            //console.log(element)
            number.style.fontSize="17px"
            number.style.color = 'white'   

            numberDiv.style.display="flex"
            numberDiv.style.justifyContent="center"
        
       

            Div.style.display="flex"
            Div.style.justifyContent="center"
            Div.style.alignItems="center"
            Div.style.backgroundColor="black"
            Div.style.borderWidth="1px"
            Div.style.borderStyle="solid"
            Div.style.borderColor="white"
            Div.style.borderRadius="50px"
            Div.style.padding="10px"
        
        
        
    }

}  


function popUp(list,i){  //creer les popups
    //les informations de l'accident
    var idAccident=popUpData(list[i].fields.num_acc)
    var day=popUpData(list[i].fields.jour)
    var month=popUpData(list[i].fields.mois)
    var year=popUpData(list[i].fields.an)
    var time=popUpData(list[i].fields.hrmn)
    var adress=popUpData(list[i].fields.adr)
    var atm=popUpData(list[i].fields.atm)
    var lum=popUpData(list[i].fields.lum)
    var grav=popUpData(list[i].fields.grav)
    var dateRecord=popUpData(list[i].fields.record_timestamp)



    //le style des popup
    var colorText="#1b6698"
    var fontSize="15px"
    var fontSizeTitle="17px"
    var fontWeigth="700"
    
    var pop=L.popup({content:"<h1 style='font-size:"+fontSizeTitle+";'>"+"numero d'accident:"+idAccident+"</h1>"//numero d'accident
    +"<p style='font-size:"+fontSize +";color:"+colorText+"'>"+"<span style='font-size:"+fontSize +";font-weight:"+fontWeigth+";'>"+day+"/"+month+"/"+year+"," //date et l'heure
    +time+"</span>"+"</p>"
    +"<ul style='display:flex;flex-direction:column; padding:0'>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"adresse: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+adress+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Condition Atmosphériques: "+"<span style='font-size:+"+fontSize+";font-weight:"+fontWeigth+";'>"+atm+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"lumiere:"+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+lum+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Gravité:"+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+grav+"</span>"+"</li>"

    +"</ul>"
    }) 
    //console.log(pop)
    return pop
}

function popUpData(data){   //si la donnée n'est pas disponnible dans l'api 
    var message="indisponible"
    if(!data){
        return message
    }
    return data

}

setInterval(regrouper, 500)  //on appel la fonction regrouper tous les 500ms

