listAccidentCorse=[]
async function getAccidentCorse(){
    ;
    for(var i=0;i<3;i++){
        var api="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=1200&start="+
        i*1200+"&refine.dep=20";
        try{
            var res=await fetch(api);
            var data=await res.json();
            for(var j=0;j<data.records.length;j++){
                var lat=data.records[j].fields.coordonnees[0];
                if(lat>=41.392971&&lat<=42.958039){
                    listAccidentCorse.push(data.records[j]);
                }
            }
        }
        catch{
            console.log("Erreur");
        }
        console.log(listAccidentCorse);
    }
}

//plus grande lat= 42.958039
//plus petite lat=41.392971
