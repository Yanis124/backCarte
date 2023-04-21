function resetDepartement(){    //remettre a 0 le filtre departement

    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")

    textChoix.innerHTML=""                 
    departementText.style.position="relative"
}
module.exports = resetDepartement