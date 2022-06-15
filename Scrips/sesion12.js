db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { //para evitar que tengamos un _id null, generamos primero un project, de esta manera el null pasara a ciudad y se generara un id para cada elemento.
        $project:{
            ciudad:"$_id",
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
        },
    {
        $out:{db:"tebd",coll:"cdevaluaciones"}//Todo el resultado se crea en una nueva coleccion. Despues remplaza lo que ya existe en la coleccion.
    }
])

//OCUPAMOS ifNull y out
db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]}, //["Que voy a evaluar","Que voy a poner si es null"]
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $out:{db:"tebd",coll:"cdevaluaciones"}//siempre remplza el dato existente
    }
])

//Nos ayuda a crear nuevas coleccion con el resultado de un payload del agreggate - merge
//La diferencia con out, es que merge no puede ocupar null en el id(lo poco que tenemos como prioridad en MDB)
db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]},
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $merge:{into:"cdevaluaciones"}//No vuelve a crear de 0 la coleccion, si no que agrega los elementos que seguimos utilizando.
        //Merge si puede tomar una coleccion fragmentada y generar una coleccion fragmentada, out no. (Mas potente)
    }
])

db.alumnos.aggregate([
    {$unwind : "$evaluaciones" },
    {$match:{
        $and:[
            {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
            {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}}
            ]
        }
    },
    {$group:{
        _id:"$ciudad", 
        fechaMax:{$max:"$evaluaciones.fecha"},
        fechaMin:{$min:"$evaluaciones.fecha"},
        calificacionesNumero:{$sum:1},
        calificacionesTotal:{$sum:"$evaluaciones.calificacion"},
        calificacionesPromedio:{$avg:"$evaluaciones.calificacion"},
        }
    },
    { 
        $project:{
            ciudad:{$ifNull:["$_id","Sin Dato"]},
            fechaMax:1,
            fechaMin:1,
            calificacionesNumero:1,
            calificacionesTotal:1,
            calificacionesPromedio:1,
            _id:0
            }
    },
    {
        $merge:{into: {db:"tebd",coll:"cdevaluaciones"},
        on:"_id",whenMatched:"replace", whenNotMatched:"insert"//campo que queremos evaluar para saber si existe o no.
        //whenMatched: <replace|keepExisting|merge|fail|pipeline>, //optional
        //whenNotMatched: <insert|discard|fail>
        }
    }
])