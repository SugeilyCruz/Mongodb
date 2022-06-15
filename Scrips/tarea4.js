//Ejercicio //GUADALUPE SUGEILY CRUZ CERVANTES 
//Listar el promedio de calificaciones por trimestre
//Primer trimestre 1-3, Segundo trimestre 4-6, Tercer trimestre 7-9, Cuarto trimestre 10-11
db.alumnos.find()

db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$project: {
            mes: {$month: "$evaluaciones.fecha"},
            anio: {$year: "$evaluaciones.fecha"},
            calificacion: "$evaluaciones.calificacion"
        }
    },
    {$group: {
            _id: { mes: "$mes", anio: "$anio" },
            promCalif: {$avg: "$calificacion"}
        }
    },
    {$project: {
            _id: 0,
            anio: "$_id.anio",
            promCalif: "$promCalif",
            trimsestre: {
                $switch: {
                    branches: [
                        { 
                            case: { $and: [ {$gte: ["$_id.mes", 1]}, {$lte: ["$_id.mes", 3]} ] },
                            then: "Primer trimestre!"
                        },
                        { 
                            case: { $and: [ {$gte: ["$_id.mes", 4]}, {$lte: ["$_id.mes", 6]} ] },
                            then: "Segundo trimestre!"
                        },
                        { 
                            case: { $and: [ {$gte: ["$_id.mes", 7]}, {$lte: ["$_id.mes", 9]} ] },
                            then: "Tercer trimestre!"
                        },
                        { 
                            case: { $and: [ {$gte: ["$_id.mes", 10]}, {$lte: ["$_id.mes", 12]} ] },
                            then: "Cuarto trimestre!"
                        },
                    ],
                    default: "Sin Calificacion"
                }
                
            }
        }
    }
])
//Listar las calificaiones reprobatorias
//Generar un arreglo de objetos con los campos
//Calificacion,materia,dia,mes,anio
    
db.alumnos.aggregate([
    {$match: { evaluaciones: {$exists: 1} }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $lt: 6 } }},
    {$group: {
            _id: { alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] } },
            promedio: { $avg: "$evaluaciones.calificacion" },
            calificaciones: 
            {$push: { 
                calificacion: "$evaluaciones.calificacion",
                materia: "$evaluaciones.materia", 
                dia: { $dayOfMonth: "$evaluaciones.fecha" },
                mes: { $month: "$evaluaciones.fecha" },
                anio: { $year: "$evaluaciones.fecha" } 
         }}
        }
    },
    {$project: {
            _id: 0,
            alumno: "$_id.alumno",
            promedio: "$promedio",
            califMenor6: {
                $filter: {
                    input: "$calificaciones",
                    as: "eval",
                    cond: { $lt: ["$$eval.calificacion", 6] }
                }
              }
           }
     }
])