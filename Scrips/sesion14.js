db.alumnos.aggregate([
    //{$unwind:"$materias"},
    {$sortByCount:"$ciudad"}
])
    
db.alumnos.aggregate([
    {$unwind:"$materias"},
    {$sortByCount:"$materias"}
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$sortByCount:"$evaluaciones.calificacion"}
]) 
 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$sortByCount:{ 
        $mergeObjects:["$evaluaciones.materia", 
        "$ciudad"]}
        }
]) 
     

db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,7,8,9,10,11],
           default:"otros"
        }}
])  
      
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros"
        }}
]) 
     
 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{ //Operador de paylad
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros",
           output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   $concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"," ","$evaluaciones.materia"] }}
           }
        }}
])  
           
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$bucket:{
           groupBy:"$evaluaciones.calificacion",
           boundaries:[6,11],
           default:"otros",
           output:{
               nalu:{$sum:1},
               alumnos:{ $addToSet:{ 
                   alumno:{$concat: ["$nombre"," ", "$ap_paterno",
                   " ","$ap_materno"] },
                   materia:"$evaluaciones.materia",
                   calificacion:"$evaluaciones.calificacion"
                   }},
                   
           }
        }}
])    

 
 
 
 
 
 
    