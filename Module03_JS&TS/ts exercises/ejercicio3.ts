//####################### Ejercicio 3 #########################################
// Con el resultado del ejercicio 2, sustituye la función logUser por la 
// siguiente y modifica el código aplicando las guardas que creas conveniente 
// para corregir los errores de compilación:
//
//      const logUser = (user: User) => {
//        let extraInfo: string;
//        if (user.occupation) {
//          extraInfo = user.occupation;
//        } else {
//          extraInfo = user.subject;
//        }
//        console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
//      };
//
// Extra: Crea dos funciones isStudent e isTeacher que apliquen la guarda y 
// úsalas en la función logPerson. Aplica tipado completo en la función 
// (argumentos y valor de retorno). Utiliza is.

interface Teacher {
  name: string;
  age: number;
  subject: string;
}

interface Student {
  name:string;
  age: number;
  occupation: string;
}

type User = Teacher | Student;

const users: User[] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Jane Doe",
    age: 41,
    subject: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    subject: "Biology", 
  },
];

//##### Primera implementación sin "is" #####
// const logUser1 = (user: User) => {
//   let extraInfo: string|undefined = "No extra info";
//   if ("occupation" in user) {
//     extraInfo = user.occupation;
//   } else {
//     extraInfo = user.subject;
//   }
//   console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
// };

// users.forEach(logUser1);


//##### Segunda implementación con "is" #####
const isTeacher = (usuario: User): usuario is Teacher => {
  return (usuario as Teacher)?.subject ? true : false;
}

const isStudent = (usuario: User): usuario is Student => {
    return (usuario as Student)?.occupation ? true : false;
}

const logUser = (user: User) => {
  let extraInfo: string|undefined = "No extra info";
  if (isStudent(user)) {
    extraInfo = user.occupation;
  } else if (isTeacher(user)){
    extraInfo = user.subject;
  }
  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

users.forEach(logUser);

