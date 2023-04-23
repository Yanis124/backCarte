const express=require("express")  //set up the app 
const path= require("path");
const app=express()
const fs=require('fs')  //handle files


app.use(express.json())
app.use(express.urlencoded({ extended: true }))









const correctAccident=require("./static/accident")  //import the function correctAccident

async function getList(){      
    var correctAccidentList=await correctAccident()//get the corrected list of accidents
    return correctAccidentList
} 




async function wrtiteFile(){
    var correctAccidentList=await getList()
    let i=0
    correctAccidentList.forEach((acc)=>{
        if(acc){
        
        let code=acc.fields.num_acc
        let dep=acc.fields.dep_name
        let reg=acc.fields.reg_name
        let day=acc.fields.jour
        let month=acc.fields.mois
        let year=acc.fields.an
        let time=acc.fields.hrmn
        let adress=acc.fields.adr
        let atm=acc.fields.atm
        let lum=acc.fields.lum
        let grav=acc.fields.grav
        
        console.log(++i)
        
            fs.appendFile('./static/text.txt', code+"*"+dep+"*"+reg+"*"+day+"*"+month+"*"+year+"*"+time+"*"+adress+"*"+atm+"*"+lum+"*"+grav+"\n", (err)=> {
                if (err) throw err;
                console.log('Text appended to file!');
              }) //append to the file id, reg,dep of the accident
        }
        

    })
    
}

wrtiteFile()











app.listen(3011)

