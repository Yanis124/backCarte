function popUp(list,i){  //Créer les popups
    //les informations de l'accident
    if (i < 0 || i >= list.length) {
        return null; // Return null if i is out of bounds
    }
    var idAccident=popUpData(list[i].fields.num_acc)
    var day=popUpData(list[i].fields.jour)
    var month=popUpData(list[i].fields.mois)
    var year=popUpData(list[i].fields.an)
    var time=popUpData(list[i].fields.hrmn)
    var adress=popUpData(list[i].fields.adr)
    var atm=popUpData(list[i].fields.atm)
    var lum=popUpData(list[i].fields.lum)
    var grav=popUpData(list[i].fields.grav)
    



    //le style des popup
    var colorText="#1b6698"
    var fontSize="15px"
    var fontSizeTitle="17px"
    var fontWeigth="700"
    
    var pop=L.popup({content:"<h1 style='font-size:"+fontSizeTitle+";'>"+"numero d'accident: "+idAccident+"</h1>"//numero d'accident
    +"<p style='font-size:"+fontSize +";color:"+colorText+"'>"+"<span style='font-size:"+fontSize +";font-weight:"+fontWeigth+";'>"+day+"/"+month+"/"+year+", " //date et l'heure
    +time+"</span>"+"</p>"
    +"<ul style='display:flex;flex-direction:column; padding:0;align-items:start;'>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Adresse: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+adress+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Condition atmosphérique: "+"<span style='font-size:+"+fontSize+";font-weight:"+fontWeigth+";'>"+atm+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Lumiere: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+lum+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Gravité: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+displaydata(grav)+"</span> </li>"
    +"</ul>"
    }) 
    //console.log(pop)
    return pop
}

 function popUpData(data){   //si la donnée n'est pas disponible dans l'api 
    var message="Indisponible"
    if(data=="undefined" || data===null){
        return message
    }
    else{
        return data
    }
}

function displaydata(data){
    if (typeof data !== 'string') {
        return data;
    }
    var arr = data.split(','); // split the string by comma delimiter
    if(arr.length>3){
        var fourth = arr.slice(0, 3);
        var leftArr=arr.slice(3,arr.length)
        var result=""
        fourth.forEach(element => {
            result+=element+","
        });
        result+=" "
        leftArr.forEach(element=>{
            result+=element+","            
        })

        return result
        
    }

    else{
        return data
    }  
}

module.exports = popUp