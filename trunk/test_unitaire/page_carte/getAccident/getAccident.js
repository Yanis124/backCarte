const fs = require('fs')

var listAccident=[]

async function getAccident(){
   var data= fs.readFileSync('trunk/page_carte/Accidents.txt', 'utf8')

   const lines=data.split("\n")
   for(let i=0;i<lines.length;i++){
       
       listAccident.push(createObjectAccident(lines[i]))
   }
   console.log(listAccident)
   return listAccident
}

function createObjectAccident(listAccident){
    const listAttribute=listAccident.split("*")
    const objectAccident={fields:
        {num_acc:listAttribute[0],
        dep_name:listAttribute[1],
        reg_name:listAttribute[2],
        nom_com:listAttribute[3],
        jour:listAttribute[4],
        mois:listAttribute[5],
        an:listAttribute[6],
        hrmn:listAttribute[7],
        adr:listAttribute[8],
        atm:listAttribute[9],
        lum:listAttribute[10],
        grav:listAttribute[11],
        an_nais:listAttribute[12],
        datetime:listAttribute[13],
        coordonnees:[listAttribute[14],listAttribute[15]],
        }
    }
    return objectAccident
}

module.exports = getAccident