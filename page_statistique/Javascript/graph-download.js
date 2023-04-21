//Download the graph

function download(){
    const imageLink=document.createElement("a")
    const canvas=document.getElementById("canvas")
    imageLink.download= titles+".png"
    imageLink.href=canvas.toDataURL("image/png",1)

    imageLink.click()
}
