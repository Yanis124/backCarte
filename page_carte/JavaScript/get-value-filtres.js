//definir les valeurs des filtre comme variables globales pour avoir un access direct depuis tous les fichiers 
  
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

var choix_date=document.getElementById("choix-date");

function getIntervalleDateStart(){  //limiter le choix dans le filtre date de fin et recuperer la date
    selectedDateEnd=dateStart.value
    console.log(selectedDateEnd)
    dateEnd.setAttribute("min",selectedDateEnd)    

}

function getIntervalleDateEnd(){  //limiter le choix dans le filtre date de debut et recuperrer la date
    selectedDateStart=dateEnd.value
    console.log(selectedDateStart)
    dateStart.setAttribute("max",selectedDateStart)  
}

function getDate(){  //recuperer la date 
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


    selectedRegion = regionSelect.value; 

    selectedDepartement=selectedVille=null //mettre a 0 departement et ville si on selectionne une autre region 

        console.log(selectedRegion)
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
                    departementSelect.options.length = 1; // suppression des options précédentes
                    departement.forEach(departement => {
                        var option = document.createElement("option");
                        option.value = departement.name;
                        option.text = departement.name;
                        departementSelect.add(option);
                    });
                })
            
    
            
            // URL de l'API pour les villes de la région sélectionnée
            var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionné
        
            fetch(apiUrl1)
            .then(response => response.json()) // Convertit en objet JSON les données récupérées
            .then(data => {
                var ville = data.facet_groups[0].facets; //variable villes contenant les données récupérées
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
        }
        getDataFiltre()

    console.log(selectedRegion)
}

function getDepartement() {

    var text=document.querySelector("#ville-choice")   //remettre a 0 le filtre ville
    var villeText=document.querySelector(".ville-text")

 
    text.innerHTML=""
    console.log(text)
    villeText.style.position="relative"
    villeText.style.fontSize="15px"

    
    

    // Departement sélectionnée
    
    selectedDepartement = departementSelect.value;

    selectedVille=null //mettre a 0 ville si il selectionne un autre departement



    
    

    if(selectedDepartement==="allDepartements"){  //si on selectionne tous les departements on affiche toutes les villes de la regions selectionné
        getRegion()
        
    }
    else{
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
        getDataFiltre()
    }

    
}







/* function getAge(){
    selectedAge=ageSelect.value
    console.log(selectedAge)
} */

/* function getGravite(){
    selectedGravite=graviteSelect.value
    console.log(selectedGravite)
} */

function getJour(){
    selectedLum=jourSelect.value
    getDataFiltre()
    console.log(selectedLum)
}

function getNuit(){
    selectedLum=nuitSelect.value
    getDataFiltre()
    console.log(selectedLum)
}


function getAtm(){
    const selectBtn = document.querySelectorAll("#weather .select-btn")
    
    items = document.querySelectorAll("#weather .item"),
    
    resetBtn = document.querySelector('input[type="reset"]');

    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
    });
    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const selectedItems = document.querySelectorAll("#weather .checked"); // Récupérer tous les éléments avec la classe "checked"
        selectedValuesAtm = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés
        
        filterList();    
    });
    }); 


    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
    });
}

function getAge(){
    const selectBtn = document.querySelectorAll(".age-container .select-btn")
    
    items = document.querySelectorAll(".age-container .item"),
    resetBtn = document.querySelector('input[type="reset"]');

    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
        
    }); 
    });
    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const selectedItems = document.querySelectorAll(".age-container .checked"); // Récupérer tous les éléments avec la classe "checked"
        selectedValuesAge = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés
        // Afficher les valeurs sélectionnées dans la console
        filterList();    
    });
    }); 


    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
    });
}

function getGravite(){
    const selectBtn = document.querySelectorAll(".gravite-container .select-btn")
    items = document.querySelectorAll(".gravite-container .item"),
    resetBtn = document.querySelector('input[type="reset"]');

    selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
    });
    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const selectedItems = document.querySelectorAll(".gravite-container .checked"); // Récupérer tous les éléments avec la classe "checked"
        selectedValuesGravite = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés
        //console.log(selectedValuesGravite); // Afficher les valeurs sélectionnées dans la console
        filterList();    
    });
    }); 




    items.forEach(item => {
    resetBtn.addEventListener("click", () => {
        item.classList.remove('checked');
    });
    });
}


function addCheckVille(){  //simuler le comportement de la checklist dans le filtre ville
    
    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")
    items = document.querySelectorAll(".ville-container .item"),
    resetBtn = document.querySelector('input[type="reset"]');

    
    items.forEach(item => {
    item.addEventListener("click", () => {


        
        

        for(var i=0;i<villeSelect.children[1].children.length;i++){  //ajouter du style a la ville selectionnée
            villeSelect.children[1].children[i].style.backgroundColor="#f5f5f5"  
        }

        selectedVille=item.innerText     //recuperer la valeur 
        item.classList.toggle("checked");
        item.style.backgroundColor="#b4dbd6"
        
        
        textChoix.innerHTML=selectedVille
        textChoix.style.color="#000"
        villeText.style.position="absolute"
        villeText.style.fontSize="12px"
        villeText.style.top="0"
        


        
    
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
}



const selectBtn = document.querySelectorAll(".ville-container .select-btn")  //ajouter un evenement pour ouvrire le menu deroulant des villes

selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    }); 
})



