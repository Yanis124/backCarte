function resetVille(){    //remettre a 0 le filtre ville

    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")

    textChoix.innerHTML=""                 
    villeText.style.position="relative"
}
module.exports = resetVille