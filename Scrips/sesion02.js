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