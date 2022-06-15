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
])//cada elemento nos deja un arreglo con el resultado
    
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$group: {
            _id: {alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }},
            promCalif: {$avg: "$evaluaciones.calificacion"}
        }
    },
    {$project: {
            _id: 0,
            alumno: "$_id.alumno",
            promCalif: "$promCalif", 
            observacion: {
                $switch: {
                    branches: [
                        { 
                            case: { $eq: [{$avg: "$promCalif"}, 10] },
                            then: "Excelente!"
                        },
                        { 
                            case: { $and: [{ $gte:[{$avg: "$promCalif"}, 8] }, { $lt: [{$avg: "$promCalif"}, 10] }] },
                            then: "Buena!"
                        },
                        { 
                            case: { $and: [{ $gte:[{$avg: "$promCalif"}, 6] }, { $lt: [{$avg: "$promCalif"}, 8] }] },
                            then: "Regular!"
                        },
                        { 
                            case: { $lt: [{$avg: "$promCalif"}, 6] },
                            then: "Mala!"
                        },
                    ],
                    default: "Sin Calificacion"
                }
            }
        }
    }
])
    
//Haciendo un filtro
db.alumnos.aggregate([
    {$match: { evaluaciones: {$exists: 1} }},
    {$project: {
            alumno: { $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            califMayor8: {
                $filter: {
                    input: "$evaluaciones",
                    as: "eval",
                    cond: { $gt: ["$$eval.calificacion", 8] }//$$ poruqe eval es de segundo nivel
                }
            }
       }
    },//{$sort:{"alumno":1}}
])

//traer un arreglo cuando este vacio en evaluaciones
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$sort: { "evaluaciones.calificacion": -1, "evaluaciones.materia": 1 }},
    {$group: {
            _id: {alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }},
            // Agrega elementos a un arreglo
            evaluaciones: {$push: { materia: "$evaluaciones.materia", calificacion: "$evaluaciones.calificacion" }}
        }
    },
    {$project: {
            _id: 0,
            alumno: "$_id.alumno",
            calfiMayor8: {
                $filter: {//filter necesita un arreglo, recibe un arreglo y los evalua
                    input: "$evaluaciones",
                    as: "eval",
                    cond: { $gt: ["$$eval.calificacion", 8] }
                }
            }
       }
    },//{$sort:{"alumno":1}}
])
    
//Ejercicio 
//Listar el promedio de calificaciones por trimestre
//Primer trimestre 1-3, Segundo trimestre 4-6, Tercer trimestre 7-9, Cuarto trimestre 10-11

//Listar las calificaiones reprobatorias
//Generar un arreglo de objetos con los campos
//Calificacion,materia,dia,mes,anio