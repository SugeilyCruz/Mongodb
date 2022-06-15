//OPERADORES DE FECHA
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            fecha: "$evaluaciones.fecha",
            anio: { $year: "$evaluaciones.fecha" },
            mes: { $month: "$evaluaciones.fecha" },
            dia: { $dayOfMonth: "$evaluaciones.fecha" },
            hora: { $hour: "$evaluaciones.fecha" },
            min: { $minute: "$evaluaciones.fecha" },
            seg: { $second: "$evaluaciones.fecha" },
            milisegundos: { $millisecond: "$evaluaciones.fecha" },
            diaDelAnio: { $dayOfYear: "$evaluaciones.fecha" },
            diaDeLaSemana: { $dayOfWeek: "$evaluaciones.fecha" },//1-domingo, 7-sabado
            semana: { $week: "$evaluaciones.fecha" },
        }
     }
])
     //OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO Y MES
db.alumnos.aggregate([
    //{$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            fecha: "$evaluaciones.fecha",
            calificacion: "$evaluaciones.calificacion",
            anio: { $year: "$evaluaciones.fecha" },
            mes: { $month: "$evaluaciones.fecha" },
        }
     },
     {$group: { 
            _id: {anio:"$anio", mes:"$mes"},  
            promedio: { $avg: "$calificacion" },
            califTotal: { $sum: "$calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            _id: 0,
            anio: "$_id.anio", mes:"$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
         }
      },
      {$sort: {anio: -1, mes: 1}}
])
     //OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO Y MES 
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
     {$group: { 
            _id: {anio: { $year: "$evaluaciones.fecha" }, mes: { $month: "$evaluaciones.fecha" }},  
            promedio: { $avg: "$evaluaciones.calificacion" },
            califTotal: { $sum: "$evaluaciones.calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            anio: "$_id.anio",
            mes: "$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
            _id: 0
         }
      },
      {$sort: {anio: -1, mes: 1}}
])

//OBTENER EL PROMEDIO DE CALIFICACIONES POR ANIO USANDO $dateToString
/*
%d	Day of Month (2 digits, zero padded)	01-31
%G	Year in ISO 8601 format	0000-9999
%H	Hour (2 digits, zero padded, 24-hour clock)	00-23
%j	Day of year (3 digits, zero padded)	001-366
%L	Millisecond (3 digits, zero padded)	000-999
%m	Month (2 digits, zero padded)	01-dic
%M	Minute (2 digits, zero padded)	00-59
%S	Second (2 digits, zero padded)	00-60
%w	Day of week (1-Sunday, 7-Saturday)	01-07
%u	Day of week number in ISO 8601 format (1-Monday, 7-Sunday)	01-jul
%U	Week of year (2 digits, zero padded)	00-53
%V	Week of Year in ISO 8601 format	01-53
%Y	Year (4 digits, zero padded)	0000-9999
%z	The timezone offset from UTC.	+/-[hh][mm]
%Z	The minutes offset from UTC as a number. For example, if the timezone offset (+/-[hhmm]) %%	Percent Character as a Literal	%
*/
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
     {$group: { 
            _id: {
                // Devuelve una cadena en lugar de un dato int\
                //   format es el formato a dar y date es la fecha que recibe fecha ISO Date,
                //   timeStamp, ObjectId
                anio: { $dateToString: { format: "%Y", date: "$evaluaciones.fecha" } }, 
                mes: { $month: "$evaluaciones.fecha" }
            },  
            promedio: { $avg: "$evaluaciones.calificacion" },
            califTotal: { $sum: "$evaluaciones.calificacion" },
            numeroCalif: { $sum: 1 }
         }
     },
     {$project: {
            anio: "$_id.anio",
            mes: "$_id.mes",
            promedio: "$promedio",
            califTotal: "$califTotal",
            numeroCalif: "$numeroCalif",
            _id: 0
         }
      },
      {$sort: {anio: -1, mes: 1}}
])
      
//
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050242 } },
    {$unwind: "$evaluaciones"},
    {$project: {
            isoFecha: "$evaluaciones.fecha", 
            fecha: { $dateToString: { format: "%Y-%m-%d", date: "$evaluaciones.fecha" } },
            hora: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha" } },
            horaChiu: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/Chihuahua" } },
            horaMx: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/Mexico_City" } },
            horaNY: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha", timezone: "America/New_York" } },
            //Diferencia de minutos
            difMinChiu: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/Chihuahua" } },
            difMinMx: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/Mexico_City" } },
            difMinNY: { $dateToString: { format: "%Z", date: "$evaluaciones.fecha", timezone: "America/New_York" } },
        }
    }
])
