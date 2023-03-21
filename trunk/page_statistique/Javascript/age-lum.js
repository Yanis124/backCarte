function regroupeAge(ageList,n){ //regrouper les tranches d'age et mettre les donnees dans la liste datas  0-18 18-60 +60 
    var countsSmall=0
    var countsMed=0
    var countsLarg=0
    for(var i=0;i<ageList.length;i++){

        if(ageList[i].name>=2002){    //0-17 
            countsSmall+=ageList[i].count
        }

        else if(ageList[i].name>=1960 && ageList[i].name<=2001){  //18-59
            countsMed+=ageList[i].count
        }

        else if(ageList[i].name<=1959){   //+61
            countsLarg+=ageList[i].count
            
        }

    }
    datas[n].push(countsSmall)
    label[n].push("0-17")
                            
    datas[n].push(countsMed)
    label[n].push("18-59")

    datas[n].push(countsLarg)
    label[n].push("+60")

}

function regroupeLum(lumList,n){  //regrouper les donnees jour/nuit et les mettre dans la liste datas
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
    datas[n].push(countsJour)
    label[n].push("Jour")

    datas[n].push(countsNuit)
    label[n].push("Nuit")


}