var contadorFiles = 0;
var ArrayRandom = new Array();
function crearCamps(){
  for (var i = 0; i < 10; i++) {
    document.getElementById("containerPrincipal").innerHTML+=
      "<div name='nia"+i+"'>"+
      "<label for='inputSend"+i+"'>Quin numero és?</label>"+
          "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
          "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
          "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
          "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
          "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
      "<button id='btnconfirmar"+i+"' onclick='iguals("+i+")'>Confirmar</button>"+
      "<span id='spanError"+i+"'></span>"+
      "</div>";
  }
  ArrayRandom = crearRandom();
  document.getElementById("btnready").style.display = "none";
}
function crearRandom(){
  var min = 1;
  var max = 10;
  var ArrayTemp = new Array();
  //creem numeros aleatoris
  for (var i = 0; i < 5; i++) {
    ArrayTemp[i] = Math.floor(Math.random() * (max - min)) + min;
  }
  return ArrayTemp;
}
function checkCamps(fila){
  var ArraySend = new Array();
  var inputSend;
  var contadorErrors=0;
  document.getElementById("spanError"+fila).innerHTML = "";
  for (var i = 0; i < 5; i++) {
      inputSend = document.getElementsByName("inputSend"+fila)[i];
      inputSend.style = "";
      if( (inputSend.value!="") && (inputSend.value>0) && (inputSend.value<10) ){
        ArraySend[i] = inputSend.value;
        inputSend.disabled= true;
      }else{
        document.getElementById("spanError"+fila).innerHTML += "Has d'introduir el camp "+(i+1)+" o no esta entre 1 i 9 ";
        inputSend.style = "border:2px solid red;";
        contadorErrors++;
        //ArraySend = null;
        //return false;
      }
  }
  if(contadorErrors==0){
      document.getElementById("btnconfirmar"+fila).disabled = true;
      return ArraySend;
  }else{
      return false;
  }
}
function iguals(fila) {
    var contadorOk = 0;
    var ArraySend = checkCamps(fila);
    if(contadorFiles==fila){
          if(ArraySend){
              contadorFiles++;
              for (var i = 0; i < ArraySend.length; i++) {
                  for (var j = 0; j < ArrayRandom.length; j++) {
                      if ( (ArraySend[i] == ArrayRandom[j]) && (i==j) ) {
                          contadorOk++;
                      }
                  }
              }
              document.getElementById("spanError"+fila).innerHTML =("Hi ha "+ contadorOk+ " en la seva posició");
          }
    }else if(contadorFiles>fila){
        alert("ja l'has introduit!");
        return false;
    }else if(contadorFiles<fila){
        alert("t'has saltat alguna fila");
        return false;
    }
}
