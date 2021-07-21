// ################# EJERCICIO 1 CON EXTRA ####################################
// Un texto en formato CSV tiene el nombre de los campos en la primera fila y 
// los datos en el resto, separados por comas. Crea un parseador que reciba un 
// string en formato CSV y devuelva una colección de objetos. Utiliza 
// destructuring, rest y spread operator donde creas conveniente.
// Extra: Añade un segundo argumento a la función para indicar el número de 
// atributos a añadir. Si dicho argumento no es informado cada objeto tendrá 
// todos los atributos.

const data = `id,name,surname,gender,email,picture
15519533,Raul,Flores,male,raul.flores@example.com,https://randomuser.me/api/portraits/men/42.jpg
82739790,Alvaro,Alvarez,male,alvaro.alvarez@example.com,https://randomuser.me/api/portraits/men/48.jpg
37206344,Adrian,Pastor,male,adrian.pastor@example.com,https://randomuser.me/api/portraits/men/86.jpg
58054375,Fatima,Guerrero,female,fatima.guerrero@example.com,https://randomuser.me/api/portraits/women/74.jpg
35133706,Raul,Ruiz,male,raul.ruiz@example.com,https://randomuser.me/api/portraits/men/78.jpg
79300902,Nerea,Santos,female,nerea.santos@example.com,https://randomuser.me/api/portraits/women/61.jpg
89802965,Andres,Sanchez,male,andres.sanchez@example.com,https://randomuser.me/api/portraits/men/34.jpg
62431141,Lorenzo,Gomez,male,lorenzo.gomez@example.com,https://randomuser.me/api/portraits/men/81.jpg
05298880,Marco,Campos,male,marco.campos@example.com,https://randomuser.me/api/portraits/men/67.jpg
61539018,Marco,Calvo,male,marco.calvo@example.com,https://randomuser.me/api/portraits/men/86.jpg`;

const fromCSV = (csv, nFields) => {
  const csvLines = csv?.split(/\r\n|\n/);
  const result = [];
  let propNames = (csvLines?.splice(0,1))[0]?.split(",");
  const isNumber = !Boolean((typeof nFields).localeCompare("number"));
  propNames =  (nFields && isNumber)?propNames.slice(0,nFields):propNames;
  while(csvLines?.length>0){
    const values = (csvLines.splice(0,1))[0].split(",");
    const newObj = propNames?.reduce((acc, curr, index)=> {acc[curr]=values[index]; return acc;},{});
    result.push(newObj)
  }
  return result;
};

const result = fromCSV(data, 12);
console.log(result);


/*
Formato del resultado:

[
  {
    id: "15519533",
    name: "Raul",
    surname: "Flores",
    gender: "male",
    email: "raul.flores@example.com",
    picture: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: "82739790",
    name: "Alvaro",
    surname: "Alvarez",
    gender: "male",
    email: "alvaro.alvarez@example.com",
    picture: "https://randomuser.me/api/portraits/men/48.jpg"
  },
  {
    ...
  }
]
*/