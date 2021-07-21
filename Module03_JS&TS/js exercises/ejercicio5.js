// ################# EJERCICIO 5  ##############################################
// Implementa una función para eliminar valores falsys de una estructura de 
// datos. Si el argumento es un objeto, deberá eliminar sus propiedades falsys. 
// Si el argumento es un array, deberá eliminar los elementos falsys. Si el 
// argumento es un objeto o un array no deberán ser mutados. Siempre deberá de 
// crear una estructura nueva. Si no es ni un objeto ni un array deberá de 
// devolver dicho argumento.

const elements = [0, 1, false, 2, "", 3];

const compact = (arg) => {
  const isString = (typeof arg === "string");
  const isPopulatedArray = !isString && Boolean(arg?.length);
  const isPopulatedObject = !isString && Boolean(arg && (Object.keys(arg))?.length);
  if (isPopulatedArray) {
    return arg.filter(value => Boolean(value));
  } else if (isPopulatedObject) {
    const newObject = {...arg};
    for (key in newObject) {
      if (!Boolean(newObject[key])){
        delete newObject[key];
      }
    }
    return newObject;
  } else {
    return arg;
  }
};


console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact(elements)); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}

console.log(compact(undefined)); // undefined
console.log(compact(NaN)); // NaN
console.log(compact(0)); // 0
console.log(compact([])); // []
console.log(compact("hola")); // hola
