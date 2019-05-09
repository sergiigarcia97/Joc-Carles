var contadorFiles = 0;
//declarem un array per comprovar en la funcio checkexistent si el valor ja sha sumat anteriorment
var ArrayAnterior = new Array();
//declarem l'array d'aleatoris aquí per poder accedir des de totes les funcions (variable global)
var ArrayRandom = new Array();
function crearCamps() {
    for (var i = 0; i < 10; i++) {
        // i = número de fila (pregunta 0,1,2...)
        document.getElementById( "containerPrincipal" ).innerHTML+=
            "<div class='row'>"+
                " <div class='col-md-3'></div>"+
                " <div id='contingutPrincipal' class='col-md-6'>"+
                      "<div class='row' name='nia"+i+"'>"+
                            "<div class='col-md-4'>"+
                                  "<label for='inputSend"+i+"'>Quin numero és?</label>"+
                                  "<span id='spanMissatge"+i+"'></span>"+
                            "</div>"+
                            "<div class='col-md-8'>"+
                                      "<input type='number' onfocusout='' min='1' max='9' class='form-control' name='inputSend"+i+"'>"+
                                      "<input type='number' onfocusout='' min='1' max='9' class='form-control' name='inputSend"+i+"'>"+
                                      "<input type='number' onfocusout='' min='1' max='9' class='form-control' name='inputSend"+i+"'>"+
                                      "<input type='number' onfocusout='' min='1' max='9' class='form-control' name='inputSend"+i+"'>"+
                                      "<input type='number' onfocusout='' min='1' max='9' class='form-control' name='inputSend"+i+"'>"+
                                  "<button id='btnConfirmar"+i+"' class='btn btn-block btn-primary' onclick='iguals("+i+")'>Confirmar</button>"+
                            "</div>"+
                      "</div>"+
                "</div>"+
                "  <div id='mostrarMissatge"+i+"' class='col-md-3'></div>"+
          "  </div>"
            ;
    }
    //guardem els numeros aleatoris y amaguem el botó de començar (no cal fer return perquè és global)
    ArrayRandom = crearRandom();
    document.getElementById( "btnReady" ).style.display = " none " ;
    document.getElementById("instruccions").style.display = " none ";
}
function crearRandom() {
    var min = 1;
    var max = 10;
    //creem array que retornarem al final de la funció
    var ArrayTemp = new Array();
    //creem 5 numeros aleatoris
    for (var i = 0; i < 5; i++) {
        //a cada posició (0-4) guardem un numero entre 1-10 (inclosos)
        ArrayTemp[i] = Math.floor(Math.random() * (max - min)) + min;
        console.log( " Posicio : " + i + " Valor : " + ArrayTemp[i] );
    }
    //retornem l'array amb els numeros aleatoris per recollir-los cuan cridem la funcio
    return ArrayTemp;
}
function checkCamps(fila) {
    //creem un array on guardarem els valors que ens han introduit en la fila corresponent (parametre funció fila)
    var ArraySend = new Array();
    //variable on guardarem cada input number sencer per despres canviar-li l'estil i comprovar el seu valor
    var inputSend;
    //variable per comprovar que tots els camps son entre 1 i 9
    var contadorErrors=0;
    //netejem l'estil per si hi havia algun camp erroni
    document.getElementById( "spanMissatge" + fila ).innerHTML = "";
    for (var i = 0; i < 5; i++) {
        //per cada posició, guardem l'input number
        inputSend = document.getElementsByName( "inputSend" + fila )[i];
        inputSend.style = "";
        //si no esta buit I es mes gran que 0 I es mes petit que 10 (s'ha de complir tot)
        if( (inputSend.value!="") && (inputSend.value>0) && (inputSend.value<10) ){
            //guardem el valor de l'input a l'array
            ArraySend[i] = inputSend.value;
            //fem que ja no es pugui escriure
            inputSend.disabled= true;
        }else{
            //mostrem missatge error per cada possible camp erroni
            document.getElementById( "spanMissatge" + fila ).innerHTML += "Has d'introduir el camp " +(i+1)+ " o no esta entre 1 i 9 !";
            inputSend.style = "border:2px solid red;";
            contadorErrors++;
        }
    }
    //si no hi ha hagut cap error
    if ( contadorErrors==0 ) {
        //fem que no es pugui tornar a comprovar els valors d'aquesta fila
        document.getElementById( "btnConfirmar" + fila ).disabled = true;
        //retornem per quan comprovem si estan en la seva posició
        return ArraySend;
    } else {
        return false;
    }
}
function checkValor(element, arr) {
    for (var i = 0; i < arr.length; i++) {
        if ( arr[i] == element ) {
            return true;
        }
    }
    return false;
}
function iguals(fila) {
    var contadorPosicio = 0;
    var contadorValor = 0;
    //array on guardem els valors un cop comprovats
    var ArraySend = checkCamps(fila);
    //comprovem que estas a la linia corresponent
    if( contadorFiles==fila ) {
          //si l'array esta ple (suposant que no retorni false)
          if( ArraySend ) {
              //augmentem per la comprovació d'errors
              contadorFiles++;
              for (var i = 0; i < ArraySend.length; i++) {
                  if ( ArraySend[i] == ArrayRandom[i] ) {
                      contadorPosicio++;
                  } else if ( checkValor(ArraySend[i],ArrayRandom) ) {
                      contadorValor++;
                  }
              }
              //mostrem quants acerts ha fet l'usuari
              document.getElementById( "mostrarMissatge"+fila).innerHTML +=
              "<div aria-live='polite' aria-atomic='true' style='position: relative; min-height: 200px;'>"+
              "<div class='toast"+fila+"' style='position: absolute; top: 0; right: 0;' data-autohide='false'>"+
              "  <div class='toast-header'>"+
                "  <strong class='mr-auto'>Fila : "+(fila+1)+"</strong>"+
                "  <button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>"+
                  "  <span aria-hidden='true'>&times;</span>"+
                  "</button>"+
              "  </div>"+
                "<div class='toast-body'>"+
                    "Hi ha " + contadorValor + " valors existents i hi ha " + contadorPosicio + " en la seva posició!"+
                "</div>"+
              "</div>"+
              "</div>";
              if(document.getElementsByClassName('.toast'+fila)[0]){
                document.getElementsByClassName('.toast'+fila)[0].toast('show');
              }


              if ( contadorPosicio==5 ) {
                  //document.getElementById( "containerPrincipal" ).style.display = " none ";
                  //has guanyat
                  document.getElementById("containerPrincipal").style.display = " none ";
                  document.getElementById( "btnReady" ).click = startConfetti() ;
                  document.getElementById( "missatgeFinal" ).innerHTML = (" <h1 style='text-align:center;'> Has guanyat! </h1>");

              } else if ( (fila==9) && (contadorPosicio<5) ) {
                  document.getElementById( "containerPrincipal" ).style.display = " none ";
                  //has perdut
                  document.getElementById( "missatgeFinal" ).innerHTML = (" has perdut! ");
              }
        }
    } else if ( contadorFiles<fila ) {
        alert( " t'has saltat alguna fila! " );
    }
}
