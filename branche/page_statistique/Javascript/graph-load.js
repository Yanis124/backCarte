

function load(){
    canvas.style.display="none"
    spinner.style.display="block"
    graphContainer.style.opacity="0.6"
    graphContainer.style.backgroundColor="white"
    erreurs.style.display="none"
}

function erreur(){
    console.log("erreur de fetch")
    canvas.style.display="none"
    erreurs.style.display="block"
}

function work() {
    spinner.style.display="none"
    graphContainer.style.opacity="1"
    
    if(erreurs.style.display!="block"){
        canvas.style.display="block"
        graphContainer.style.backgroundColor="#dee5ef"
        

    }
}