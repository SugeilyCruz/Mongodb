db.alumnos.aggregate([
    {
        $match:{
            $and:[{"ciudad" : "QUERETARO"}, {"nombre":/jose|ana/i}]
        }
    },
        {
        $project:{
            matricula:"$clave_alu", "evaluaciones":1, fecha:"$evaluaciones.fecha",
            alumno: { $concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"] }
        }
    },
    {
        $merge:{ into: "alumnosQueretaro"}
    }

//     {$count:"nalu"}
])
    
//Busca todos los alumnos por ciudad.
db.alumnos.aggregate([
    {$group:{_id:"$ciudad"}},
    {$project:{cd:"$_id",_id:0}},
    {$lookup:{
        from: "estudiantes",//coleccion a tomar
        pipeline:[//arrreglo cualqueira de los elementos que nosotros hemos echo: match, project, group, etc.
            {$match:{sexo:"F"}},//filtro solo a las mujeres
            {$project:{
                _id:0,
                alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] }//traemos a las alumnas que viven en cada una de las ciudades.
                }
            }
        ],
        localField: "cd",//nosotros tenemos esto.
        foreignField: "ciudad",//el campo con el cual buscamos en la coleccion foranea. Esto de la coleccion externa.
        as: "alumnos"//genera un nuevo arreglo con los valores que vamos a utilizar. y si no lo trae lo regresa vacio.
        }
    },
])    
    

db.alumnos.aggregate([
    {$lookup:{
        from: "alumnosQueretaro",
        localField: "clave_alu",//nosotros tenemos esto.
        foreignField: "matricula",//el campo con el cual buscamos en la coleccion foranea. Esto de la coleccion externa.
        as: "alumnosQro"//genera un nuevo arreglo con los valores que vamos a utilizar. y si no lo trae lo regresa vacio.
        }
    },
    {
            $match:{$expr:{$gt:[{$size:"$alumnosQro"},0]}}//para mostrar los alumnos que tengan por lo menos un elemento.
    }
//     {
//         $match:{
//             $and:[{"ciudad" : "QUERETARO"}, {"nombre":/jose|ana/i}]
//         }
//     }
])
    
db.alumnos.aggregate([
    {$lookup: {
            from: "alumnosQueretaro",
            localField: "clave_alu",
            foreignField: "matricula",
            as: "alumnosQro"
        }
    },
    {$match: {
            $expr: { $gt: [{$size: "$alumnosQro"}, 0] }
        }
    },
    {$project: {
            alumno:{ $concat: ["$nombre"," ", "$ap_paterno"," ","$ap_materno"] },
            clave_alu: 1,
            "alumnosQro": 1,
            _id: 0
        }
    },//Aqui todavia tenemos un arreglo con un objeto
    {$unwind: "$alumnosQro"},//Saca el objeto del arreglo
    {$unwind: "$alumnosQro.evaluaciones"},//Toma el objeto y lo separa por cada evaluacion dentro del objeto.
    {$group:{
            _id: { //esto determina como va a crear el grupo.
                clave_alu: "$clave_alu", 
                alumno: "$alumno", 
                anio: {$dateToString: { format: "%Y", date: "$alumnosQro.evaluaciones.fecha" } }
            },
            promedio: { $avg: "$alumnosQro.evaluaciones.calificacion" },
            nmaterias: { $sum: 1 }
        }
    },
    {$sort:{"_id.alumno":1,"_id.anio":-1}},//el segundo sort ya lo hace dentro del arreglo.
    {$project:{//este project viene del sort, del sort viene el group y asi...
        _id:0, 
        clave_alu:"$_id.clave_alu", 
        alumno:"$_id.alumno", 
        anio:"$_id.anio", 
        promedio:"$promedio", 
        nmateria:"$nmaterias"
        }
    }//saca los elementos del objeto _id y los proyecta junto con los elementos promedio y nmateria.
])