// Conteo rapido con sortByCount, agrupa y cuenta
db.alumnos.aggregate([
    {$unwind: "$materias"},
    {$sortByCount: "$materias"}
])

//Toma el arreglo y lo suma.
db.alumnos.aggregate([
    {$sortByCount: "$ciudad"}
])

// arrayElemAt devuelve un valor especifico de acuerdo a su indice
db.alumnos.aggregate([
    {$match: { evaluaciones: {$exists: 1} }},
    {$project: {
            _id: 0,
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            primerCalif: {$arrayElemAt: ["$evaluaciones", 0]},
            ultimaCalif: {$arrayElemAt: ["$evaluaciones", -1]},
            sextaCalif: {$arrayElemAt: ["$evaluaciones", 6]},
            tamanioCalif: {$size: "$evaluaciones"}
        }
    }
])

// $slice nos trae de un elemento a otro, siempre devuelve un arreglo
db.alumnos.aggregate([
    {$match: { evaluaciones: {$exists: 1} }},
    {$project: {
            _id: 0,
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            primerCalif: {$slice: ["$evaluaciones", 0, 1]},
            unotresCalif: {$slice: ["$evaluaciones", 0, 3]},
            ultimaCalif: {$slice: ["$evaluaciones", -2]},       // Cuando es negativo, penultimo y ultimo
            ultimosQuinceCalif: {$slice: ["$evaluaciones", 15, 4]},
            tamanioCalif: {$size: "$evaluaciones"}
        }
    }
])

// cond permite realizar condiciones if
db.alumnos.aggregate([
    {$project: {
            _id: 0,
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            numeroCalif: {$cond: {
                    if: { $isArray: "$evaluaciones" },
                    then: {$size: "$evaluaciones"},
                    else: 0
                }
            }
        }
    }
])

db.alumnos.aggregate([
    {$project: {
            _id: 0,
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            evaluaciones: {$cond: {
                    if: { $isArray: "$evaluaciones" },
                    then: "$evaluaciones",
                    else: 0
//                         [{
//                         "materia" : "",
//                         "calificacion" : 0,
//                     }]
                }
            }
        }
    },
    {$sort: {alumno: 1}},
    {$unwind: "$evaluaciones"}
])

