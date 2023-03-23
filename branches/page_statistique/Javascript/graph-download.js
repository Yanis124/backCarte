//telécharger le graph

function download(){
    const imageLink=document.createElement("a")
    const canvas=document.getElementById("canvas")
    imageLink.download="canvas.png"
    imageLink.href=canvas.toDataURL("image/png",1)

    imageLink.click()
}