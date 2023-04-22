function createList(valueList){  //creer les options de la checklist

    var list=document.createElement("li")
    var span2=document.createElement("span")

    list.className="item"
    list.value=valueList
    span2.className="item-text"
    span2.innerText=valueList
    list.append(span2)

    return list

}
module.exports = createList