var texto;
var contador = 0;

//funcion asincrona consume la API e imprime el resultado
async function buscar() {
  //se guarda el texto introducido por el usuario en la variable Texto que es la palabra a buscar
  texto = document.querySelector("input").value;
  //Promesa que se tiene que cumplir, consumir la base de datos para poder avanzar
  const respuesta = await fetch(
    //link que del archivo que enlaza al programa con la base de datos
    "https://smae-77888-default-rtdb.firebaseio.com/SMAE.json"
  );
  const data = await respuesta.json();
  const expr = new RegExp(texto, "i");
  if (texto == "") {
    document.getElementById("Contador").innerHTML =
      "No se detectó texto, vuelva intentarlo";
  } else {
    data.forEach((elemento) => {
      if (expr.test(elemento.Alimento)) {
        contador++;
        document.getElementById("app").innerHTML += `
				<div class="Alimento">
					<h3 ">${elemento.Alimento}</h3>
					<ul >
						<li><b>Categoría: </b> ${elemento.Categoría}</li>
						<li><b>Cantidad disponible: </b> ${elemento.Cantidad}</li>
						<li><b>PesoBrutoG: </b> ${elemento.PesoBrutoG}</li>
						<li><b>EnergíaKcal: </b> ${elemento.EnergíaKcal}</li>
					</ul>
				</div>
			`;
      }
      document.getElementById("Contador").innerHTML =
        "Coincidencias encontradas: " + contador;
    });
  }
}
