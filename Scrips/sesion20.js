db.alumnos.aggregate([
    {$match:{ciudad:"QUERETARO"}},
    {$group:{_id:"$edad.anios",nalu:{$sum:1}}},
    {$project:{anios:"$_id", nalu:"$nalu",_id:0}},
    {$sort:{nalu:1}}
])
    
//cursor= el resultado de una consulta que trae los datos en donde podemos navegar y donde se encuentran los datos.
//cursor= objeto navegable que me permite obtener los valores de una consulta.
//Genera un objeto de cursor
//HASH nos sirve para recuperar nuestros datos tal cual se enviaron.
db.alumnos.explain().aggregate([//crea una tuberia un payload.
    {$match:{ciudad:"QUERETARO"}},
    {$group:{_id:"$edad.anios",nalu:{$sum:1}}},
    {$project:{anios:"$_id", nalu:"$nalu",_id:0}},
    {$sort:{nalu:1}}
])
    
//crear objeto llamado cursor
cursor = db.alumnos.find({ciudad:"QUERETARO"})//recorrer una vez.
    
cursor //objeto de javascrip local
cursor.count()
cursor.size()
cursor.batchSize()//regresa el tamanio del buffer
cursor.hasNext()
cursor.next()//estoy en la posicion n de nuestros valores.
cursor.isClosed()
cursor.explain()
cursor.toArray()

while(cursor.hasNext()){print(cursor.next().nombre)}//volver a correr el cursor. para que imprima algo aqui.

arrAlu= cursor.toArray() //Ahora es un arreglo, ya no es un cursor.
arrAlu
arrAlu[10]
arrAlu[9]

//a es la posicion de nuestro arreglo en donde esta.
arrAlu.forEach(function(a){print("alumno:"+ a.nombre + " " + a.ap_paterno + " " + a.ap_materno);})//puedo recorrer cuando quiera.