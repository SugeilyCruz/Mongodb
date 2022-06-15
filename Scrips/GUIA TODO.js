db.prueba.insert({ 
title: 'Introduccion a MongoDB',  
description: 'MongoDB es una base de datos NoSQL', 
by: 'FES Aragon', 
url: 'https://www.aragon.unam.mx', 
tags: ['mongodb', 'database', 'NoSQL'], 
likes: 100 
}) 

//-----------------------------------------------------------------------------------------------------CLASE 1

db.getCollectionInfos()
db.createCollection("prueba2",{ })
db.createCollection("prueba3", { capped : true, autoIndexId : true, size : 6142800, max : 10000 } )

db.createCollection(
    "tiempo24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "data",
          granularity: "hours"
       },
       expireAfterSeconds: 86400
    }
)
    
db.tiempo24h.insertMany( [
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T04:00:00.000Z"),
      "temp": 11
   }
   ]
)

db.tiempo24h.find()
   
db.inventario.insertMany([ //tiene que tener un arreglo de elementos, cuando se ocupa insertMany
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
])

db.inventario.find()
db.inventario.count()
db.inventario.getCollection()
//Eliminar la collection prueba2 (es sencible a mayusculas)
db.prueba2.drop()
db.prueba2.find()

//Utilizar JS en MongoDB
db.alumnos.findOne()
var campos = db.alumnos.findOne()
for(campo in campos){ print(campo); }

campos

show collections
db.alumnos.find()
db.alumnos.find().count()//Contar los documentos resultantes de una busqueda, a nivel find()
db.alumnos.count()//Contar los documentos de la collection, a nivel collection

db.alumnos.find()//select * from alumnos
db.alumnos.find({sexo:'F'})//select * from alumnos where sexo = 'F'
db.alumnos.find({sexo:'F'}).count()//saber cuantas F tengo
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0})//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F'
db.alumnos.find({sexo:'F'},{nombres:1,ap_paternos:1,curps:1,edades:1})//con campos que no existen(Estado Laxo)
db.alumnos.find({sexo:'F'},{nombre:0,ap_paterno:0,curp:0,edad:0, _id:0})//se muestran los demas (1-muestra, 0-no muestra)

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno ADC, nombre ADC
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1})

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno DESC, nombre DESC
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:-1, nombre:-1})

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno, nombre limit 5
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1}).limit(5)

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno, nombre limit 5, 5
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1}).skip(5).limit(5)

db.alumnos.find({sexo:'F'}).count()
//Nombres compuestos entre comillas, los sencillos no. Y todo lo toma como un and(automatico)
db.alumnos.find({sexo:'F',"edad.anios":28}).count() 

//operador OR, los operadores empiezan con $
db.alumnos.find({$or: [{sexo:'F'},{"edad.anios":28}]}).count() 
db.alumnos.find({$and: [{sexo:'F'},{"edad.anios":28}]}).count() 

//-----------------------------------------------------------------------------------------------------CLASE 2
var s = {sexo: 'F'}
var p = {nombre:1,ap_paterno:1,curp:1,edad:1,_id:0}
var o = {ap_paterno:1, nombre:1}
s
p
//Utilizar variables en operaciones MongoDB
db.alumnos.find(s,p).sort(o)

//Utilizar funciones de JS en operaciones MongoDB
db.alumnos.find(s,p).sort(o).forEach(function(f){print(tojson(f,'',true));})

db.alumnos.find(s,p).sort(o).forEach(function(f){print(tojson(f.edad,'',true));})

db.alumnos.find(s,p).sort(o).forEach(function(f){print(f.edad);})

//Operadores relacionales $eq, $gt, $gte, $lt, $lte, $in, $nin y $ne

//Filtro y proyeccion
db.alumnos.find({sexo:'F'}, {nombre:1,ap_paterno:1,curp:1,_id:0})
//Solo filtro
db.alumnos.find({sexo:'F'}) 
//Solo proyeccion
db.alumnos.find({}, {nombre:1,ap_paterno:1,curp:1,_id:0})

//Operadores relacionales $eq, $gt, $gte, $lt, $lte, $in, $nin y $ne
db.alumnos.find({sexo:{$eq:'F'}}).count()//(la llave de nuestro filtro,el campo sexo y evalua el operador) que sean igual
db.alumnos.find({sexo:{$ne:'F'}}).count() //no igual
db.alumnos.find({sexo:{$eq:'M'}}).count()

//distinct me muestra los valores unicos (Lista ordenada)
db.alumnos.distinct("sexo") 
db.alumnos.distinct("nombre") 

db.alumnos.distinct("nombre", {sexo:{$eq:'F'}})

db.alumnos.distinct("nombre", {$and:[{sexo:{$eq:'F'}}, {nombre:{$gt:'PATITO23'}}]} )//cada operador debe de llevar sus propias llaves

db.alumnos.find({nombre:{$gt:'V'} }, {nombre:1, _id:0}).sort({nombre:1})


db.alumnos.find({"edad.anios":{$gte:30}},
{nombre:1, "edad.anios":1, _id:0}).sort({"edad.anios":1}).count() //mayor o iguala 30

db.alumnos.find(
{ },//priemr parametro es el filtro siempre.
{"edad.anios":1,nombre:1, _id:0})
.sort({"edad.anios":-1}).limit(5) //primero 5 alumnos con mayor edad

db.alumnos.find({"edad.anios":{$lt:30}}, //lte menores que 30 /lte menores o iguales que
{nombre:1, "edad.anios":1, _id:0}).sort({"edad.anios":1}).count()

//IN (lista de valores) evaluando
db.alumnos.find(
 {"nombre":{$in:["ALDO","JESSICA","ANDREA","ADRIAN"]}},
 {nombre:1, ap_paterno:1, "edad.anios":1, _id:0}).sort({nombre:1}).count()
 
//NOT IN negacion
db.alumnos.find(
 {nombre:{$nin:["ALDO","JESSICA","ANDREA","ADRIAN"]}},
 {nombre:1, ap_paterno:1, "edad.anios":1, _id:0}).sort({nombre:1}).count()

//Evaluar si existe un campo, lo primero que haremos en un sistema laxo.
db.alumnos.find(
 {curp:{$exists:true}}, //(true/false o (1/0)
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()
 
db.alumnos.find(
 {curp:{$exists:0}}, //(true/false o (1/0)
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()
 
db.alumnos.find(
 {curp:{$exists:0}, sexo:'M'}, //(true/false o (1/0)
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()
 
db.alumnos.find(
 {$and:[{curp:{$exists:false}}, {sexo:{$eq:"M"}}]}, //(true/false o (1/0)
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()

db.alumnos.find(
 {$or:[{curp:{$exists:0}}, {sexo:{$exists:0}},{email:{$exists:0}},{edad:{$exists:0}}]}, //(true/false o (1/0) que le falten algunos
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()
 
db.alumnos.find(
 {$and:[{curp:{$exists:0}}, {sexo:{$exists:0}},{email:{$exists:0}},{edad:{$exists:0}}]}, //(true/false o (1/0) que te falten todos
 {nombre:1, ap_paterno:1, curp:1, _id:0}).sort({nombre:1}).count()
 
db.alumnos.find(
 {$and:[{curp:{$exists:1}}, {sexo:{$exists:1}},{email:{$exists:1}},{edad:{$exists:1}}]}, //(true/false o (1/0) 
 {}).count()

var y = {$and:[{curp:{$exists:1}}, {sexo:{$exists:1}},{email:{$exists:1}},{edad:{$exists:1}}]}
db.alumnos.find(
 y, //(true/false o (1/0) 
 {}).count()
 
 //-----------------------------------------------------------------------------------------------------CLASE 3
 //$type - tipos de datos de nuestra collections(Lista)
db.alumnos.find({"curp":{$type:"number"}}).count()
db.alumnos.find({"curp":{$type:"string"}}).count()
db.alumnos.find({"curp":{$type:2}})
db.alumnos.find({"curp":{$type:19}}).count()

db.direcciones.insertMany(
[
  {"_id":1, direccion:"Av Rancho seco SN", cp: "57200", "alumnos": [ "Juan", "Ana", "Pedro" ]},
  {"_id":2, direccion:"Av Universidad 3000", cp: 30300},
  {"_id":3, direccion:"Av Central 5000", cp: NumberLong(56234), "posgrado": true},
  {"_id":4, direccion:"Las Palmas 4", cp: NumberInt(56330), "preferencias": {
        "seguimientoEmails": false,
        "idioma": "Español",
        "zonaHoraria": 5
    }},
  {"_id":5, direccion:"Bosques de Africa 2", cp: ["57200", "57201"], "fecha" : ISODate("2020-01-08T08:52:30.038Z")},
  {"_id":6, direccion:"Bosques de Africa 2", cp: {codigo:"57200", zp:"57201"}}
]
)
  
db.direcciones.insertMany(
  [
  {"_id":7, 
  direccion:"Bosques de Africa 2", cp: [
   {codigo:"57200", zp:"57201"},
   {codigo:"58200", zp:"58201"},
   {codigo:"59200", zp:"59201"}
   ]
  },
  {"_id":8, 
  direccion:"Bosques de Africa 2", cp: [
   ["57200", 57201],
   ["58200", 58201],
   ["59200", 59201]
   ]
  },
  {"_id":9, direccion:"Bosques de Africa 2", "cp" : ISODate("2020-01-08T08:52:30.038Z")}
  ]
)
  
db.direcciones.insert({"_id":10, direccion:"Bosques de Africa 2", "cp" : true})
db.direcciones.insert({"_id":11, direccion:"Av Universidad 3000", cp: 30.300})
  
db.direcciones.find().count()
db.direcciones.find({"cp":{$exists:1}})

//Double
db.direcciones.find({"cp":{$type:1}})
db.direcciones.find({"cp":{$type:"Double"}})

//String
db.direcciones.find({"cp":{$type:2}})
db.direcciones.find({"cp":{$type:"String"}})

//Object
db.direcciones.find({"cp":{$type:3}})
db.direcciones.find({"cp":{$type:"object"}})

//Object
db.direcciones.find({"cp":{$type:4}})
db.direcciones.find({"cp":{$type:"array"}})

//ObjectId
db.direcciones.find({"cp":{$type:7}})
db.direcciones.find({"cp":{$type:"objectId"}})

db.direcciones.find({"_id":{$type:7}})
db.direcciones.find({"_id":{$type:"objectId"}})

db.direcciones.find({"_id":{$type:7}})
db.direcciones.find({"cp":{$type:"objectId"}})

//Boolean
db.direcciones.find({"cp":{$type:8}})
db.direcciones.find({"cp":{$type:"bool"}})

//Date
db.direcciones.find({"cp":{$type:9}})
db.direcciones.find({"cp":{$type:"date"}})

//null
db.direcciones.find({"cp":{$type:10})
db.direcciones.find({"cp":{$type:"null"}})

//int 
db.direcciones.find({"cp":{$type:16}})
db.direcciones.find({"cp":{$type:"int"}})

//decimal
db.direcciones.find({"cp":{$type:19}})
db.direcciones.find({"cp":{$type:"decimal"}})

//int
db.direcciones.find({"cp":{$type:"number"}})

db.alumnos.find({"edad.anios":{$gte:30}}).count()

//Operador de expresion $expr
db.alumnos.find({$expr:{$gt:["$edad.dias","$edad.anios"]}}).count()

//Buscar alumnos mayores de 30 anios
db.alumnos.find({
    $expr: { 
            $gt: [
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 30] },
                        then: { $divide:["$edad.anios", 2] },
                        else: { $divide:["$edad.anios", 3] }
                    }
                }, 
                10
            ]
        }
    })
    
db.alumnos.find({
    $expr: { 
            $gt: [
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 28] },
                        then: { $divide:["$edad.anios", 2] },
                        else: { $divide:["$edad.anios", 3] }
                    }
                }, 
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 28] },
                        then:  "$edad.meses" ,
                        else:  "$edad.dias" 
                    }
                }
            ]
        }
    }).count()
//14.5>11 object 16
db.alumnos.find({ 
    $and:[
    {
    $expr: { 
        $gt:[
            {
                $cond:{
                    if:{ $gte:["$edad.anios", 28]},
                    then:{ $divide:["$edad.anios", 2]},
                    else:{ $divide:["$edad.anios", 3]}
                }
            },
            {
                $cond:{//[- recibe mas de dos cosas y {- cuado es una.
                    if:{ $gte:["$edad.anios", 28]},//esta evaluando un operador, inicia con llave o multiple condicion
                    then: "$edad.meses" ,//no es operador, es un obejto 
                    else: "$edad.dias" 
                }
            }
        ] 
    } 
    },
    { edad:{ $exists:1} }
   ]
}).count()

//-----------------------------------------------------------------------------------------------------CLASE 4
db.getCollection('alumnos').find({evaluaciones:{$exists:1}}).count()
db.getCollection('alumnos').find({materias:{$exists:1}}).count()

//BUSCA TODOS LOS ELEMENTOS PRESENTES EN UN ARREGLO. LO QUE METAMOS EN LA LISTA SE EVALUA COMO AND(TODOS DEBEN DE ESTAR PRESENTES EN EL ARREGLO)
//all busca todos los elementos de la lista de un arreglo.
db.alumnos.find({materias:{$all:["ESPAÑOL","MATEMATICAS"] }}) 
db.alumnos.find({materias:{$all:["ESPAÑOL","MATEMATICAS",
    "HISTORIA",
    "QUIMICA",
    "FISICA"] }}).count() 
db.alumnos.find({materias:{$all:["ESPAÑOL","ETICA"] }}) 
db.alumnos.find({materias:{$all:["ETICA","MATEMATICAS"] }}).count()
db.alumnos.find({materias:{$all:["ETICA"] }}).count() 

// elemMatch evalua un valor en un arreglo. (in,or,and,etc) 
//EVALUA ELEMENTO POR ELEMENTO DENTRO DE UN ARREGLO. necesita un operador(in)
db.alumnos.find({materias:{$elemMatch:{ $in:["ESPAÑOL","ETICA"] } }}).count()

//EVALUA CADA ELEMENTO Y MUESTRA LOS QUE SON MAYOR E IGUAL A QUIMICA.
db.alumnos.find({materias:{$elemMatch:{ $gte:"QUIMICA" } }}).count()

//"elemMatch" porque lo ocupamos en un segundo nivel
db.alumnos.find({
    evaluaciones:{
            $all:[
                {"$elemMatch":{materia:{$gte:"M"}, calificacion:{$lte:5 }}} //Por default es un AND
        ]
    }
}).count()

db.alumnos.find({
    evaluaciones:{
            $all:[
                {"$elemMatch":{$or:[{materia:{$gte:"M"}}, {calificacion:{$lte:5 }}]}}//Or recibe una serie de evaluaciones.
        ]
    }
}).count()

//EVALUA ARREGLOS SIZE
db.alumnos.find({materias:{$size:4}}).count()

db.alumnos.find({ $expr:{ $gte:[{$size:"$materias"},4]}}).count()//$porque pasa como elemento que pasa por adentro de mi campo.
db.alumnos.find({ $where:"this.materias.length>4"}).coun()

db.alumnos.find({ $where:"this.nombre == 'ALDO'"}).count() //elemento jscrip
db.alumnos.find({ $where:"this.nombre.length == 4" }).count()

db.alumnos.find({ $where:function(){ 
    return ( hex_md5(this.nombre) == '97f9b8b5f3ff0c65246e0c2b8acfae30')//si aldo en hexadecimal es igual a 97... me regresa un verdadero
    }
}).count()


//-----------------------------------------------------------------------------------------------------CLASE 5
//EXPRESIONES REGULARES

//Inician con una letra o cadena

//USANDO EL OPERADOR REGEX
//no haya nada antes de R y todo lo demas no importa que haya
db.alumnos.find({nombre:{$regex:"^R.*$"}},{nombre:1,_id:0}) 
//option insensible a mayusculas
db.alumnos.find({nombre:{$regex:"^r.*$", $options:"i"}},{nombre:1,_id:0}) 

//EVALUANCDO DIRECTAMENTE
//Evaluar una expresion regular directamentem
db.alumnos.find({nombre:/^R/},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/^r/i},{nombre:1,_id:0})

//Terminan con una letra o cadena
db.alumnos.find({nombre:{$regex:".*ER$"}},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/.*r$/i},{nombre:1,_id:0}) //insensible a mayusculas con i

//Contiene una letra
db.alumnos.find({nombre:{$regex:".*R.*"}},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/.*r.*$/i},{nombre:1,_id:0})

//Contiene la cadena "jose"
db.alumnos.find({nombre:/.*jose.*$/i},{nombre:1,_id:0})

//Inician con la cadena jose
db.alumnos.find({nombre:/^jose.*/i},{nombre:1,_id:0})

//Termina con la cadena jose
db.alumnos.find({nombre:/.*jose$/i},{nombre:1,_id:0})

//Terminen con jose pero de forma unica y ordenada
db.alumnos.distinct("nombre",{nombre:/.*jose$/i}).sort()

//Contiene la cadena jose, insensible a mayusculas de forma unica y ordenada
db.alumnos.distinct("nombre",{nombre:/.*jose.*/i}).sort()

//Negar el resultado de una expresion regular
db.alumnos.distinct("nombre",{nombre:{$not:/.*jose$/i}}).sort()

db.alumnos.find({ciudad:{$exists:1}})
db.alumnos.distinct("ciudad")

//Alumnos que contienen la palabra jose que no vivan en queretaro
db.alumnos.find({
    $and:[
    {nombre:/.*jose.*/i},
    {ciudad:{$not:/.*quer.*/i}},
    {ciudad:{$exists:1}}
    ]
    },{nombre:1,ciudad:1,_id:0}).sort({ciudad:1})
    
//Buscar los alumnos que contengan jose o maria
db.alumnos.find({nombre:/.*jose|maria.*$/i},{nombre:1,_id:0})

//Buscar los alumnas que contengan jose o inicien con maria
db.alumnos.distinct("nombre",{nombre:/(jose|^maria)/i},{nombre:1,_id:0}).sort()

//Buscar los alumnos que terminen con jose o inicien con maria
db.alumnos.distinct("nombre",{nombre:/(jose$|^maria)/i},{nombre:1,_id:0}).sort()

//Listar todas las formas de escritura de la ciudad de queretaro
db.alumnos.distinct("ciudad",{ciudad:/(quer|qro)/i})// dos parametros dentro de la expresion regular // () opciones de or

db.alumnos.distinct("ciudad",{ciudad:{$in:[/.*quer.*/i, /.*qor.*/i]}}) // aqui se pasan dos opciones

db.alumnos.distinct("ciudad",{ciudad:{$in:[/.*quer.*/i, /.*qor.*/i, "CORREGIDORA"]}})

//lISTAR TODAS LAS CIUDADES QUE NO SEAN QUERETARO
db.alumnos.distinct("ciudad",{ciudad:{$not:{$in:[/.*quer.*/i, /.*qor.*/i]}}}) 
db.alumnos.distinct("ciudad",{ciudad:{$nin:[/.*quer.*/i, /.*qor.*/i]}}) 

db.alumnos.distinct("email")

//Listar emails que contengan un digito
db.alumnos.distinct("email",{email:/[0-9]/}) //[] se evaluan rangos

//Listar emails que no contengan un digito
db.alumnos.distinct("email",{email:{$not:/[0-9]/}})

//Listar emails que inicie con un digito
db.alumnos.distinct("email",{email: /^[0-9]/})

//Listar emails que terminen con un digito
db.alumnos.distinct("email",{email: /[0-9]$/})

//Listar los correos con un formato valido 
db.alumnos.distinct("email",{email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/})//()-or, []-rango, {}-cantidades de posiciones //{2,} al menos dos letras

//Listar los correos con un formato valido  y que terminen en un dominio de dos letras
db.alumnos.distinct("email",{email:/^[^@]+@[^@]+\.[a-zA-Z]{2}$/})//{2} que termina en 2. \- Lo ultimo que tiene que tener

//Listar los alumnos con un nombre de 4 caracteres
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{4}$/i})

//Listar los alumnos con un nombre de 4 a 6 caracteres
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{4,6}$/i})

//Listar los alumnos con un nombre de 6 caracteres minimo
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{6,}$/i})//que inicia y termine, entre todo

//CLASES DE CARACTERES 

//Coincide con caracteres de puntuacion y con simbolos
db.alumnos.distinct("email",{email:/[[:punct:]]/i})
db.alumnos.distinct("nombre",{nombre:/[[:punct:]]/i})

//Listar emails que no contengan ningun digito usando clase de caracteres
db.alumnos.distinct("email",{email:{$not:/[[:digit:]]/i }})

//Lista los alumnos con un nombre de 4 a 6 caracteres usando la clase alpha
db.alumnos.distinct("nombre",{nombre:/^[[:alpha:]]{4,6}$/i })//alpha remplaza [a-z...

//Listar los alumnos con un nombre de 4 a 6 caracteres *numericos y letras) a-z, A-Z o 0-9
db.alumnos.distinct("nombre",{nombre:/^[[:alnum:]]{4,6}$/i })

//Lista los alumnos con un nombre que incluya un espacio en blanco 
db.alumnos.distinct("nombre",{nombre:/^[[:space:]]/i })

//CLASES ABREVIADAS
//esapcio en blanco es \s
db.alumnos.distinct("nombre",{nombre:/\s/i })
//Cualquier caracter que no sea un espacio en blanco
db.alumnos.distinct("nombre",{nombre:/\S/i })
// digitos \d
db.alumnos.distinct("nombre",{nombre:/\d/i })
//no sean digitos
db.alumnos.distinct("nombre",{nombre:/\D/i })

//Alumnos que si tiene el curp valido- Valorar el formato del curp
db.alumnos.find({
    curp:/[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]/
},
{nombre:1, curp:1, _id:0})

//Alumnos con un curp con solo numeros
db.alumnos.find({
    $and:[
        {curp:{$not:/\D/}},
        {curp:{$exists:1}}
        ]
},
{nombre:1, curp:1, _id:0})


//-----------------------------------------------------------------------------------------------------CLASE 7
//Conjunto de elementos que nos van ayudar a visualizar los datos.
//Aggregate-payload
//recibe un parametro de operadores{operador(group{:{regresa el conteo}}}
db.alumnos.aggregate([
    {$group:{"_id":"$ciudad","noalu":{$sum:1}}},//ciudad es un operador- elemento que queda dentro de nuestro conteo.
    {$project:{ciudad:"$_id", noalu:"$noalu",_id:0}} //creo una nueva vista de mi coleccion
] );
    
db.alumnos.aggregate([//obligatorio _id primero
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},//campo id sera un objeto
//     {$count:"nreg"}
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}}
] );
    
db.alumnos.aggregate([
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
//     {$count:"nreg"}
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}},
    {$sort:{ciudad:1, sexo:1}},
    {$match:{ciudad:"QUERETARO"}}//que sea igual
] );
    
db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}},
    {$sort:{ciudad:1, sexo:1}},
    {$match:{ciudad:"QUERETARO"}}
] );
    
db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
] );

db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
    {$match:{sexo:{$exists:1}}},//primero los que si tiene ciudad y despues de esos los que tienen sexo
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
    {$count:"nreg"}
] );

//operadore unitarios
//$project - proyecta
// $match- filtro
// $group - crea grupos
// $sort - ordena
// $skip - brinca
// $limit - limita el numero de resultados
    //operaciones consisas de documentos
// $unwind - saca docuemntos y deja un documento que necesitamos
// $out
// $geonear
// $sample -  mostrarnos elementos aleatorios
// $lookup - suerte, si lo encuentras- regresa
    

//-----------------------------------------------------------------------------------------------------CLASE 8
db.alumnos.aggregate([
    { $project: { _id:0,email:"$email",sexo:"$sexo", nombre:1, ap_paterno:1}}
])

//Operador Concat
db.alumnos.aggregate([
    { $project: { _id:0,email:"$email",sexo:"$sexo", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}} //Nueva coleccion.
])

db.alumnos.aggregate([
    { $project: { _id:0,email:"$email",sexo:"$sexo", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}},
    {$match:{ciudad:"QUERETARO"}},// Nos marca error porque la busca dentro de nuestra nueva proyeccion, por lo que no esta.
    {$count:"noAlu"}
])

db.alumnos.aggregate([
    {$match:{ciudad:"QUERETARO"}},
    { $project: { _id:0,email:"$email",sexo:"$sexo", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}},
    //{$count:"noAlu"}
])

db.alumnos.aggregate([
    {$match:{ciudad:"QUERETARO"}},
    { $project: { _id:0,email:"$email",sexo:"$sexo", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}},
    {$match:{alumno:/jose/i}},
    {$group:{"_id":"$sexo","nalu":{$sum:1}}},
    {$project:{sexo:"$_id", nalu:"$nalu",_id:0}},
    {$match:{nalu:{$gte:5}}}
])
    
/*
select sexo, count(*) nalu
    from alumnos
    where ciudad = 'QUERETARO', concat(nombre, ap_paterno, ap_materno) like '%JOSE%'
    group by sexo
    having count(*) >=5 
*/

db.alumnos.find(
    {evaluaciones:{$exists:1}}
//     { $project: { _id:0,sexo:1,"$evaluaciones.calificacion":1} //No nos deja porque es un objeto dentro de un arreglo.
)    

db.alumnos.aggregate([ //deja un docuemneto por cada uno de nuestros elementos en mi coleccion.
    {$match:{evaluaciones:{$exists:1}}},
    { $project: { _id:0,email:"$email",sexo:"$sexo",sexo:1, 
        evaluacion:"$evaluaciones.calificacion", 
        materia:"$evaluaciones.materia", //evaluaciones:1,
        fechas:"$evaluaciones.fecha",
        alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}},
])
   
// Unwind deja la forma en la que entra a los objetos, dejando un registro por cada elemento del arreglo dado, \
    los campos que no tengan campo para hacer unwind no se van a mostrar
        
db.alumnos.aggregate([
    {$match:{evaluaciones:{$exists:1}}},
    {$match:{"clave_alu": 11050207}},
    {$unwind:"$evaluaciones"},
    {$unwind:"$materias"},
    {$count:"noAlu"}
])
    
db.alumnos.aggregate([
    { $match:{ evaluaciones:{ $exists: 1}}}, 
    { $match:{"clave_alu" : 11050207} },
    { $project:{ _id:0, email:"$email", sexo:"$sexo", sexo:1, 
        calificaciones:"$evaluaciones.calificacion", 
        materias:"$evaluaciones.materia", 
        fechas:"$evaluaciones.fecha", //evaluaciones:1,
        alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno" ]} } },
    { $unwind: "$calificaciones"},
    { $unwind: "$materias"},
    { $unwind: "$fechas"},
//     {$count: "nalu"}
])
    

//-----------------------------------------------------------------------------------------------------CLASE 9
//Unwind nos ayuda a entrar a cada elemento. Saca los elementos de los arreglos y l;os deja como un elem,ento de nivel superior.
db.alumnos.aggregate([
    {$match:{"clave_alu":11050235}},
    {$unwind:"$evaluaciones"},
    {$unwind:"$materias"}
])
    //BUSQUE EN ARREGLOS
db.alumnos.aggregate([
    {$match:{"clave_alu":11050235}},
    {$unwind:"$evaluaciones"},
    {$match:{"evaluaciones.calificacion": 9}},
])

//BUSQUEDA EN ARREGLOS
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $gte: 6 } }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "promedio": {$avg: "$evaluaciones.calificacion"},
        } 
     },
])
//OPERADORES DE AGREGACION
     db.alumnos.aggregate([
//     {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $gte: 6 } }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "Calificacionpromedio": {$avg: "$evaluaciones.calificacion"},
          "CalificacionMax": {$max: "$evaluaciones.calificacion"},
          "CalificacionMax": {$max: "$evaluaciones.calificacion"},
          "CalificacionMin": {$min: "$evaluaciones.calificacion"},
          "CalificacionTotal": {$sum: "$evaluaciones.calificacion"},
          "CalificacionConteo": {$sum:1},
        } 
     },
     {$project:{
         clave_alu:"$_id.clave_alumno", alumno:"$_id.alumno",Calificacionpromedio:"$Calificacionpromedio",
         CalificacionMax:"$CalificacionMax",CalificacionMax:"$CalificacionMax",CalificacionMin:"$CalificacionMin",
         CalificacionTotal:"$CalificacionTotal",CalificacionConteo:"$CalificacionConteo",_id:0
         }}
])
         
//Visualizar alumnos(hombre) con almenos una materia reprobada y mostrar el numero de materias reprobadas. Tarea
   db.alumnos.aggregate([
//     {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $lt: 6 } }},
    {$match: { "sexo":"M" }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "MateriasTotal": {$sum: 1}
        } 
     },
     {$project:{
         clave_alu:"$_id.clave_alu", alumno:"$_id.alumno",MateriaTotal:"$MateriasTotal",_id:0
         }},
         {$count:"noAlu"}
])
         

//-----------------------------------------------------------------------------------------------------CLASE 10
//OPERADORES DE FECHA
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            fecha: "$evaluaciones.fecha",
            anio: { $year: "$evaluaciones.fecha" },
            mes: { $month: "$evaluaciones.fecha" },
            dia: { $dayOfMonth: "$evaluaciones.fecha" },
            hora: { $hour: "$evaluaciones.fecha" },
            min: { $minute: "$evaluaciones.fecha" },
            seg: { $second: "$evaluaciones.fecha" },
            milisegundos: { $millisecond: "$evaluaciones.fecha" },
            diaDelAnio: { $dayOfYear: "$evaluaciones.fecha" },
            diaDeLaSemana: { $dayOfWeek: "$evaluaciones.fecha" },//1-domingo, 7-sabado
            semana: { $week: "$evaluaciones.fecha" },
        }
     }
])
     //OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO Y MES
db.alumnos.aggregate([
    //{$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            fecha: "$evaluaciones.fecha",
            calificacion: "$evaluaciones.calificacion",
            anio: { $year: "$evaluaciones.fecha" },
            mes: { $month: "$evaluaciones.fecha" },
        }
     },
     {$group: { 
            _id: {anio:"$anio", mes:"$mes"},  
            promedio: { $avg: "$calificacion" },
            califTotal: { $sum: "$calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            _id: 0,
            anio: "$_id.anio", mes:"$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
         }
      },
      {$sort: {anio: -1, mes: 1}}
])
     //OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO Y MES 
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
     {$group: { 
            _id: {anio: { $year: "$evaluaciones.fecha" }, mes: { $month: "$evaluaciones.fecha" }},  
            promedio: { $avg: "$evaluaciones.calificacion" },
            califTotal: { $sum: "$evaluaciones.calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            anio: "$_id.anio",
            mes: "$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
            _id: 0
         }
      },
      {$sort: {anio: -1, mes: 1}}
])

//OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO USANDO $dateToString
/*
%d	Day of Month (2 digits, zero padded)	01-31
%G	Year in ISO 8601 format	0000-9999
%H	Hour (2 digits, zero padded, 24-hour clock)	00-23
%j	Day of year (3 digits, zero padded)	001-366
%L	Millisecond (3 digits, zero padded)	000-999
%m	Month (2 digits, zero padded)	01-dic
%M	Minute (2 digits, zero padded)	00-59
%S	Second (2 digits, zero padded)	00-60
%w	Day of week (1-Sunday, 7-Saturday)	01-07
%u	Day of week number in ISO 8601 format (1-Monday, 7-Sunday)	01-jul
%U	Week of year (2 digits, zero padded)	00-53
%V	Week of Year in ISO 8601 format	01-53
%Y	Year (4 digits, zero padded)	0000-9999
%z	The timezone offset from UTC.	+/-[hh][mm]
%Z	The minutes offset from UTC as a number. For example, if the timezone offset (+/-[hhmm]) %%	Percent Character as a Literal	%
*/
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
     {$group: { 
            _id: {
                // Devuelve una cadena en lugar de un dato int\
                //   format es el formato a dar y date es la fecha que recibe fecha ISO Date,
                //   timeStamp, ObjectId
                anio: { $dateToString: { format: "%Y", date: "$evaluaciones.fecha" } }, 
                mes: { $month: "$evaluaciones.fecha" }
            },  
            promedio: { $avg: "$evaluaciones.calificacion" },
            califTotal: { $sum: "$evaluaciones.calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            anio: "$_id.anio",
            mes: "$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
            _id: 0
         }
      },
      {$sort: {anio: -1, mes: 1}}
])
      
//
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            isoFecha: "$evaluaciones.fecha", 
            fecha: { $dateToString: { format: "%Y-%m-%d", date: "$evaluaciones.fecha" } },
            hora: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha" } },
            horaChiu: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/Chihuahua" } },
            horaMx: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/Mexico_City" } },
            horaNY: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/New_York" } },
            //Diferencia de minutos
            difMinChiu: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/Chihuahua" } },
            difMinMx: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/Mexico_City" } },
            difMinNY: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/New_York" } },
        }
    }
])

db.fechas.insertMany([
{ fecha: "2017-02-08T12:10:40.787", timezone: "America/Mexico_City", mensaje:  "Paso1: Iniciado" },
{ fecha: "2017-02-08", timezone: "-05:00", mensaje:  "Paso1: Ended" },
{ mensaje:  " Paso1: Ended " },
{ fecha: "2017-02-09", timezone: "Europe/London", mensaje: "Paso2: Iniciado"},
{ fecha: "2017-02-09T03:35:02.055", timezone: "+0530", mensaje: "Paso2: En Progreso"}
])

//LA FECHA ES UNA CADENA
db.fechas.aggregate([
     {$group: { _id: {anio: { $year: "$_id" }, mes: { $month: "$_id" }},  
            numeroCalif: { $sum: 1 }
         }
     }
])
     
db.fechas.find()
     //Fecha lo convierte en un ISODate
     //$y,$m no pueden trabajar con una cadena, por lo que la convertimos a fecha con dateFromString
db.fechas.aggregate([
    {$project: { 
            fecha: { $dateFromString: { dateString: "$fecha" } },//cadena a fecha
            timezone: "$timezone",
            fechaOri: { $dateFromString: { dateString: "$fecha", timezone: "$timezone" } },
            fechaCDMX: { $dateFromString: { dateString: "$fecha", timezone: "America/Mexico_City" } },
        }
    }
])

//-----------------------------------------------------------------------------------------------------CLASE 11
db.alumnos.find()
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$group: {
            "_id": { 
                "anio": { $dateToString:{ format: "%Y", date: "$evaluaciones.fecha" } }, 
                "ciudad": "$ciudad"
            },
            noEvaluaciones: { $sum: 1 },
            promedio: { $avg: "$evaluaciones.calificacion" },
            totalEvaluaciones: {$sum:"$evaluaciones.calificacion" },
            totalEvaluacionesx100: {$sum:{$multiply:["$evaluaciones.calificacion", 100]} }
        }
    },
    {
        $project:{
            ciudad:"$_id.ciudad",anio:"$_id.anio",
            noEvaluaciones:"$noEvaluaciones",
            promedioEvaluaciones:"$promedio",
            totalEvaluaciones:"$totalEvaluaciones",
            totalEvaluacionesx100:"$totalEvaluacionesx100",_id:0
        }      
    }
])

db.alumnos.aggregate([
        {$match:{evaluaciones:{$exists:1}}},
        {
            $project:{
             _id:0, alumno:{$concat:["$nombre"," ","$ap_paterno"," ","ap_materno"] },
             calificaciones:{
                    $map:{ //necesita un arreglo, genera una operacion sobre cada elemento de arreglos.
                        input:"$evaluaciones.calificacion", 
                        as: "eval", 
                        in:{$multiply:["$$eval", 100]}}
             }
        }
    },
    {
            $project:{
             alumno:1,
             calificacionesMas10:{
                    $map:{ //viene a nivel del documento.
                        input:"$calificaciones", 
                        as: "eval", 
                        in:{$add:["$$eval", 10]}}
             }
        }
    }
])
    
///////////////////////////////////////////////////
db.alumnos.aggregate([
     {$match: { evaluaciones: {$exists: 1} }},
     {$project: {
            _id: 0, 
            alumno: { $concat: ["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] },
            calificaciones: {
                $map: {
                    input: "$evaluaciones.calificacion",
                    as: "eval",
                    in: { $multiply: ["$$eval", 100] }
                }
            },
            anios: {
                $map: {
                    input: "$evaluaciones.fecha",
                    as: "fech",
                    in: { $year: "$$fech" }
                }
            }
         }
     },
     // Arreglo a nivel del elemento
     {$project: { 
            alumno: 1,
            anios: 1,
            calificacionesmas10: {
                $map: {
                    input: "$calificaciones",
                    as: "eval",
                    in: { $add: ["$$eval", 10] }
                }
            }
         }
     }
])
     
db.ventas.insertMany([
  { "_id" : 1, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("2"), "fecha" : ISODate("2018-03-01T08:00:00Z") },
  { "_id" : 2, "item" : "guayaba", "precio" : NumberDecimal("20"), "cantidad" : NumberInt("1"), "fecha" : ISODate("2018-03-01T09:00:00Z") },
  { "_id" : 3, "item" : "melon", "precio" : NumberDecimal("5"), "cantidad" : NumberInt( "10"), "fecha" : ISODate("2018-03-15T09:00:00Z") },
  { "_id" : 4, "item" : "melon", "precio" : NumberDecimal("5"), "cantidad" :  NumberInt("20") , "fecha" : ISODate("2018-04-04T11:21:39.736Z") },
  { "_id" : 5, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("10") , "fecha" : ISODate("2018-04-04T21:23:13.331Z") },
  { "_id" : 6, "item" : "limon", "precio" : NumberDecimal("7.5"), "cantidad": NumberInt("5" ) , "fecha" : ISODate("2019-06-04T05:08:13Z") },
  { "_id" : 7, "item" : "limon", "precio" : NumberDecimal("7.5"), "cantidad": NumberInt("10") , "fecha" : ISODate("2019-09-10T08:43:00Z") },
  { "_id" : 8, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("5" ) , "fecha" : ISODate("2020-02-06T20:20:13Z") },
  { "_id" : 9, "item" : "sandia", "precio" : NumberDecimal("17.5"), "cantidad": NumberInt("12") , "fecha" : ISODate("2020-01-10T08:43:00Z") },
  { "_id" : 10, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("8" ) , "fecha" : ISODate("2020-02-07T20:20:13Z") }
])
//-----------------------------------------------------------------------------------------------------CLASE 12
db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { //para evitar que tengamos un _id null, generamos primero un project, de esta manera el null pasara a ciudad y se generara un id para cada elemento.
        $project:{
            ciudad:"$_id",
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
        },
    {
        $out:{db:"tebd",coll:"cdevaluaciones"}//Todo el resultado se crea en una nueva coleccion. Despues remplaza lo que ya existe en la coleccion.
    }
])

//OCUPAMOS ifNull y out
db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]}, //["Que voy a evaluar","Que voy a poner si es null"]
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $out:{db:"tebd",coll:"cdevaluaciones"}//siempre remplza el dato existente
    }
])

//Nos ayuda a crear nuevas coleccion con el resultado de un payload del agreggate - merge
//La diferencia con out, es que merge no puede ocupar null en el id(lo poco que tenemos como prioridad en MDB)
db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]},
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $merge:{into:"cdevaluaciones"}//No vuelve a crear de 0 la coleccion, si no que agrega los elementos que seguimos utilizando.
        //Merge si puede tomar una coleccion fragmentada y generar una coleccion fragmentada, out no. (Mas potente)
    }
])

db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]},
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $merge:{into: {db:"tebd",coll:"cdevaluaciones"},
        on:"_id",whenMatched:"replace", whenNotMatched:"insert"//campo que queremos evaluar para saber si existe o no.
        //whenMatched: <replace|keepExisting|merge|fail|pipeline>, //optional
        //whenNotMatched: <insert|discard|fail>
        }
    }
])
    

//-----------------------------------------------------------------------------------------------------CLASE 13
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
    
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
 
//push repite los valores que se agregan a un arreglo  
db.alumnos.find()
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
//generar un arreglo de objetos
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ 
                alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
                matricula:"$clave_alu", curp:"$curp"
                } }
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
// generar un arreglo usando dos groups
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{sexo:"M"}, {edad:{$exists:1}}]}},
    { $group:{
            _id:{ciudad:"$ciudad", anios:"$edad.anios"},
            total:{ $sum:"$evaluaciones.calificacion"},
            promedio:{ $avg:"$evaluaciones.calificacion"}
        }
    },
    { $group:{
            _id:"$_id.ciudad", 
            ciudadDatos:{ $push:{ anios:"$_id.anios", total:"$total", promedio:"$promedio"} }
        }
    },
    { $project:{ ciudad:"$_id", ciudadDatos:"$ciudadDatos", _id:0}}
])
    
    
//$addToSet NO repite los valores que se agregan a un arreglo   
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $addToSet:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $push: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])
    
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $addToSet: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])


// max, min, avg, sum
// $first $last
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])
       
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])
    
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1}
       }},
    {$sort:{ "_id.alumno":1}},
])

// $addFields
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $project:{
        matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
        evaluaciones:"$evaluaciones"
        }},
     { $addFields:{
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1},
        semestre:"2022-1"
       }},
])
       

//-----------------------------------------------------------------------------------------------------CLASE 14
db.alumnos.aggregate([
    //{$unwind:"$materias"},
    {$sortByCount:"$ciudad"}
])
    
db.alumnos.aggregate([
    {$unwind:"$materias"},
    {$sortByCount:"$materias"}
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$sortByCount:"$evaluaciones.calificacion"}
]) 
 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$sortByCount:{ 
        $mergeObjects:["$evaluaciones.materia", 
        "$ciudad"]}
        }
]) 
     

db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,7,8,9,10,11],
           default:"otros"
        }}
])  
      
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros"
        }}
]) 
     
 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{ //Operador de paylad
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros",
           output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   $concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"," ","$evaluaciones.materia"] }}
           }
        }}
])  
           
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros",
           output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   alumno:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"] },
                   materia:"$evaluaciones.materia",
                   calificacion:"$evaluaciones.calificacion"
                   }},
                   
           }
        }}
]) 
        
//-----------------------------------------------------------------------------------------------------CLASE 15
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucketAuto:{
           groupBy:"$evaluaciones.calificacion",
           buckets:5,//cuantos grupos queremos que forme.
           output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"," ","$evaluaciones.materia"]}}, 
           }
        }}
])  

db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$bucketAuto: {//genera grupos, numero de grupos que queremos, pero no podemos poner la distribucion.
            groupBy: "$evaluaciones.calificacion",
            buckets: 15,
            output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   alumno:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"] },        
                   materia:"$evaluaciones.materia",
                   calificacion:"$evaluaciones.calificacion"
                   }},  
           }
        }
    },
    {$project: {
            califMaxima:{$add:["$_id.max",-1]},
            califMinima: "$_id.min",
            nalu: "$nalu",
            alumnos: "$alumnos",
            _id: 0
        }
    }
])

db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$bucketAuto: {//genera grupos, numero de grupos que queremos, pero no podemos poner la distribucion.
            groupBy: "$edad.dias",
            buckets: 30,
            output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   alumno:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"] },        
                   materia:"$evaluaciones.materia",
                   calificacion:"$evaluaciones.calificacion"
                   }},  
           }
        }
    },
])

db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$bucket: {//genera grupos, numero de grupos que queremos, pero no podemos poner la distribucion.
            groupBy: "$edad.dias",
            boundaries:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],//controlo el numero de grupos que va a ver. 31 a menor o igual a 31
            default:"nulo",//para los que no entran en el grupo.
            output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   alumno:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"] },        
                   materia:"$evaluaciones.materia",
                   calificacion:"$evaluaciones.calificacion",
                   edad:"$edad"
                   }},  
           }
        }
    },
])

db.alumnos.aggregate([//crea una nueva coleccion
    {$unwind:"$materias"}, 
    {$sortByCount: "$materias"},
    {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
])
        
//Generar multiples paylaids
db.alumnos.aggregate([
    {
        $facet:{//Hace un arreglo con los documentos resultantes de mi paylad
            materias:[
            {$unwind:"$materias"},//Arreglo de objetos 
            {$sortByCount: "$materias"},
            {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
            ]
        }
    }
])
    
db.alumnos.aggregate([
    {
        $facet:{//Hace un arreglo con los documentos resultantes de mi paylad
            materias:[
                {$unwind:"$materias"},//Arreglo de objetos 
                {$sortByCount: "$materias"},
                {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
            ],
            evaluaciones:[
                {$unwind:"$evaluaciones"},
                {$sortByCount: "$evaluaciones.calificaciones"},
                {$project: {"calificacion": "$_id",nrenglones:"$count", _id:0}}
            ],
            ciudades:[
                {$sortByCount: "$ciudad"},
                {$project: {"ciudad": "$_id",nrenglones:"$count", _id:0}}
            ]
        }
    }
])
    
db.alumnos.aggregate([
    {
        $facet:{//Hace un arreglo con los documentos resultantes de mi paylad
            materias:[
                {$unwind:"$materias"},//Arreglo de objetos 
                {$sortByCount: "$materias"},
                {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
            ],
            evaluaciones:[
                {$unwind:"$evaluaciones"},
                {$sortByCount: "$evaluaciones.calificaciones"},
                {$project: {"calificacion": "$_id",nrenglones:"$count", _id:0}}
            ],
            ciudades:[//ciudades no es un arreglo, por lo cual no ocupo el unwind para contarlas.
                {$sortByCount: "$ciudad"},
                {$project: {"ciudad": "$_id",nrenglones:"$count", _id:0}}
            ]
        }
    }
])
    
//-----------------------------------------------------------------------------------------------------TAREA 1
use ejercicios//cREA COLECCION 
db.restaurant.find() //MUESTRA LOS DOCUMENTOS 
db.restaurant.find({ }, {nombre:1, barrio:1, cocina:1}).pretty().sort({barrio:1})
db.restaurant.find({barrio:"Bronx"}).limit(5).pretty()
db.restaurant.find({"direccion.zipcode":"11226"}).pretty()
db.restaurant.find({"calificaciones.puntuacion":{$gt:90}}).count()
db.restaurant.find({$and:[{"barrio":"Queens"}, {$or:[{"cocina":"American"}, {"cocina":"Chineese"}]}]}).count()
db.restaurant.find({$and:[{"calificaciones.calificacion":"A"},{"calificaciones.puntuacion":{$eq:9}}]} ).count()
db.restaurant.find({$and:[{cocina:"Mexican"},{"barrio":{$ne:'Bronx'}}, {"barrio":{$ne:'Queens'}}]}).count()
db.restaurant.distinct("nombre")

//-----------------------------------------------------------------------------------------------------TAREA 2
db.getCollection('ventas').find({})
//GUADALUPE SUGEILY CRUZ CERVANTES
/*
     Listar el numero de elementos vendidos por anio y mes.
     Obtener el promedio de venta por item.
     Mostrar la fecha de venta con horario de cdmx y tijuana.
     listar el numero de elementos vendidos por dia del anio, no importa el anio.
     Listar primero las fechas con mayor venta en formato aaaa-mm-dd
     */

//Listar el numero de elementos vendidos por anio y mes.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "year": { $dateToString:{ format: "%Y", date: "$fecha" } },
              "month": { $dateToString:{ format: "%m", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {
      $project: {
          _id: 0,
          fecha: { $concat: ["$_id.year"," ","$_id.month"] },
          elemVendidos: "$elemVendidos",
          
      } 
   }
])
//Obtener el promedio de venta por item.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "item": "$item"
           },
           promVentas: { $avg: "$cantidad" }
      }
  },
  {
      $project: {
          _id: 0,
          item: "$_id.item",
          promVentas: "$promVentas",
          
      } 
   }
])
//Mostrar la fecha de venta con horario de cdmx y tijuana.
db.ventas.aggregate([
  {$project: {
         _id:0,
         item:"$item",
         fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
         horaMx: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$fecha", timezone: "America/Mexico_City" } },
         horaTj: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$fecha", timezone: "America/Tijuana" } },
      }
  },
])
//Listar el numero de elementos vendidos por dia del anio, no importa el anio.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "day": { $dateToString:{ format: "%d", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {$project: {
            _id: 0,
            dia: "$_id.day",
            elemVendidos: "$elemVendidos"
       }
   }
])
//Listar primero las fechas con mayor venta en formato aaaa-mm-dd
db.ventas.aggregate([
  {$group: {
          "_id": {
              fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {$project: {
            _id: 0,
            fecha: "$_id.fecha",
            elemVendidos: "$elemVendidos"}},
  {$sort: {elemVendidos: -1}}
])
  
//Visualizar alumnos(hombre) con almenos una materia reprobada y mostrar el numero de materias reprobadas. Tarea
   db.alumnos.aggregate([
//     {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $lte: 5 } }}, //lt 6
    {$match: { "sexo":"M" }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "MateriasTotal": {$sum: 1}
        } 
     },
     {$project:{
         clave_alu:"$_id.clave_alu", alumno:"$_id.alumno",MateriaTotal:"$MateriasTotal",_id:0
         }},
         {$count:"noAlu"}
])
