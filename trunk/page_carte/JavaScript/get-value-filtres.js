//definir les valeurs des filtres comme variables globales pour avoir un accès direct depuis tous les fichiers 

  

var selectedDate   //definir une variable par filtre pour contenir les valeurs selectionnées

 

var selectedDateStart  

var selectedDateEnd

var selectedRegion

var selectedDepartement

var selectedVille

var selectedValuesAtm=[]

var selectedValuesAge=[]

var selectedValuesGravite=[]

var selectedLum

var listClass=[".ville-container",".weather-container",".age-container",".gravite-container",".departement-container",".region-container"]

<<<<<<< .mine
function getIntervalleDateStart(){  //limiter le choix dans le filtre date de début et recuperer la date

    if(dateStart.value==""){

        selectedDateStart="2012-01-01";

    }

    else{

       selectedDateStart=dateStart.value 

    }

    console.log(selectedDateStart)
||||||| .r172
function getIntervalleDateStart(){  //limiter le choix dans le filtre date de début et recuperer la date
    if(dateStart.value==""){
        selectedDateStart="2012-01-01";
    }
    else{
       selectedDateStart=dateStart.value 
    }
    console.log(selectedDateStart)
=======
>>>>>>> .r180

function getIntervalleDateStart(){
    selectedDateStart=dateStart.value
}

<<<<<<< .mine
function getIntervalleDateEnd(){  //limiter le choix dans le filtre date de fin et recuperer la date

    dateEnd.setAttribute("min",selectedDateStart);

    if (dateEnd.value==""){

        selectedDateEnd="2020-01-01";
||||||| .r172
function getIntervalleDateEnd(){  //limiter le choix dans le filtre date de fin et recuperer la date
    dateEnd.setAttribute("min",selectedDateStart);
    if (dateEnd.value==""){
        selectedDateEnd="2020-01-01";
=======
function getIntervalleDateEnd(){
    selectedDateEnd=dateEnd.value
}

function getIntervalleDate(){  //filtrer les données si on a la date de but et de fin
    selectedDate=null  //mettre a 0 la valeur de date
    if(selectedDateEnd && selectedDateEnd){
        getDataFiltre()
>>>>>>> .r180

    }
<<<<<<< .mine

    else{

      selectedDateEnd=dateEnd.value  

    }

    console.log(selectedDateEnd)

    dateStart.setAttribute("max",selectedDateEnd)

    

    getDataFiltre();
||||||| .r172
    else{
      selectedDateEnd=dateEnd.value  
    }
    console.log(selectedDateEnd)
    dateStart.setAttribute("max",selectedDateEnd)
    
    getDataFiltre();
=======
>>>>>>> .r180

}


function getDate(){  //recuperer la date 
<<<<<<< .mine

||||||| .r172
=======
    selectedDateEnd=selectedDateStart=null //mettre a 0 l'intervalle de date
>>>>>>> .r180
    selectedDate=date.value

    console.log(selectedDate)

    getDataFiltre()

}

function resetVille(){

    var text=document.querySelector("#ville-choice")   //remettre a 0 le filtre ville

    var villeText=document.querySelector(".ville-text")

 

    text.innerHTML=""

    console.log(text)

    villeText.style.position="relative"

    villeText.style.fontSize="15px"

}

function getRegion() {      // Région sélectionnée

    
    resetVille()
    resetDepartement()


    selectedDepartement=selectedVille=null //mettre a 0 departement et ville si on selectionne une autre region 

        // console.log(selectedRegion)

        if(selectedRegion==="allRegions"){

            nomDepartements()

            nomVilles()

        }

        else{

        

            // URL de l'API pour les départements de la région sélectionnée

            var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name&refine.reg_name=" + selectedRegion; // permet encoder un nouvel URL avec la region selectionné

        

            fetch(apiUrl)

                .then(response => response.json()) // Convertit en objet JSON les données récupérées

                .then(data => {

                    var departement = data.facet_groups[0].facets; //variable departement contenant les données récupérées

                    departement.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique

        

                    // Mise à jour de la liste déroulante des départements

                    var departementSelect = document.getElementById("departement"); //Variable avec pour id = departement
<<<<<<< .mine

                    departementSelect.options.length = 1; // suppression des options précédentes
||||||| .r172
                    departementSelect.options.length = 1; // suppression des options précédentes
=======
                    departementSelect.children[1].innerHTML=""; // Suppression des options précédentes
>>>>>>> .r180

                    departement.forEach(departement => {
<<<<<<< .mine

                        var option = document.createElement("option");

                        option.value = departement.name;

                        option.text = departement.name;

                        departementSelect.add(option);
||||||| .r172
                        var option = document.createElement("option");
                        option.value = departement.name;
                        option.text = departement.name;
                        departementSelect.add(option);
=======
                    var option = createList(departement.name)
                    departementSelect.children[1].append(option); 
>>>>>>> .r180

                    });
<<<<<<< .mine

||||||| .r172
=======
                    addEventDepartement()  //ajouter les differents evenements aux departements
>>>>>>> .r180
                })

            

    

            

            // URL de l'API pour les villes de la région sélectionnée

            var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionné

        

            fetch(apiUrl1)

            .then(response => response.json()) // Convertit en objet JSON les données récupérées

            .then(data => {

                var ville = data.facet_groups[0].facets; //variable villes contenant les données récupérées

                ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique

        

                // Mise à jour de la liste déroulante des villes
<<<<<<< .mine

                var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville

                 villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
||||||| .r172
                var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
                 villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
=======
                villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
>>>>>>> .r180

                ville.forEach(ville => {

                    var option = createList(ville.name)

                    villeSelect.children[1].append(option); //ajouter les villes du departement dans me filtre ville

                });
<<<<<<< .mine

                addCheckVille()
||||||| .r172
                addCheckVille()
=======
                addEventVille()  //ajouter les differents evenements aux villes
>>>>>>> .r180

            })

        }
<<<<<<< .mine

        getDataFiltre()
||||||| .r172
        getDataFiltre()
=======
        getDataFiltre()  //filtrer
>>>>>>> .r180


}

function getDepartement(){
    resetVille()

<<<<<<< .mine
    var text=document.querySelector("#ville-choice")   //remettre a 0 le filtre ville

    var villeText=document.querySelector(".ville-text")
||||||| .r172
    var text=document.querySelector("#ville-choice")   //remettre a 0 le filtre ville
    var villeText=document.querySelector(".ville-text")
=======
>>>>>>> .r180

<<<<<<< .mine
 

    text.innerHTML=""

    console.log(text)

    villeText.style.position="relative"

    villeText.style.fontSize="15px"

||||||| .r172
 
    text.innerHTML=""
    console.log(text)
    villeText.style.position="relative"
    villeText.style.fontSize="15px"

=======
    // Departement sélectionnée
>>>>>>> .r180
    

    

<<<<<<< .mine
    // Departement sélectionnée

    

    selectedDepartement = departementSelect.value;

||||||| .r172
    // Departement sélectionnée
    
    selectedDepartement = departementSelect.value;

=======
>>>>>>> .r180
    selectedVille=null //mettre a 0 ville si il selectionne un autre departement

    

<<<<<<< .mine
    

    if(selectedDepartement==="allDepartements"){  //si on selectionne tous les departements on affiche toutes les villes de la region selectionnée
||||||| .r172
    
    

    if(selectedDepartement==="allDepartements"){  //si on selectionne tous les departements on affiche toutes les villes de la region selectionnée
=======
    if(selectedDepartement==="allDepartements"){  //si on selectionne tous les departements on affiche toutes les villes de la regions selectionné
>>>>>>> .r180

        getRegion()

        

    }

    else{
<<<<<<< .mine

    // URL de l'API pour les villes du département sélectionnée

    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionné

  

    // Récupération des départements de l'API pour la région sélectionnée

    fetch(apiUrl2)

    .then(response => response.json())

    .then(data => {

        var ville = data.facet_groups[0].facets;

        ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique

  

        // Mise à jour de la liste déroulante des villes

        var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville

        villeSelect.children[1].innerHTML=""; // Suppression des options précédentes

        ville.forEach(ville => {

            var option = createList(ville.name)

            villeSelect.children[1].append(option); //ajouter les villes du departement dans me filtre ville

        });

        addCheckVille()

        

    })
||||||| .r172
    // URL de l'API pour les villes du département sélectionnée
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionné
  
    // Récupération des départements de l'API pour la région sélectionnée
    fetch(apiUrl2)
    .then(response => response.json())
    .then(data => {
        var ville = data.facet_groups[0].facets;
        ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
  
        // Mise à jour de la liste déroulante des villes
        var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
        villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
        ville.forEach(ville => {
            var option = createList(ville.name)
            villeSelect.children[1].append(option); //ajouter les villes du departement dans me filtre ville
        });
        addCheckVille()
        
    })
=======
        // URL de l'API pour les villes du département sélectionnée
        var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionné
    
        // Récupération des départements de l'API pour la région sélectionnée
        fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            var ville = data.facet_groups[0].facets;
            ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
    
            // Mise à jour de la liste déroulante des villes
            var villeSelect = document.getElementById("ville"); //Variable avec pour id = ville
            villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
            ville.forEach(ville => {
                var option = createList(ville.name)
                villeSelect.children[1].append(option); //ajouter les villes du departement dans le filtre ville
            });
            addEventVille()
            
        })
>>>>>>> .r180

        getDataFiltre()

    }


}



function getJour(){  //recuperer la valeur du filtre jour

    selectedLum=jourSelect.value

    getDataFiltre()
<<<<<<< .mine

    console.log(selectedLum)
||||||| .r172
    console.log(selectedLum)
=======
    // console.log(selectedLum)
>>>>>>> .r180

}

function getNuit(){ //recuperer la valeur du filtre nuit

    selectedLum=nuitSelect.value

    getDataFiltre()
<<<<<<< .mine

    console.log(selectedLum)
||||||| .r172
    console.log(selectedLum)
=======
    // console.log(selectedLum)
>>>>>>> .r180

}

function getAtm(){

<<<<<<< .mine
    const selectBtn = document.querySelectorAll("#weather .select-btn")
||||||| .r172
function getAtm(){
    const selectBtn = document.querySelectorAll("#weather .select-btn")
=======
function getAtm(){  //recuperer les valeurs du filtre meteo

    var textChoix=document.querySelector("#weather-choice")
    var weatherText=document.querySelector(".weather-text")
>>>>>>> .r180

    
<<<<<<< .mine

    items = document.querySelectorAll("#weather .item"),
||||||| .r172
    items = document.querySelectorAll("#weather .item"),
=======
>>>>>>> .r180

    
<<<<<<< .mine

    resetBtn = document.querySelector('input[type="reset"]');
||||||| .r172
    resetBtn = document.querySelector('input[type="reset"]');
=======
    var items = document.querySelectorAll(".weather-container .item")
>>>>>>> .r180

<<<<<<< .mine
    selectBtn.forEach(selectBtn => {

    selectBtn.addEventListener("click", () => {

        selectBtn.classList.toggle("open");

    }); 

    });
||||||| .r172
    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
    });
=======
    // console.log(items)


>>>>>>> .r180

    items.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll("#weather .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesAtm = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés
<<<<<<< .mine

||||||| .r172
=======

        textChoix.innerHTML=""

        for(var i=0;i<selectedValuesAtm.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesAtm[i]+" "
        }

>>>>>>> .r180
        
<<<<<<< .mine

||||||| .r172
=======
        
        if(selectedValuesAtm.length>0){
                    
            weatherText.style.position="absolute"
            weatherText.style.top="0"
        }
        else{

            weatherText.style.position="relative"
            
        }



        
>>>>>>> .r180
        filterList();    

    });
<<<<<<< .mine

||||||| .r172
=======
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
        textChoix.innerHTML=""
        weatherText.style.position="relative"
    });
>>>>>>> .r180
    }); 

    items.forEach(item => {

<<<<<<< .mine
    resetBtn.addEventListener("click", () => {

        item.classList.remove('checked');

    });

    });
||||||| .r172
    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
    });
=======
    

>>>>>>> .r180

}

function getAge(){
<<<<<<< .mine

    const selectBtn = document.querySelectorAll(".age-container .select-btn")

    

    items = document.querySelectorAll(".age-container .item"),

    resetBtn = document.querySelector('input[type="reset"]');
||||||| .r172
    const selectBtn = document.querySelectorAll(".age-container .select-btn")
    
    items = document.querySelectorAll(".age-container .item"),
    resetBtn = document.querySelector('input[type="reset"]');
=======
>>>>>>> .r180

<<<<<<< .mine
    selectBtn.forEach(selectBtn => {

    selectBtn.addEventListener("click", () => {

        selectBtn.classList.toggle("open");

        

    }); 

    });
||||||| .r172
    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
        
    }); 
    });
=======
    var textChoix=document.querySelector("#age-choice")
    var ageText=document.querySelector(".age-text")
    var items = document.querySelectorAll(".age-container .item")

>>>>>>> .r180

    items.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll(".age-container .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesAge = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés

        // Afficher les valeurs sélectionnées dans la console
<<<<<<< .mine

        filterList();    

    });

    }); 
||||||| .r172
        filterList();    
    });
    }); 
=======
        filterList(); 
        
        textChoix.innerHTML=""
>>>>>>> .r180

<<<<<<< .mine
    items.forEach(item => {
||||||| .r172
=======
        for(var i=0;i<selectedValuesAge.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesAge[i]+" "
        }
>>>>>>> .r180

<<<<<<< .mine
||||||| .r172
    items.forEach(item => {
=======
        
        
        if(selectedValuesAge.length>0){
                    
            ageText.style.position="absolute"
            ageText.style.top="0"
        }
        else{

            ageText.style.position="relative"
            
        }

    });
>>>>>>> .r180
    resetBtn.addEventListener("click", () => {

        item.classList.remove('checked');
<<<<<<< .mine

||||||| .r172
=======
        textChoix.innerHTML=""
        ageText.style.position="relative"
>>>>>>> .r180
    });
<<<<<<< .mine

    });
||||||| .r172
    });
=======
    }); 


>>>>>>> .r180

}


function getGravite(){
<<<<<<< .mine

    const selectBtn = document.querySelectorAll(".gravite-container .select-btn")
||||||| .r172
    const selectBtn = document.querySelectorAll(".gravite-container .select-btn")
=======
    
    var textChoix=document.querySelector("#gravite-choice")
    var graviteText=document.querySelector(".gravite-text")
>>>>>>> .r180

    items = document.querySelectorAll(".gravite-container .item"),
<<<<<<< .mine

    resetBtn = document.querySelector('input[type="reset"]');
||||||| .r172
    resetBtn = document.querySelector('input[type="reset"]');
=======
>>>>>>> .r180

<<<<<<< .mine
    selectBtn.forEach(selectBtn => {

    selectBtn.addEventListener("click", () => {

        selectBtn.classList.toggle("open");

    }); 

    });
||||||| .r172
    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
    });
=======
>>>>>>> .r180

    items.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll(".gravite-container .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesGravite = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés

        //console.log(selectedValuesGravite); // Afficher les valeurs sélectionnées dans la console
<<<<<<< .mine

        filterList();    

    });

    }); 
||||||| .r172
        filterList();    
    });
    }); 
=======
        filterList(); 
        
        textChoix.innerHTML=""
>>>>>>> .r180

<<<<<<< .mine
    items.forEach(item => {
||||||| .r172
=======
        for(var i=0;i<selectedValuesGravite.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesGravite[i]+" "
        }
>>>>>>> .r180

<<<<<<< .mine
    resetBtn.addEventListener("click", () => {
||||||| .r172
=======
        
        
        if(selectedValuesGravite.length>0){
                    
            graviteText.style.position="absolute"
            graviteText.style.top="0"
        }
        else{
>>>>>>> .r180

<<<<<<< .mine
        item.classList.remove('checked');

||||||| .r172

    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
=======
            graviteText.style.position="relative"
            
        }
    });
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
>>>>>>> .r180
        textChoix.innerHTML=""
        graviteText.style.position="relative"
    });
<<<<<<< .mine

    });
||||||| .r172
    });
=======
    }); 
>>>>>>> .r180

}

function addCheckVille(){  //simuler le comportement de la checklist dans le filtre ville

<<<<<<< .mine
    

    var textChoix=document.querySelector("#ville-choice")

    var villeText=document.querySelector(".ville-text")

    items = document.querySelectorAll(".ville-container .item"),

    resetBtn = document.querySelector('input[type="reset"]');
||||||| .r172
function addCheckVille(){  //simuler le comportement de la checklist dans le filtre ville
    
    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")
    items = document.querySelectorAll(".ville-container .item"),
    resetBtn = document.querySelector('input[type="reset"]');
=======
>>>>>>> .r180

<<<<<<< .mine
    

    items.forEach(item => {

    item.addEventListener("click", () => {
||||||| .r172
    
    items.forEach(item => {
    item.addEventListener("click", () => {
=======
>>>>>>> .r180

        

<<<<<<< .mine
        
||||||| .r172
        
        
=======
>>>>>>> .r180

<<<<<<< .mine
        for(var i=0;i<villeSelect.children[1].children.length;i++){  //ajouter du style a la ville selectionnée

            villeSelect.children[1].children[i].style.backgroundColor="#f5f5f5"  

        }
||||||| .r172
        for(var i=0;i<villeSelect.children[1].children.length;i++){  //ajouter du style a la ville selectionnée
            villeSelect.children[1].children[i].style.backgroundColor="#f5f5f5"  
        }
=======
function openFiltreList(){   //ouvrire les listes des filtres
>>>>>>> .r180

<<<<<<< .mine
        selectedVille=item.innerText     //recuperer la valeur 

        item.classList.toggle("checked");

        item.style.backgroundColor="#b4dbd6"
||||||| .r172
        selectedVille=item.innerText     //recuperer la valeur 
        item.classList.toggle("checked");
        item.style.backgroundColor="#b4dbd6"
=======
    for(var i=0;i<listClass.length;i++){
        const selectBtn = document.querySelectorAll(listClass[i]+" .select-btn")
>>>>>>> .r180

        
<<<<<<< .mine

        

        textChoix.innerHTML=selectedVille

        textChoix.style.color="#000"

        villeText.style.position="absolute"

        villeText.style.fontSize="12px"

        villeText.style.top="0"

        
||||||| .r172
        
        textChoix.innerHTML=selectedVille
        textChoix.style.color="#000"
        villeText.style.position="absolute"
        villeText.style.fontSize="12px"
        villeText.style.top="0"
        
=======
        items = document.querySelectorAll(listClass[i]+" .item"),
        resetBtn = document.querySelector('input[type="reset"]');
>>>>>>> .r180

<<<<<<< .mine
        

    

        getDataFiltre() 

    });

    }); 

    items.forEach(item => {

    item.addEventListener("mouseover", () => {

        item.style.backgroundColor="#b4dbd6"

    

    });

    });

    items.forEach(item => {

    item.addEventListener("mouseleave", () => {

        item.style.backgroundColor="#f5f5f5"

    

    });

    });

    items.forEach(item => {

    resetBtn.addEventListener("click", () => {

        item.classList.remove('checked');

    });

    });
||||||| .r172

        
    
        getDataFiltre() 
    });
    }); 

    items.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.style.backgroundColor="#b4dbd6"
    
    });
    });

    items.forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.backgroundColor="#f5f5f5"
    
    });
    });


    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
    });
=======
        selectBtn.forEach(selectBtn => {
        selectBtn.addEventListener("click", () => {
            selectBtn.classList.toggle("open");
            
        }); 
        });
    }
>>>>>>> .r180

}


<<<<<<< .mine
selectBtn.forEach(selectBtn => {

    selectBtn.addEventListener("click", () => {

        selectBtn.classList.toggle("open");

    }); 

})
||||||| .r172
selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
})



=======
>>>>>>> .r180
