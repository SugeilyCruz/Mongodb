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

