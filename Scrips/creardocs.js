db.prueba.insert({ 
title: 'Introduccion a MongoDB',  
description: 'MongoDB es una base de datos NoSQL', 
by: 'FES Aragon', 
url: 'https://www.aragon.unam.mx', 
tags: ['mongodb', 'database', 'NoSQL'], 
likes: 100 
}) 

db.prueba.find()

db.prueba.insert({
   _id: ObjectId("620a96d4c5979e0f32d2819c"),
   titulo: 'Introduccion a MongoDB', 
   descripcion: 'MongoDB es una base de datos NoSQL',
   por: 'FES Aragon',
   url: 'https://www.aragon.unam.mx',
   etiquetas: ['mongodb', 'database', 'NoSQL'],
   usuarios : 100
})

db.prueba.find().pretty()

db.pruebas.insert({
   _id: ObjectId("620a96d4c5979e0f32d2819c"),
   titulo: 'Introduccion a MongoDB', 
   descripcion: 'MongoDB es una base de datos NoSQL',
   por: 'FES Aragon',
   url: 'https://www.aragon.unam.mx',
   etiquetas: ['mongodb', 'database', 'NoSQL'],
   usuarios : 100
})

db.getCollectionNames()
db.stats()
db.getCollectionInfos()
db.pruebas.drop()
