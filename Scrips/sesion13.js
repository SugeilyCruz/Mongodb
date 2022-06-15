db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
    
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
 
//push repite los valores que se agregan a un arreglo   
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
//generar un arreglo de objetos
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ 
                alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
                matricula:"$clave_alu", curp:"$curp"
                } }
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
// generar un arreglo usando dos groups
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{sexo:"M"}, {edad:{$exists:1}}]}},
    { $group:{
            _id:{ciudad:"$ciudad", anios:"$edad.anios"},
            total:{ $sum:"$evaluaciones.calificacion"},
            promedio:{ $avg:"$evaluaciones.calificacion"}
        }
    },
    { $group:{
            _id:"$_id.ciudad", 
            ciudadDatos:{ $push:{ anios:"$_id.anios", total:"$total", promedio:"$promedio"} }
        }
    },
    { $project:{ ciudad:"$_id", ciudadDatos:"$ciudadDatos", _id:0}}
])
    
    
//$addToSet NO repite los valores que se agregan a un arreglo   
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $addToSet:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $push: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])
    
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $addToSet: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])


// max, min, avg, sum
// $first $last
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])
       
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])
    
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1}
       }},
    {$sort:{ "_id.alumno":1}},
])

// $addFields
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $project:{
        matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
        evaluaciones:"$evaluaciones"
        }},
     { $addFields:{
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1},
        semestre:"2022-1"
       }},
])

