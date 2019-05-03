var contadorFiles = 0;
//declarem l'array d'aleatoris aquí per poder accedir des de totes les funcions (variable global)
var ArrayRandom = new Array();
function crearCamps(){
    for (var i = 0; i < 10; i++) {
        // i = número de fila (pregunta 0,1,2...)
        document.getElementById("containerPrincipal").innerHTML+=
            "<div name='nia"+i+"'>"+
                "<label for='inputSend"+i+"'>Quin numero és?</label>"+
                    "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
                    "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
                    "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
                    "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
                    "<input type='number' min='1' max='9' name='inputSend"+i+"'>"+
                "<button id='btnConfirmar"+i+"' onclick='iguals("+i+")'>Confirmar</button>"+
                "<span id='spanMissatge"+i+"'></span>"+
            "</div>";
    }
    //guardem els numeros aleatoris y amaguem el botó de començar (no cal fer return perquè és global)
    ArrayRandom = crearRandom();
    document.getElementById("btnReady").style.display = "none";
}
function crearRandom(){
    var min = 1;
    var max = 10;
    //creem array que retornarem al final de la funció
    var ArrayTemp = new Array();
    //creem 5 numeros aleatoris
    for (var i = 0; i < 5; i++) {
        //a cada posició (0-4) guardem un numero entre 1-10 (inclosos)
        ArrayTemp[i] = Math.floor(Math.random() * (max - min)) + min;
    }
    //retornem l'array amb els numeros aleatoris per recollir-los cuan cridem la funcio
    return ArrayTemp;
}
function checkCamps(fila){
    //creem un array on guardarem els valors que ens han introduit en la fila corresponent (parametre funció fila)
    var ArraySend = new Array();
    //variable on guardarem cada input number sencer per despres canviar-li l'estil i comprovar el seu valor
    var inputSend;
    //variable per comprovar que tots els camps son entre 1 i 9
    var contadorErrors=0;
    //netejem l'estil per si hi havia algun camp erroni
    document.getElementById("spanMissatge"+fila).innerHTML = "";
    for (var i = 0; i < 5; i++) {
        //per cada posició, guardem l'input number
        inputSend = document.getElementsByName("inputSend"+fila)[i];
        inputSend.style = "";
        //si no esta buit I es mes gran que 0 I es mes petit que 10 (s'ha de complir tot)
        if( (inputSend.value!="") && (inputSend.value>0) && (inputSend.value<10) ){
            //guardem el valor de l'input a l'array
            ArraySend[i] = inputSend.value;
            //fem que ja no es pugui escriure
            inputSend.disabled= true;
        }else{
            //mostrem missatge error per cada possible camp erroni
            document.getElementById("spanMissatge"+fila).innerHTML += "Has d'introduir el camp "+(i+1)+" o no esta entre 1 i 9 !";
            inputSend.style = "border:2px solid red;";
            contadorErrors++;
        }
    }
    //si no hi ha hagut cap error
    if(contadorErrors==0){
        //fem que no es pugui tornar a comprovar els valors d'aquesta fila
        document.getElementById("btnConfirmar"+fila).disabled = true;
        //retornem per quan comprovem si estan en la seva posició
        return ArraySend;
    }else{
        return false;
    }
}
function iguals(fila) {
    var contadorOk = 0;
    //array on guardem els valors un cop comprovats
    var ArraySend = checkCamps(fila);
    //comprovem que estas a la linia corresponent
    if(contadorFiles==fila){
          //si l'array esta ple (suposant que no retorni false)
          if(ArraySend){
              //augmentem per la comprovació d'errors
              contadorFiles++;
              /*
              //FUNCIONAMENT BUCLE
                //i-j
                //0-0,0-1,0-2,0-3,0-4
                //1-0,1-1,1-2,1-3,1-4
              */
              for (var i = 0; i < ArraySend.length; i++) {
                  for (var j = 0; j < ArrayRandom.length; j++) {
                    //comprovem que cada valor i posició de l'array rebut i de l'array dels numeros aleatoris
                      if ( (ArraySend[i] == ArrayRandom[j]) && (i==j) ) {
                          contadorOk++;
                      }
                  }
              }
              //mostrem quants acerts ha fet l'usuari
              document.getElementById("spanMissatge"+fila).innerHTML =("Hi ha "+ contadorOk+ " en la seva posició!");
          }
    }else if(contadorFiles<fila){
        alert("t'has saltat alguna fila!");
    }
}
