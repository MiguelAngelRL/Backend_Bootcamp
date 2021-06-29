# Introducción

Aquí tienes el enunciado del modulo 2, creat un repo en Github, y añade un readme.md
incluyendo enunciado y consulya (lo que pone aquí _Pega aquí tu consulta_)

# Basico

## CRUD

Crear una BBDD y hacer CRUD

## Restaurar backup

Vamos a restaurar el set de datos de mongo atlas _airbnb_.

Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ?usp=sharing

Para restaurarlo puede seguir las instrucciones de este videopost:
https://www.lemoncode.tv/curso/docker-y-mongodb/leccion/restaurando-backup-mongodb

> Acuerdate de mirar si en opt/app hay contenido de backups previos que tengas
> que borrar

## General

En este base de datos puedes encontrar un montón de apartementos y sus
reviews, esto está sacado de hacer webscrapping.

**Pregunta** Si montarás un sitio real, ¿Qué posible problemas pontenciales
les ves a como está almacenada la información?

```md
1.- Documentos muy grandes, problemas con working set
2.- Busquedas muy lentas, posibles time outs
3.- Actualizaciones de datos muy lentas, posibles time outs
```

## Consultas

### Basico

- Saca en una consulta cuantos apartamentos hay en España.

```js
db.listingsAndReviews.find({"address.country": "Spain"}).count()
```

- Lista los 10 primeros:

  - Sólo muestra: nombre, camas, precio, government_area
  - Ordenados por precio.

```js
db.listingsAndReviews
    .find({},{title:1, beds: 1, price: 1,"address.government_area": 1})
    .limit(10)
    .sort({price:1})
```

### Filtrando

- Queremos viajar comodos, somos 4 personas y queremos:
  - 4 camas.
  - Dos cuartos de baño.

```js
db.listingsAndReviews.find({beds: 4, bathrooms: 2})
```

- Al requisito anterior,hay que añadir que nos gusta la tecnología
  queremos que el apartamento tenga wifi.

```js
db.listingsAndReviews.find({beds: 4, bathrooms: 2, amenities: {$all: ["Wifi"]}}).count()
```

- Y bueno, un amigo se ha unido que trae un perro, así que a la query anterior tenemos que
  buscar que permitan mascota _Pets Allowed_

```js
db.listingsAndReviews.find({beds: 4, bathrooms: 2, amenities: {$all: ["Wifi", "Pets allowed"]}})
```

### Operadores lógicos

- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen, peeero... queremos que
  el precio nos salga baratito (50 $), y que tenga buen rating de reviews

```js
db.listingsAndReviews.find({
    $or: [
        {"address.market": "Barcelona"}, 
        {"address.country": "Portugal"}
    ],
    "price": {$lte: 50},
    "review_scores.review_scores_rating": {$gte: 85}
})
```

## Agregaciones

# Basico

- Queremos mostrar los pisos que hay en España, y los siguiente campos:
  - Nombre.
  - De que ciudad (no queremos mostrar un objeto, sólo el string con la ciudad)
  - El precio (no queremos mostrar un objeto, sólo el campo de precio)

```js
db.listingsAndReviews.aggregate([
  {$match: {"address.country": 'Spain'}},
  {$project: {nombre: "$name", precio: {$toDouble: "$price"}, ciudad: "$address.market", _id: 0}}
])
```

- Queremos saber cuantos alojamientos hay disponibles por pais.

```js
db.listingsAndReviews.aggregate([
    {$group: {_id: "$address.country", total_alojamientos: {$sum: 1}}}, 
    {$project: {_id: 0,pais: "$_id", total_alojamientos: 1}},
    {$sort: {pais: 1}}
])
```

# Opcional

- Queremos saber el precio medio de alquiler de airbnb en España.

```js
db.listingsAndReviews.aggregate([
    {$match: {"address.country": "Spain"}},
    {$group: {_id: "$address.country", average: {"$avg": "$price"}}}, 
    {$project: {pais:"$_id", precio_medio: {$round: [{$toDouble: "$average"}, 2]}, _id:0}}
])
```

- ¿Y si quisieramos hacer como el anterior, pero sacarlo por paises?

```js
db.listingsAndReviews.aggregate([
    {$group: {_id: "$address.country", average: {"$avg": "$price"}}}, 
    {$project: {pais:"$_id", precio_medio: {$round: [{$toDouble: "$average"}, 2]}, _id:0}},
    {$sort: {pais: 1}}
])
```

- Repite los mismos pasos pero agrupando también por numero de habitaciones.

```js
db.listingsAndReviews.aggregate([
    {$group: {_id: ["$address.country", "$beds"], average: {"$avg": "$price"}}},
    {
        $project: {
            pais: { $arrayElemAt: [ "$_id", 0 ] }, 
            camas: { $arrayElemAt: [ "$_id", 1 ] },
            precio_medio: {$round: [{$toDouble: "$average"}, 2]}, 
            _id:0
        }
    },
    {$sort: {pais: 1, camas: 1}}
])
```
# Desafio

Queremos mostrar el top 5 de apartamentos más caros en España, y sacar
los siguentes campos:

- Nombre.
- Ciudad.
- Amenities, pero en vez de un array, un string con todos los ammenities.

```js
db.listingsAndReviews.aggregate([
    {$match: {"address.country": "Spain"}}, 
    {$sort: {price: -1}}, 
    {$limit: 5}, 
    {$project: {
        _id:0,
        nombre: "$name",
        ciudad: "$address.market",
        precio: {$toDouble: "$price"},
        amenities: {$reduce: {
            input: "$amenities",
            initialValue: "",
            in: {
                "$cond": {
                    "if": { "$eq": [ "$$value", "" ] },
                    "then": "$$this",
                    "else": {"$concat": ["$$value", ", ", "$$this"]}
                }
            }
        }} 
    }}
])
```