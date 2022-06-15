//Unwind nos ayuda a entrar a cada elemento. Saca los elementos de los arreglos y l;os deja como un elem,ento de nivel superior.
db.alumnos.aggregate([
    {$match:{"clave_alu":11050235}},
    {$unwind:"$evaluaciones"},
    {$unwind:"$materias"}
])
    //BUSQUE EN ARREGLOS
db.alumnos.aggregate([
    {$match:{"clave_alu":11050235}},
    {$unwind:"$evaluaciones"},
    {$match:{"evaluaciones.calificacion": 9}},
])

//BUSQUEDA EN ARREGLOS
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $gte: 6 } }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "promedio": {$avg: "$evaluaciones.calificacion"},
        } 
     },
])
//OPERADORES DE AGREGACION
     db.alumnos.aggregate([
//     {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $gte: 6 } }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "Calificacionpromedio": {$avg: "$evaluaciones.calificacion"},
          "CalificacionMax": {$max: "$evaluaciones.calificacion"},
          "CalificacionMax": {$max: "$evaluaciones.calificacion"},
          "CalificacionMin": {$min: "$evaluaciones.calificacion"},
          "CalificacionTotal": {$sum: "$evaluaciones.calificacion"},
          "CalificacionConteo": {$sum:1},
        } 
     },
     {$project:{
         clave_alu:"$_id.clave_alumno", alumno:"$_id.alumno",Calificacionpromedio:"$Calificacionpromedio",
         CalificacionMax:"$CalificacionMax",CalificacionMax:"$CalificacionMax",CalificacionMin:"$CalificacionMin",
         CalificacionTotal:"$CalificacionTotal",CalificacionConteo:"$CalificacionConteo",_id:0
         }}
])
         
//Visualizar alumnos(hombre) con almenos una materia reprobada y mostrar el numero de materias reprobadas. Tarea
   db.alumnos.aggregate([
//     {$match: { "clave_alu": 11050235 }},
    {$unwind: "$evaluaciones"},
    {$match: { "evaluaciones.calificacion": { $lt: 6 } }},
    {$match: { "sexo":"M" }},
    {$group: { 
          "_id": { "clave_alu": "$clave_alu", "alumno": {$concat: ["$ap_paterno", " ", "$ap_materno", " " ,"$nombre"]} }, 
          "MateriasTotal": {$sum: 1}
        } 
     },
     {$project:{
         clave_alu:"$_id.clave_alu", alumno:"$_id.alumno",MateriaTotal:"$MateriasTotal",_id:0
         }},
         {$count:"noAlu"}
])
      