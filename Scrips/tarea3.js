db.getCollection('ventas').find({})
//GUADALUPE SUGEILY CRUZ CERVANTES
/*
     Listar el numero de elementos vendidos por anio y mes.
     Obtener el promedio de venta por item.
     Mostrar la fecha de venta con horario de cdmx y tijuana.
     listar el numero de elementos vendidos por dia del anio, no importa el anio.
     Listar primero las fechas con mayor venta en formato aaaa-mm-dd
     */

//Listar el numero de elementos vendidos por anio y mes.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "year": { $dateToString:{ format: "%Y", date: "$fecha" } },
              "month": { $dateToString:{ format: "%m", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {
      $project: {
          _id: 0,
          fecha: { $concat: ["$_id.year"," ","$_id.month"] },
          elemVendidos: "$elemVendidos",
          
      } 
   }
])
//Obtener el promedio de venta por item.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "item": "$item"
           },
           promVentas: { $avg: "$cantidad" }
      }
  },
  {
      $project: {
          _id: 0,
          item: "$_id.item",
          promVentas: "$promVentas",
          
      } 
   }
])
//Mostrar la fecha de venta con horario de cdmx y tijuana.
db.ventas.aggregate([
  {$project: {
         _id:0,
         item:"$item",
         fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
         horaMx: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$fecha", timezone: "America/Mexico_City" } },
         horaTj: { $dateToString: { format: "%H-%M-%S:%L%z", date: "$fecha", timezone: "America/Tijuana" } },
      }
  },
])
//Listar el numero de elementos vendidos por dia del anio, no importa el anio.
db.ventas.aggregate([
  {$group: {
          "_id": {
              "day": { $dateToString:{ format: "%d", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {$project: {
            _id: 0,
            dia: "$_id.day",
            elemVendidos: "$elemVendidos"
       }
   }
])
//Listar primero las fechas con mayor venta en formato aaaa-mm-dd
db.ventas.aggregate([
  {$group: {
          "_id": {
              fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } }
           },
           elemVendidos: { $sum: "$cantidad" },
      }
  },
  {$project: {
            _id: 0,
            fecha: "$_id.fecha",
            elemVendidos: "$elemVendidos"}},
  {$sort: {elemVendidos: -1}}
])