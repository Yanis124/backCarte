const h1=document.getElementsByTagName("h1")
console.log(h1)


async function readFile(){

    var res=await fetch('text.txt')
    var data=await res.text()
    console.log(data)
      
}


readFile()
