function regroupeAge(ageList,n){  //0-18 18-60 60-l'infinie
    var countsSmall=0
    var countsMed=0
    var countsLarg=0
    for(var i=0;i<ageList.length;i++){

        if(ageList[i].name>"2000"){
            countsSmall+=ageList[i].count
            console.log(ageList[i].name)
        }

        else if(ageList[i].name>"1960" && ageList[i].name<"2000"){
            countsMed+=ageList[i].count
        }

        else if(ageList[i].name<"1960"){
            countsLarg+=ageList[i].count
            
        }

    }
    datas[n].push(countsSmall)
    label[n].push("0-18")
                            
    datas[n].push(countsMed)
    label[n].push("18-60")

    datas[n].push(countsLarg)
    label[n].push("+60")

}

function regroupeLum(lumList,n){
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