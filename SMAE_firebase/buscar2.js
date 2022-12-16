const HTMLResponse = document.querySelector("#app");
const ul = document.createElement("ul");

var texto;
var contador = 0;
//expresion regular que valida las palabras que pueden ser buscadas
//en este caso son: Caracter de Palabra (a-z, A-Z, 0-9, _) incluido
//Espacios de cualquier tipo. (espacio, tab, nueva linea) y
//[\w\s]*
//pueden venir  0 o mas palabras o simbolos
const exp = /[\w\s]*/;
//funcion asincrona consume la API e imprime el resultado
async function buscar() {
  //se guarda el texto introducido por el usuario en la variable Texto que es la palabra a buscar
  texto = document.querySelector("input").value;
  //Promesa que se tiene que cumplir, consumir la base de datos para poder avanzar
  const respuesta = await fetch(
    //link que del archivo que enlaza al programa con la base de datos
    "https://smae-77888-default-rtdb.firebaseio.com/SMAE.json"
  );
  //guarda la base de datos en una variable que la recibe de un archivo
  const data = await respuesta.json();
  //Guarda dentro de nameverduras cada elemento de la base de datos
  const nameVerdura = data.map((data) => data.Alimento);
  //guarda la expresion objeto de busqueda dentro de la variable busqueda//exp.source + texto + exp.source,
  const busqueda = new RegExp(exp.source + texto + exp.source, "gi");
  //variable que guarda las coincidencias cada que se recorre la base de datos
  let match;
  //valida si el usuario ingreso texto en el recuadro input
  if (texto == "") {
    document.getElementById("Contador").innerHTML =
      "No se detectó texto, vuelva intentarlo";
  } else {
    document.getElementById("Contador").innerHTML =
      "coincidencias encontradas:";
    //mientras las coincidencias encontradas dentro de los elementos recorridos se encuentre la busqueda,
    //dicho de otra forma, mientras se detecte un numero de coincidencia diferente a nulo, entonces:
    while ((match = busqueda.exec(nameVerdura)) !== null) {
      //se crea un nuevo elemento de tipo lista
      let elem = document.createElement("li");
      //el elemento se guarda dentro de un nodo tipo texto donde se
      //le asignara la coincidencia que encuentre
      elem.appendChild(document.createTextNode(`${match[0]} `));
      //cada elemento se guardara dentro de una lista, esto quiere decir que el
      //elemento sera un nodo hijo de la listaa nueva creada
      ul.appendChild(elem);
    }
    //Despues de generar la lista, esta se pasara a como nodo hijo de el documento insertandose
    //en la elemento que tenga el ID= app, este se desplegara como un contenedor de
    //informacion ya visible para el usuario
    HTMLResponse.appendChild(ul);
  }
}
