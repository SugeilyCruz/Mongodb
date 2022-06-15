db.getCollectionInfos()
db.createCollection("prueba2",{ })
db.createCollection("prueba3", { capped : true, autoIndexId : true, size : 6142800, max : 10000 } )

db.createCollection(
    "tiempo24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "data",
          granularity: "hours"
       },
       expireAfterSeconds: 86400
    }
)
    
db.tiempo24h.insertMany( [
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T04:00:00.000Z"),
      "temp": 11
   }
   ]
)

db.tiempo24h.find()
   
db.inventario.insertMany([ //tiene que tener un arreglo de elementos, cuando se ocupa insertMany
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
])

db.inventario.find()
db.inventario.count()
db.inventario.getCollection()
//Eliminar la collection prueba2 (es sencible a mayusculas)
db.prueba2.drop()
db.prueba2.find()

//Utilizar JS en MongoDB
db.alumnos.findOne()
var campos = db.alumnos.findOne()
for(campo in campos){ print(campo); }

campos

show collections
db.alumnos.find()
db.alumnos.find().count()//Contar los documentos resultantes de una busqueda, a nivel find()
db.alumnos.count()//Contar los documentos de la collection, a nivel collection

db.alumnos.find()//select * from alumnos
db.alumnos.find({sexo:'F'})//select * from alumnos where sexo = 'F'
db.alumnos.find({sexo:'F'}).count()//saber cuantas F tengo
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0})//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F'
db.alumnos.find({sexo:'F'},{nombres:1,ap_paternos:1,curps:1,edades:1})//con campos que no existen(Estado Laxo)
db.alumnos.find({sexo:'F'},{nombre:0,ap_paterno:0,curp:0,edad:0, _id:0})//se muestran los demas (1-muestra, 0-no muestra)

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno ADC, nombre ADC
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1})

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno DESC, nombre DESC
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:-1, nombre:-1})

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno, nombre limit 5
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1}).limit(5)

//select nombre,ap_paterno,curp,edad from alumnos where sexo = 'F' order by ap_paterno, nombre limit 5, 5
db.alumnos.find({sexo:'F'},{nombre:1,ap_paterno:1,curp:1,edad:1, _id:0}).sort({ap_paterno:1, nombre:1}).skip(5).limit(5)

db.alumnos.find({sexo:'F'}).count()
//Nombres compuestos entre comillas, los sencillos no. Y todo lo toma como un and(automatico)
db.alumnos.find({sexo:'F',"edad.anios":28}).count() 

//operador OR, los operadores empiezan con $
db.alumnos.find({$or: [{sexo:'F'},{"edad.anios":28}]}).count() 
db.alumnos.find({$and: [{sexo:'F'},{"edad.anios":28}]}).count() 