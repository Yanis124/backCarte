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

var textLum=document.querySelectorAll('.lum-container p')

var listClass=[".ville-container",".weather-container",".age-container",".gravite-container",".departement-container",".region-container"]

function getIntervalleDateStart(){
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[0].style.color="gray"
    selectedDateStart=dateStart.value
    textDate[0].innerText=selectedDateStart

    setDateLimit()
}

function getIntervalleDateEnd(){
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[1].style.color="gray"
    selectedDateEnd=dateEnd.value
    textDate[1].innerText=selectedDateEnd

    setDateLimit()
}

function getIntervalleDate(){  //filtrer les données si on a la date début et de fin
    selectedDate=null  //mettre a 0 la valeur de date

    if(selectedDateEnd && selectedDateStart){
        getDataFiltre()
    }
}

function getDate(){  //recuperer la date 
    selectedDateEnd=selectedDateStart=null //mettre a 0 l'intervalle de date
    var textDate=document.querySelector('#date-specifique-container span')
    textDate.style.color="gray"
    
    selectedDate=date.value
    textDate.innerText=selectedDate

    getDataFiltre()
}

function setDateLimit(){  //selectedDateStart <= selectedDateEnd
    dateEnd.setAttribute("min",selectedDateStart)
    dateStart.setAttribute("max",selectedDateEnd)

}

function getRegion() {      // Région sélectionnée

    resetVille()

    resetDepartement()

    selectedDepartement=selectedVille=null //mettre à 0 departement et ville si on selectionne une autre region 

        if(selectedRegion=="toutes les regions"){
            nomDepartements()

            nomVilles()

            resetRegion()
        }
        else{
            // URL de l'API pour les départements de la région sélectionn
            var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name&refine.reg_name=" + selectedRegion; // permet encoder un nouvel URL avec la region selectionné

            fetch(apiUrl)
                .then(response => response.json()) // Convertit en objet JSON les données récupérées
                .then(data => {
                    var departement = data.facet_groups[0].facets; //variable departement contenant les données récupérées

                    departement.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
                    // Mise à jour de la liste déroulante des département
                    var departementSelect = document.getElementById("departement"); //Variable avec pour id = departement

                    departementSelect.children[1].innerHTML=""; // Suppression des options précédentes
                    departementSelect.children[1].append(createList("tous les departements"))
                    departement.forEach(departement => {
                    var option = createList(departement.name)

                    departementSelect.children[1].append(option); 
                    });
                    addEventDepartement()  //ajouter les differents evenements aux departements
                })
            // URL de l'API pour les villes de la région sélectionnée
            var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionné

            fetch(apiUrl1)
            .then(response => response.json()) // Convertit en objet JSON les données récupérées
            .then(data => {
                var ville = data.facet_groups[0].facets; //variable villes contenant les données récupérées

                ville.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
                // Mise à jour de la liste déroulante des villes
                villeSelect.children[1].innerHTML=""; // Suppression des options précédentes
                villeSelect.children[1].append(createList("toutes les villes"))
                ville.forEach(ville => {
                    var option = createList(ville.name)

                    villeSelect.children[1].append(option); //ajouter les villes du departement dans me filtre ville
                });

                addEventVille()  //ajouter les differents evenements aux villes
            })
        }
        getDataFiltre()  //filtrer
}

function getDepartement(){

    resetVille()

    selectedVille=null //mettre a 0 ville si il selectionne un autre departement

    if(selectedDepartement=="tous les departements"){  //si on selectionne tous les departements on affiche toutes les villes de la regions selectionné
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
            villeSelect.children[1].append(createList("toutes les villes"))
            ville.forEach(ville => {
                var option = createList(ville.name)

                villeSelect.children[1].append(option); //ajouter les villes du departement dans le filtre ville
            });
            addEventVille()
        })
        getDataFiltre()
    }
}

function getJour(inputJour){  //recuperer la valeur du filtre jour

    if(!inputJour.checked){
        selectedLum=null
        textLum[0].style.color="#333"
    }

    else{
        console.log(textLum)
        textLum[0].style.color="#000"
        textLum[1].style.color="#333"
        selectedLum=jourSelect.value
        var inputNuit=document.getElementById("nuit")  //remettre a 0 le button nuit
        if(inputNuit.checked){
            inputNuit.checked = false;
        }
    }
    getDataFiltre()
}

function getNuit(inputNuit){ //recuperer la valeur du filtre nuit

    if(!inputNuit.checked){
        selectedLum=null
        textLum[1].style.color="#333"
    }

    else{
        textLum[1].style.color="#000"
        textLum[0].style.color="#333"
        selectedLum=nuitSelect.value
        var inputJour=document.getElementById("jour") //remettre a 0 le button jour
        if(inputJour.checked){
            inputJour.checked = false;
        }
    }
    getDataFiltre()
}

function getAtm(){  //recuperer les valeurs du filtre meteo

    var textChoix=document.querySelector("#weather-choice")
    var weatherText=document.querySelector(".weather-text")
    var items = document.querySelectorAll(".weather-container .item")

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll("#weather .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesAtm = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAtm.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesAtm[i]+" "
        }

        if(selectedValuesAtm.length>0){
            weatherText.style.position="absolute"
            weatherText.style.top="0"
        }

        else{
            weatherText.style.position="relative"
        }
        filterList();    
        });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            weatherText.style.position="relative"
        });
    }); 
}

function getAge(){

    var textChoix=document.querySelector("#age-choice")
    var ageText=document.querySelector(".age-text")
    var items = document.querySelectorAll(".age-container .item")

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll(".age-container .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesAge = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAge.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }

            textChoix.innerHTML+=selectedValuesAge[i]+" "
        }

        if(selectedValuesAge.length>0){
            ageText.style.position="absolute"
            ageText.style.top="0"
        }

        else{
            ageText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            ageText.style.position="relative"
        });

    }); 
}

function getGravite(){

    var textChoix=document.querySelector("#gravite-choice")
    var graviteText=document.querySelector(".gravite-text")
    items = document.querySelectorAll(".gravite-container .item"),

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");

        const selectedItems = document.querySelectorAll(".gravite-container .checked"); // Récupérer tous les éléments avec la classe "checked"

        selectedValuesGravite = Array.from(selectedItems).map(item => item.getAttribute("value")); // Récupérer les valeurs de l'attribut "value" des éléments sélectionnés

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesGravite.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesGravite[i]+" "
        }

        if(selectedValuesGravite.length>0){
            graviteText.style.position="absolute"
            graviteText.style.top="0"
        }

        else{
            graviteText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            graviteText.style.position="relative"
        });
    }); 
}

function openFiltreList(){   //ouvrire les listes des filtres

    for(var i=0;i<listClass.length;i++){

        const selectBtn = document.querySelectorAll(listClass[i]+" .select-btn")

        items = document.querySelectorAll(listClass[i]+" .item"),

        resetBtn = document.querySelector('input[type="reset"]');

        selectBtn.forEach(selectBtn => {
            selectBtn.addEventListener("click", () => {
                selectBtn.classList.toggle("open");
            }); 
        });
    }
}
