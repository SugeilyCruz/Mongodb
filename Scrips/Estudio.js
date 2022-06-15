use sugeprueba

db.prueba.insertMany(
    [
        {nombre: "Maria Karla", edad:"23", fecha:ISODate("2018-03-01T08:00:00.000Z"), cantidad: 10,
            personalidad:["Linda","Lista","Creativa","Divertida"], direccion:{calle:"Lago Xochimilco",colonia:"Agua Azul", CP:"57500"} },
        {nombre: "Sugeily Cruz", edad:"20", fecha: ISODate("2020-01-02T08:30:15.000Z"), cantidad: 3,
            personalidad:["Cantante","Divertida"], direccion: {calle:"Lago Flores", colonia:"Laureles", CP:"45126"} },
        {nombre: "Juan Carlos", edad:"28", fecha: ISODate("2010-04-05T22:00:00.000Z"), cantidad: 6,
            personalidad: ["Comica","Trabajador","Listo"], direccion:{calle:"Balderas",colonia:"Cuauhtemoc",numero:"27A",CP:"06040"}},
        {nombre: "Cid Manuel", edad:"10", fecha: ISODate("2020-03-04T09:40:00.000Z"), cantidad:8,
            personalidad:["Artista","Creativo"], direccion:{calle:"La Palma",colonia:"Demacu",numero:"65B",CP:"54896"} }
    ]
)
            
db.prueba.insert({
    nombre: "Jose Man", edad:"20", fecha: ISODate("2020-03-04T09:40:00.000Z"), cantidad: 9,
    personalidad:["Artista","Creativo"], direccion:{calle:"La Palma",colonia:"Demacu",numero:"65B",CP:"54896"}
})
  
db.prueba.insert({
    nombre:"Manuel Skiil", edad:"21", fecha: ISODate("2022-04-05T08:00:00.000Z"), cantidad:13,
    personalidad:["Graciaoso","Listo","Guapo"], 
    evaluaciones : [ 
        {
            "materia" : "OPT",
            "calificacion" : 8.0,
            "fecha" : ISODate("2021-01-03T00:00:00.000Z")
        }, 
        {
            "materia" : "ESP",
            "calificacion" : 7.0,
            "fecha" : ISODate("2021-02-02T00:00:00.000Z")
        }]
    })

db.prueba.find()
db.prueba.find().pretty()

db.getCollectionNames()
db.stats()
db.prueba.drop()

//Listar el numero de usuarios anio
db.prueba.aggregate([
    {$group:{
        "_id":{anio:{$year:"$fecha"}}, noAlu:{$sum:1}
        }},
    {$project:{
        _id:0,anio:"$_id.anio", noAlu:"$noAlu",
        }}
])
//Listar las personalidades que tengan creativo
db.prueba.find({personalidad:/Creativo/i})
//Listar los que tengan inteligente y creatividad y sus nombre
db.prueba.find({$or:[{personalidad:/Creativo/i},{personalidad:/Divertida/i}] })
db.prueba.find({$and:[{nombre:"Sugeily Cruz"},{$or:[{personalidad:/^d.*/i},{personalidad:/Creativo/i}]}]})
db.prueba.distinct("nombre")
db.prueba.find({
    "$where":"this.personalidad.length > 1",
    "personalidad":{$exists:1}
    })
//Listar el numero de elementos vendidos por anio y mes.
db.prueba.aggregate([
    {$group:{ 
        "_id":{
        anio:{$dateToString:{format:"%Y", date:"$fecha"}},
        mes:{$dateToString:{format:"%m", date:"$fecha"}}
    },noVendidos:{$sum:"$cantidad"}//,promVentas:{$avg:"$cantidad"}
    }}
])
//Mostrar la fecha de venta con horario de cdmx y tijuana.
db.prueba.aggregate([
    {$project:{
        _id:0,
        fecha:{$dateToString:{format:"%Y-%m-%d", date:"$fecha"}},
        fechaCDMX:{$dateToString:{format:"%H-%M-%S:%L%z", date:"$fecha", timezone:"America/Mexico_City"}},
        fechaTijuana:{$dateToString:{format:"%H-%M-%S:%L%z", date:"$fecha", timezone:"America/Tijuana"}}
        }}
    ])
//Listar el numero de elementos vendidos por dia del anio, no importa el anio.
db.prueba.aggregate([
    {$group:{
        "_id":{ dia:{$dayOfMonth:"$fecha"}},
        noVendidos:{$sum:"$cantidad"}
    }}
])
//Listar primero las fechas con mayor venta en formato aaaa-mm-dd
db.prueba.aggregate([
    {$group:{
        "_id":{day:{$dateToString:{format:"%Y-%m-%d", date:"$fecha"}}},
        noV:{$sum:"$cantidad"}
        }},
       {$project:{_id:0,fecha:"$_id.day",noV:"$noV"}},
       {$sort:{noV:-1}}
])
//Visualizar alumnos(hombre) con almenos una materia reprobada y mostrar el numero de materias reprobadas. Tarea
db.prueba.aggregate([
       {$unwind:"$evaluaciones"},
       {$match:{"evaluaciones.calificacion":{$gt:6}}},
       {$group:{
           "_id":{alumno:{$concat:["$nombre"]}},
           noApr:{$sum:1}
       }},
       {$project:{nombre:"$_id.alumno", Aprobadas:"$noApr",_id:0}}    
       ])
