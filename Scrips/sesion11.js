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
/////////////////////////////////////////////
/*
     Listar el numero de elementos vendidos por anio y mes.
     Obtener el promedio de venta por item.
     Mostrar la fecha de venta con horario de cdmx y tijuana.
     listar el numero de elementos vendidos por dia del anio, no importa el anio.
     Listar primero las fechas con mayor venta en formato aaaa-mm-dd
     */