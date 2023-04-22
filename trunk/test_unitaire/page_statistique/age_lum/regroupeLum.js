datas = []; // définir la variable globale datas ici
label = []; // définir la variable globale label ici
function regroupeLum(lumList){  //Regroup datas day/night and put them in the list
    var countsJour=0
    var countsNuit=0
    for(var i=0;i<lumList.length;i++){
        if(lumList[i].name=="Plein jour"){
            countsJour+=lumList[i].count
        }
        else{
            countsNuit+=lumList[i].count
        }
    }
    datas.push(countsJour)
    label.push("Jour")

    datas.push(countsNuit)
    label.push("Nuit")
}
module.exports = regroupeLum