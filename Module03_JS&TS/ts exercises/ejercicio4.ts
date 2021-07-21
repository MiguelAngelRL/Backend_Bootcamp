//####################### Ejercicio 4 #########################################
// Utilizando las misma interfaz de Student, de los ejercicios anteriores 
// arregla los errores de TypeScript para podamos pasar aquellos criterios que 
// necesitemos sin tener que pasar toda la información de un Student. Arregla 
// los subsiguientes errores que aparezcan al asignar tipo a criteria.

interface Student {
  name:string;
  age: number;
  occupation: string;
}

const initialCriteria = {} as Student;

const students: Student[] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Emily Coleman",
    age: 25,
    occupation: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    occupation: "Placement officer",
  },
];


const filterStudentsBy = (students: Student[], criteria: Partial<Student>): Student[] => {
  criteria ?? initialCriteria;
  return students.filter((user) => {
    const criteriaKeys = Object.keys(criteria);
    return criteriaKeys.every((fieldName) => {
      return criteria[fieldName] === user[fieldName];
    });
  });
};

const logStudent = ({ name, occupation }: Student) => {
  console.log(`  - ${name}, ${occupation}`);
};

console.log("Students of age 35:");
filterStudentsBy(students, { age: 35 }).forEach(logStudent);
console.log("Students of name 'Bruce Willis':");
filterStudentsBy(students, { name: "Bruce Willis" }).forEach(logStudent); 
