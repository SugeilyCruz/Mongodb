//Conjunto de elementos que nos van ayudar a visualizar los datos.
//Aggregate-payload
//recibe un parametro de operadores{operador(group{:{regresa el conteo}}}
db.alumnos.aggregate([
    {$group:{"_id":"$ciudad","noalu":{$sum:1}}},//ciudad es un operador- elemento que queda dentro de nuestro conteo.
    {$project:{ciudad:"$_id", noalu:"$noalu",_id:0}} //creo una nueva vista de mi coleccion
] );
    
db.alumnos.aggregate([//obligatorio _id primero
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},//campo id sera un objeto
//     {$count:"nreg"}
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}}
] );
    
db.alumnos.aggregate([
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
//     {$count:"nreg"}
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}},
    {$sort:{ciudad:1, sexo:1}},
    {$match:{ciudad:"QUERETARO"}}//que sea igual
] );
    
db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
    {$project:{ciudad:"$_id.ciudad", sexo:"$_id.sexo", noalu:"$noalu",_id:0}},
    {$sort:{ciudad:1, sexo:1}},
    {$match:{ciudad:"QUERETARO"}}
] );
    
db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
] );

db.alumnos.aggregate([
    {$match:{ciudad:{$exists:1}}},
    {$match:{sexo:{$exists:1}}},//primero los que si tiene ciudad y despues de esos los que tienen sexo
    {$group:{"_id":{ciudad:"$ciudad", sexo:"$sexo"},"noalu":{$sum:1}}},
    {$count:"nreg"}
] );

//operadore unitarios
//$project - proyecta
// $match- filtro
// $group - crea grupos
// $sort - ordena
// $skip - brinca
// $limit - limita el numero de resultados
    //operaciones consisas de documentos
// $unwind - saca docuemntos y deja un documento que necesitamos
// $out
// $geonear
// $sample -  mostrarnos elementos aleatorios
// $lookup - suerte, si lo encuentras- regresa