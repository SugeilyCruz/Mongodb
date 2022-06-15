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
//          {$count:"noAlu"}
])

db.alumnos.find()
         
db.alumnos.find(
    {evaluaciones:{$exists:1}}

)    