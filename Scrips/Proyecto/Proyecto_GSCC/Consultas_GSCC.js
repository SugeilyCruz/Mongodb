//GUADALUPE SUGEILY CRUZ CERVANTES
// mongodb+srv://tedb2022.mt48a.mongodb.net/       usuario:proy20222  contrasenia:Fes22TEBD
// mongodb+srv://proy20222:Fes22TEBD@tedb2022.mt48a.mongodb.net/?retryWrites=true&w=majority
// https://data.mongodb-api.com/app/data-potpn/endpoint/data/beta/  URL Endpoint
// CEHp6huw43HD8wjfVWxdnQR9kF003fnolbVhcN3NLHqcTEU3dQ30VvHHWBwyKnEc API Key

//////////////////////////////////////////////////////////////////////////////CONSULTAS///////////////////////////////////////////////////////////////
db.autor.find()
db.noticia.find()  

//3. Consultas a la BD
//a. Consultas de los datos del usuario por nombre de usuario y por cuenta de red social.
db.autor.aggregate([
    {$match:{
        $and:[
                {"redSocial.cuenta":"cid07cr"},
                {"redSocial.nombreRedS":"Instagram"}
            ]
        }
    }
])

//b. Agrupar a los usuarios por red social, crear un arreglo con los usuarios para cada red.
db.autor.aggregate([
    { $group:{
            _id:"$redSocial.nombreRedS",
            nomUser:{ $push:{ $concat:["$usuario.nomUser"]}},
            noUser:{$sum:1}
        }
    },
    { $project:{ nombreRedS:"$_id", nomUser:"$nomUser", noUser:"$noUser", _id:0}}
])
    
//c. Agrupación por código postal (contar el número de usuarios de cada cp.
db.autor.aggregate([
    { $group:{
            _id:"$usuario.direccion.cp",
            nomUser:{ $push:{ $concat:["$usuario.nomUser"]}},
            noUser:{$sum:1}
        }
    },
    { $project:{ cp:"$_id", noUser:"$noUser", _id:0}}
])
    
//d. Consultas por número de teléfono.
db.autor.aggregate([
    {$match:{
        "usuario.telefono.casa":{$eq:"6189656073"}
        }
    },
    {$project:{
        _id:0,
        nombre:1,
        correo:1,
        "usuario.nomUser":1,
        "usuario.direccion.ciudad":1,
        "usuario.telefono.casa":1
        }
    }
])
db.autor.find({"usuario.telefono.casa":/^55.*/i})//EMPIEZA
db.autor.find({"usuario.telefono.movil":/.*3$/i})//TERMINA
db.autor.find({"usuario.telefono.movil":/.*13.*$/i})//CONTIENE

// e. Consultas de noticias publicadas por usuarios.
db.noticia.aggregate([
    {$group: {
            "_id": {
                nombre: "$nombre"
            },
            titulo:{ $push:{ $concat:["$titulo"]}},
            noNoticias:{$sum:1}
        }
    },
    {$project: {
            _id: 0,
            nombre: "$_id.nombre",
            titulo: "$titulo",
            noNoticias: "$noNoticias"
        }
    }
])

// f. 10 últimas noticias publicadas ordenadas por fecha (de más reciente a más antigua.
db.noticia.aggregate([
  {$group: {
          "_id": {
              fechaPubli: { $dateToString: { format: "%Y-%m-%d", date: "$fechaPubli" } },
              nombre:"$nombre",
              titulo:"$titulo",
              cuerpo:"$cuerpo"
           },
      }
  },
  {$project: {
            _id: 0,
            fechaPubli: "$_id.fechaPubli",
            nombre:"$_id.nombre",
            titulo:"$_id.titulo",
            cuerpo:"$_id.cuerpo"
      }
  },
  {$sort: {
      fechaPubli: -1
      }
  },
  {$limit:10}
])
  
// g. Consultar las noticias con mayor y con menor calificación.
db.noticia.aggregate([//CON MAYOR
    {$unwind:"$comentarios"},
    {$group: {
          "_id":"$titulo",
          calificacion: { $avg: "$comentarios.calificacion" },
        }
    },
    {$sort: {"calificacion": -1}},
    {$project: {
            _id: 0,
            titulo: "$_id",
            calificacion: "$calificacion"
        }
    }
])
    
db.noticia.aggregate([//CON MENOR
    {$unwind:"$comentarios"},
    {$group: {
          "_id":"$titulo",
          calificacion: { $avg: "$comentarios.calificacion" },
        }
    },
    {$sort: {"calificacion": 1}},
    {$project: {
            _id: 0,
            titulo: "$_id",
            calificacion: "$calificacion"
        }
    }
])

// h. Número de comentarios por noticia, por día o por usuario.
db.noticia.aggregate([ //POR NOTICIA
  {$unwind:"$comentarios"},
  {$group: {
          "_id":"$titulo",
           noComent: { $sum: 1},
      }
  },
  {
      $project: {
          _id: 0,
          titulo: "$_id",
          noComent: "$noComent"
      } 
   }
])
   
db.noticia.aggregate([ //POR DIA
  {$unwind:"$comentarios"},
  {$group: {
      "_id":{
           "dia": { $dateToString:{ format: "%d", date: "$comentarios.fechaC" } }
         },
        noComent: { $sum: 1},  
      }
  },
  {
      $project: {
          _id: 0,
          dia: "$_id.dia",
          noComent: "$noComent"
      } 
   }
])
   
db.noticia.aggregate([ //POR USUARIO
  {$unwind:"$comentarios"},
  {$group: {
          "_id":"$comentarios.nomUser",
           noComent: { $sum: 1},
      }
  },
  {$project: {
          _id: 0,
          nomUser: "$_id",
          noComent: "$noComent"
      } 
   }
])
   
// i. Noticias que no tienen el campo tag.
db.noticia.find({tags: {$exists:0}})

// j. Noticias publicadas en un periodo de fechas. 
// i. Por año
db.noticia.aggregate([
    {$group: {
            _id:{anio: {$year: "$fechaPubli"}},
            noticias:{ $push:{ $concat:["$titulo"]}},
            noNoticias: { $sum: 1}
        }
    },
    {
      $project: {
          _id: 0,
          anio: "$_id.anio",
          noticias:"$noticias",
          noNoticias: "$noNoticias",
          
      } 
   }
])
// ii. Por mes
db.noticia.aggregate([
    {$group: {
            _id:{mes: {$month: "$fechaPubli"}},
            noticias:{ $addToSet:{ $concat:["$titulo"]}},
            noNoticias: { $sum: 1},
        }
    },
    {
      $project: {
          _id: 0,
          mes:"$_id.mes",
          noticias:"$noticias",
          noNoticias: "$noNoticias",
          
      } 
   }
])
// iii. Por año y mes
db.noticia.aggregate([
  {$group: {
          "_id": {
              "anio": { $dateToString:{ format: "%Y", date: "$fechaPubli" } },
              "mes": { $dateToString:{ format: "%m", date: "$fechaPubli" } }
           },
           noticias:{ $addToSet:{ $concat:["$titulo"]}},
           noNoticias: { $sum: 1},
      }
  },
  {
      $project: {
          _id: 0,
          fecha: { $concat: ["$_id.anio"," ","$_id.mes"] },
          noticias:"$noticias",
          noNoticias: "$noNoticias",
          
      } 
   }
])
// iv. En los ultimo 3 meses
db.noticia.aggregate([
    {$group: {
            _id:{mes: {$month: "$fechaPubli"}},
            noticias:{ $addToSet:{ $concat:["$titulo"]}},
            noNoticias: { $sum: 1},
        }
    },
    {$match: {$and:[{ "_id.mes": { $gte: 10 } },{ "_id.mes": { $lte: 12 } }]}},
    {
      $project: {
          _id: 0,
          mes:"$_id.mes",
          noticias:"$noticias",
          noNoticias: "$noNoticias",  
      } 
   }
])
