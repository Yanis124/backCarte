function resetVille(){    //remettre a 0 le filtre ville
    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")

 
    textChoix.innerHTML=""                 
    villeText.style.position="relative"
}

function resetDepartement(){    //remettre a 0 le filtre departement
    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")

 
    textChoix.innerHTML=""                 
    departementText.style.position="relative"
}


function createList(valueList){
    var list=document.createElement("li")
    list.className="item"
    list.value=valueList
    var span2=document.createElement("span")
    span2.className="item-text"
    span2.innerText=valueList
    list.append(span2)
    return list


}


function addEventVille(){  //simuler le comportement de la checklist dans le filtre ville

  

    
    
    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")
    var items = document.querySelectorAll(".ville-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');


    
    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedVille=item.innerText     //recuperer la valeur
         
        item.classList.toggle("checked");

        
        closeList()


        textChoix.innerHTML=selectedVille
        villeText.style.position="absolute"
        villeText.style.top="0"
        

        getDataFiltre() 

        });
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor="#b4dbd6"
        
        });
        item.addEventListener("mouseleave", () => {
            item.style.backgroundColor="#f5f5f5"
        
        });
        resetBtn.addEventListener("click", () => {   //reset filter ville
            villeSelect=null
            villeText.style.position="relative"
            
            textChoix.innerHTML=""


        });
    }); 

}

function addEventDepartement(){  //simuler le comportement de la checklist dans le filtre ville

  
    
    
    
    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")
    var items = document.querySelectorAll(".departement-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    
    


    
    items.forEach(item => {
    item.addEventListener("click", () => {
                
                
                
                
                
         
        
        

        selectedDepartement=item.innerText     //recuperer la valeur
         
        item.classList.toggle("checked");

        closeList()
        
        textChoix.innerHTML=selectedDepartement
        departementText.style.position="absolute"
        departementText.style.top="0"

        getDepartement()

        
    

        });
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor="#b4dbd6"
        
        });
        item.addEventListener("mouseleave", () => {
            item.style.backgroundColor="#f5f5f5"
        
        });
        resetBtn.addEventListener("click", () => {   //reset filter ville
            departementSelect=null
            departementText.style.position="relative"
            
            textChoix.innerHTML=""


        });
    }); 

}


function addEventRegion(){
        
    
    
    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")
    var items = document.querySelectorAll(".region-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');


   
    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedRegion=item.innerText     //recuperer la valeur
         
        item.classList.toggle("checked");

        closeList()

        
        
        textChoix.innerHTML=selectedRegion
        regionText.style.position="absolute"
        regionText.style.top="0"


        getRegion()

        
    

        });
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor="#b4dbd6"
        
        });
        item.addEventListener("mouseleave", () => {
            item.style.backgroundColor="#f5f5f5"
        
        });
        resetBtn.addEventListener("click", () => {   //reset filter ville
            regionSelect=null
            regionText.style.position="relative"
            
            textChoix.innerHTML=""


        });
    }); 
}


function closeList(){   //fermer la liste une fois qu'on a choisi la ville dep region
    const selectBtns = document.querySelectorAll(".select-btn")
    selectBtns.forEach(selectBtn => {selectBtn.classList.value="select-btn"} )
    
}


