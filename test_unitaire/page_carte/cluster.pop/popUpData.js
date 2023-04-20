function popUpData(data){   //si la donnée n'est pas disponible dans l'api 
    var message="Indisponible"
    if(typeof data==="undefined" || data===null){
        return "Indisponible"
    }
    else{
        return data
    }
}
module.exports = popUpData