function afficherChoix() {
    var choix = document.getElementById("choix-date");
    var choixDate = document.getElementById("choix-date-specifique");
    var choixInterval = document.getElementById("choix-intervalle-dates");
    if (choix.value == "date-specifique") {
        choixDate.style.display = "block";
        choixInterval.style.display = "none";
    } else if (choix.value == "intervalle-dates") {
        choixDate.style.display = "none";
        choixInterval.style.display = "block";
    } else {
        choixDate.style.display = "none";
        choixInterval.style.display = "none";
    }
}

function resetDepartement() {
    document.getElementById("departement").selectedIndex = 0;
    resetVille();
}

function resetVille() {
    document.getElementById("ville").selectedIndex = 0;
}

