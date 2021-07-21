// ################# EJERCICIO 2 ##############################################
// Implementar una funcion replaceAt que tome como primer argumento un array, 
// como segundo argumento un índice y como tercer argumento un valor y 
// reemplace el elemento dentro del array en el índice indicado. El array de 
// entrada no debe de ser mutado, eso es, que debes crear un nuevo array sin 
// modificar el existente.

const elements = ["lorem", "ipsum", "dolor", "sit", "amet"];
const index = 2;
const newValue = "furor";

const replaceAt = (arr, index, newElement) => {
  const newArr = [...arr];
  newArr[index]=newElement;
  return newArr;
}

const result = replaceAt(elements, index, newValue);
console.log(result === elements); // false
console.log(result); // ['lorem', 'ipsum', 'furor', 'sit', 'amet'];