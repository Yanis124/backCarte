function regrouper(){ //Appliquer le style à tous les clusters

    
    const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
    const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
    const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")
    //Selectionner les objets à chaque fois qu'on zoom ou on dezoom des numeros apparaissent pour indiquer le nombre de marqueurs regroupés
    
   
    
        
    if(noteSmall.length>0){  
        
        style(noteSmall)
        
    }
    if(noteMedium.length>0){
        
        style(noteMedium)
        
    }
    if(noteLarge.length>0){
        
        style(noteLarge) 
       
    }
}


/*  function style(note){   //Ajouter du style aux clusters    
    for(var i=0;i<note.length;i++){  //Iterer le tableau pour styler les elements
            var Div=note[i]
            var number=note[i].children[0].children[0]
            var numberDiv=note[i].children[0]
            
            number.style.fontSize="17px"
            number.style.color = 'white'   

            numberDiv.style.display="flex"
            numberDiv.style.justifyContent="center"
        
       

            Div.style.display="flex"
            Div.style.justifyContent="center"
            Div.style.alignItems="center"
            Div.style.backgroundColor="black"
            Div.style.borderWidth="1px"
            Div.style.borderStyle="solid"
            Div.style.borderColor="white"
            Div.style.borderRadius="50px"
            Div.style.padding="10px"
        
        
        
    }

} */  

function style(note) {
    for (var i = 0; i < note.length; i++) {
      var Div = note[i];
      var number = null;
      var numberDiv = null;
      if (Div.children.length > 0) {
        numberDiv = Div.children[0];
        if (numberDiv.children.length > 0) {
          number = numberDiv.children[0];
        }
      }
      Div.style.background = "green";
      Div.style.border = "2px solid white";
      Div.style.borderRadius = "50%";
      Div.style.width = "30px";
      Div.style.height = "30px";
      Div.style.textAlign = "center";
      Div.style.fontSize = "15px";
      Div.style.fontWeight = "bold";
      if (number !== null && numberDiv !== null) { // Ajouter une vérification pour numberDiv
        number.style.fontSize = "17px";
        number.style.color = "white";
        numberDiv.style.width = "30px";
        numberDiv.style.height = "30px";
      }
    }
  }
   
  
module.exports = regrouper 