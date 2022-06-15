// Listar en un arreglo el nombre completo de todos los alumnos que no contengan los campos email y curp
db.alumnos.aggregate([
{$match:{email:{$exists:0}}},
{$match:{curp:{$exists:0}}},
{$project:{alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }, _id:0}}
// {$group: {
//         _id: {alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }},
//         alumnos: {
//             $push: {
//                 alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
//             }
//         }
//     }
// },
])

db.alumnos.find()
// Listar sólo el segundo y tercer elemento del campo materias de los alumnos que vivan en la cuidad de QUERETARO
db.alumnos.aggregate([
    {$match: { evaluaciones: {$exists: 1} }},
    {$match: { ciudad: "QUERETARO" }},
    {$project: {
            _id: 0,
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            primerMat: {$arrayElemAt: ["$evaluaciones", 0]},
            terceraMat: {$arrayElemAt: ["$evaluaciones", 3]},
        }
    }
])
    
    
// Listar en un arreglo el nombre completo de todos los alumnos que no contengan los campos email y curp

db.alumnos.aggregate([

    {$match:{email:{$exists:0}}},

    {$match:{curp:{$exists:0}}},

    {$project:{alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }, _id:0}}

 {$group: {

         _id: {alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }},

         alumnos: {

             $push: {

                 alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },

             }

         }

     }

 },

])


//Listar un campo llamado array llamado 'alumnos' el nombre completo de los alumnos segun el promedio de calificaciones que tienen

db.alumnos.aggregate([

    {$match: { evaluaciones: {$exists: 1} }},

    {$unwind:"$evaluaciones"},

    { $group:{

            _id:{alumnos:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
            proAlu:{$avg:"$evaluaciones.calificacion"}, 
             alumnos: {

             $push: {

                 alumno:{$concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },

             }},

        }},

    { $project:{alumnos:"$alumnos", proAlu:"$proAlu", _id:0}}
])