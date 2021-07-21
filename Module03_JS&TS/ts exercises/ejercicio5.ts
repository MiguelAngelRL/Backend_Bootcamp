//####################### Ejercicio 5 #########################################
// Mediante genéricos y tuplas, tipa de forma completa la función para 
// solventar los errores de compilación.

const swap = <T,Z>(arg1: T, arg2: Z): [Z,T] => {
  return [arg2, arg1];
};

let age: number, occupation: string;

[occupation, age] = swap(39, "Placement officer");
console.log("Occupation: ", occupation);
console.log("Age: ", age);

[age, occupation] = swap("Another", 99);
console.log("Occupation: ", occupation);
console.log("Age: ", age);