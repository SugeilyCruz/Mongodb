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