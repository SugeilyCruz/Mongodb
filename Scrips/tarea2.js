use ejercicios//cREA COLECCION 
db.restaurant.find() //MUESTRA LOS DOCUMENTOS 
db.restaurant.find({ }, {nombre:1, barrio:1, cocina:1}).pretty().sort({barrio:1})
db.restaurant.find({barrio:"Bronx"}).limit(5).pretty()
db.restaurant.find({"direccion.zipcode":"11226"}).pretty()
db.restaurant.find({"calificaciones.puntuacion":{$gt:90}}).count()
db.restaurant.find({$and:[{"barrio":"Queens"}, {$or:[{"cocina":"American"}, {"cocina":"Chineese"}]}]}).count()
db.restaurant.find({$and:[{"calificaciones.calificacion":"A"},{"calificaciones.puntuacion":{$eq:9}}]} ).count()
db.restaurant.find({$and:[{cocina:"Mexican"},{"barrio":{$ne:'Bronx'}}, {"barrio":{$ne:'Queens'}}]}).count()
db.restaurant.distinct("nombre")