db.fechas.insertMany([
{ fecha: "2017-02-08T12:10:40.787", timezone: "America/Mexico_City", mensaje:  "Paso1: Iniciado" },
{ fecha: "2017-02-08", timezone: "-05:00", mensaje:  "Paso1: Ended" },
{ mensaje:  " Paso1: Ended " },
{ fecha: "2017-02-09", timezone: "Europe/London", mensaje: "Paso2: Iniciado"},
{ fecha: "2017-02-09T03:35:02.055", timezone: "+0530", mensaje: "Paso2: En Progreso"}
])

//LA FECHA ES UNA CADENA
db.fechas.aggregate([
     {$group: { _id: {anio: { $year: "$_id" }, mes: { $month: "$_id" }},  
            numeroCalif: { $sum: 1 }
         }
     }
])
     
db.fechas.find()
     //Fecha lo convierte en un ISODate
     //$y,$m no pueden trabajar con una cadena, por lo que la convertimos a fecha con dateFromString
db.fechas.aggregate([
    {$project: { 
            fecha: { $dateFromString: { dateString: "$fecha" } },//cadena a fecha
            timezone: "$timezone",
            fechaOri: { $dateFromString: { dateString: "$fecha", timezone: "$timezone" } },
            fechaCDMX: { $dateFromString: { dateString: "$fecha", timezone: "America/Mexico_City" } },
        }
    }
])
