function resetRegion(){
    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")

    textChoix.innerHTML=""                 
    regionText.style.position="relative"
}
module.exports = resetRegion