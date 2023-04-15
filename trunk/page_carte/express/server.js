const express=require("express")  //set up the app 
const path= require("path");
const app=express()
const fs=require('fs')  //handle files


app.use(express.json())
app.use(express.urlencoded({ extended: true }))









const correctAccident=require("./static/accident")  //import the function correctAccident

async function getList(){      
    var correctAccidentList=await correctAccident()//get the corrected list of accidents
    console.log(correctAccidentList)
    return correctAccidentList
} 




async function wrtiteFile(){
    var correctAccidentList=await getList()
    correctAccidentList.forEach((acc)=>{
        
        let code=acc.fields.num_acc
        let dep=acc.fields.dep_name
        let reg=acc.fields.reg_name
        fs.appendFile('./static/text.txt', code+"*"+dep+"*"+reg+"\n", (err) => {  //append to the file id, reg,dep of the accident 
            if (err) throw err;
            
        });
    })
    
}

wrtiteFile()











app.listen(3000)

