function style(note) {
    if (!note || note.length === 0) {
        return;
    }
    for (var i = 0; i < note.length; i++) {
      var Div = note[i];
      var number = null;
      var numberDiv = null;
      if (Div.children.length > 0) {
        numberDiv = Div.children[0];
        if (numberDiv.children.length > 0) {
          number = numberDiv.children[0];
        }
      }
      Div.style.background = "green";
      Div.style.border = "2px solid white";
      Div.style.borderRadius = "50%";
      Div.style.width = "30px";
      Div.style.height = "30px";
      Div.style.textAlign = "center";
      Div.style.fontSize = "15px";
      Div.style.fontWeight = "bold";
      if (number !== null && numberDiv !== null) { // Ajouter une vérification pour numberDiv
        number.style.fontSize = "17px";
        number.style.color = "white";
        numberDiv.style.width = "30px";
        numberDiv.style.height = "30px";
      }
    }
  }
module.exports =style