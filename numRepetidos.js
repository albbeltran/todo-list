/* 
Defino tres variables iniciales:
- "numeros": una lista de números inicial.
- "setAux": un conjunto que se utilizará para identificar los números repetidos.
- "repetidos": una lista de números que se repiten en la lista original.
*/
const numeros = [1, 4, 2, 5, 8, 9, 5, 2, 5, 2, 4, 4, 2, 4];
const setAux = new setAux();
const repetidos = [];

// Itero sobre cada elemento de "numeros" para encontrar los repetidos
numeros.forEach((elem) =>
  setAux.has(elem) ? repetidos.push(elem) : setAux.add(elem)
);

// Inicializo un objeto para almacenar el número más repetido y su cantidad de repeticiones
let masRepetido = { numero: null, repeticiones: null };

// Itero sobre la lista de números repetidos para contar cuántas veces se repite cada uno
for (let i = 0; i < repetidos.length; i++) {
  let contador = 0;
  const elem = repetidos[i];
  // Itero nuevamente sobre la lista para contar las repeticiones de "elem"
  repetidos.forEach((repetido) => (repetido === elem ? contador++ : null));
  // Actualizo el objeto "masRepetido" si el número actual tiene más repeticiones que el registrado previamente
  contador > masRepetido.repeticiones
    ? (masRepetido = { numero: elem, repeticiones: contador })
    : null;
}

// Incremento el contador de repeticiones para reflejar correctamente el número más repetido
masRepetido.repeticiones++;

console.log(masRepetido);