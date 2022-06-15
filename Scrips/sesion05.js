//EXPRESIONES REGULARES

//Inician con una letra o cadena

//USANDO EL OPERADOR REGEX
//no haya nada antes de R y todo lo demas no importa que haya
db.alumnos.find({nombre:{$regex:"^R.*$"}},{nombre:1,_id:0}) 
//option insensible a mayusculas
db.alumnos.find({nombre:{$regex:"^r.*$", $options:"i"}},{nombre:1,_id:0}) 

//EVALUANCDO DIRECTAMENTE
//Evaluar una expresion regular directamente
db.alumnos.find({nombre:/^R/},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/^r/i},{nombre:1,_id:0})

//Terminan con una letra o cadena
db.alumnos.find({nombre:{$regex:".*ER$"}},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/.*r$/i},{nombre:1,_id:0}) //insensible a mayusculas con i

//Contiene una letra
db.alumnos.find({nombre:{$regex:".*R.*"}},{nombre:1,_id:0}) 
db.alumnos.find({nombre:/.*r.*$/i},{nombre:1,_id:0})

//Contiene la cadena "jose"
db.alumnos.find({nombre:/.*jose.*$/i},{nombre:1,_id:0})

//Inician con la cadena jose
db.alumnos.find({nombre:/^jose.*/i},{nombre:1,_id:0})

//Termina con la cadena jose
db.alumnos.find({nombre:/.*jose$/i},{nombre:1,_id:0})

//Terminen con jose pero de forma unica y ordenada
db.alumnos.distinct("nombre",{nombre:/.*jose$/i}).sort()

//Contiene la cadena jose, insensible a mayusculas de forma unica y ordenada
db.alumnos.distinct("nombre",{nombre:/.*jose.*/i}).sort()

//Negar el resultado de una expresion regular
db.alumnos.distinct("nombre",{nombre:{$not:/.*jose$/i}}).sort()

db.alumnos.find({ciudad:{$exists:1}})
db.alumnos.distinct("ciudad")

//Alumnos que contienen la palabra jose que no vivan en queretaro
db.alumnos.find({
    $and:[
    {nombre:/.*jose.*/i},
    {ciudad:{$not:/.*quer.*/i}},
    {ciudad:{$exists:1}}
    ]
    },{nombre:1,ciudad:1,_id:0}).sort({ciudad:1})
    
//Buscar los alumnos que contengan jose o maria
db.alumnos.find({nombre:/.*jose|maria.*$/i},{nombre:1,_id:0})

//Buscar los alumnas que contengan jose o inicien con maria
db.alumnos.distinct("nombre",{nombre:/(jose|^maria)/i},{nombre:1,_id:0}).sort()

//Buscar los alumnos que terminen con jose o inicien con maria
db.alumnos.distinct("nombre",{nombre:/(jose$|^maria)/i},{nombre:1,_id:0}).sort()

//Listar todas las formas de escritura de la ciudad de queretaro
db.alumnos.distinct("ciudad",{ciudad:/(quer|qro)/i})// dos parametros dentro de la expresion regular // () opciones de or

db.alumnos.distinct("ciudad",{ciudad:{$in:[/.*quer.*/i, /.*qor.*/i]}}) // aqui se pasan dos opciones

db.alumnos.distinct("ciudad",{ciudad:{$in:[/.*quer.*/i, /.*qor.*/i, "CORREGIDORA"]}})

//lISTAR TODAS LAS CIUDADES QUE NO SEAN QUERETARO
db.alumnos.distinct("ciudad",{ciudad:{$not:{$in:[/.*quer.*/i, /.*qor.*/i]}}}) 
db.alumnos.distinct("ciudad",{ciudad:{$nin:[/.*quer.*/i, /.*qor.*/i]}}) 

db.alumnos.distinct("email")

//Listar emails que contengan un digito
db.alumnos.distinct("email",{email:/[0-9]/}) //[] se evaluan rangos

//Listar emails que no contengan un digito
db.alumnos.distinct("email",{email:{$not:/[0-9]/}})

//Listar emails que inicie con un digito
db.alumnos.distinct("email",{email: /^[0-9]/})

//Listar emails que terminen con un digito
db.alumnos.distinct("email",{email: /[0-9]$/})

//Listar los correos con un formato valido 
db.alumnos.distinct("email",{email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/})//()-or, []-rango, {}-cantidades de posiciones //{2,} al menos dos letras

//Listar los correos con un formato valido  y que terminen en un dominio de dos letras
db.alumnos.distinct("email",{email:/^[^@]+@[^@]+\.[a-zA-Z]{2}$/})//{2} que termina en 2. \- Lo ultimo que tiene que tener

//Listar los alumnos con un nombre de 4 caracteres
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{4}$/i})

//Listar los alumnos con un nombre de 4 a 6 caracteres
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{4,6}$/i})

//Listar los alumnos con un nombre de 6 caracteres minimo
db.alumnos.distinct("nombre",{nombre:/^[a-zA-Z]{6,}$/i})//que inicia y termine, entre todo

//CLASES DE CARACTERES 

//Coincide con caracteres de puntuacion y con simbolos
db.alumnos.distinct("email",{email:/[[:punct:]]/i})
db.alumnos.distinct("nombre",{nombre:/[[:punct:]]/i})

//Listar emails que no contengan ningun digito usando clase de caracteres
db.alumnos.distinct("email",{email:{$not:/[[:digit:]]/i }})

//Lista los alumnos con un nombre de 4 a 6 caracteres usando la clase alpha
db.alumnos.distinct("nombre",{nombre:/^[[:alpha:]]{4,6}$/i })//alpha remplaza [a-z...

//Listar los alumnos con un nombre de 4 a 6 caracteres *numericos y letras) a-z, A-Z o 0-9
db.alumnos.distinct("nombre",{nombre:/^[[:alnum:]]{4,6}$/i })

//Lista los alumnos con un nombre que incluya un espacio en blanco 
db.alumnos.distinct("nombre",{nombre:/^[[:space:]]/i })

//CLASES ABREVIADAS
//esapcio en blanco es \s
db.alumnos.distinct("nombre",{nombre:/\s/i })
//Cualquier caracter que no sea un espacio en blanco
db.alumnos.distinct("nombre",{nombre:/\S/i })
// digitos \d
db.alumnos.distinct("nombre",{nombre:/\d/i })
//no sean digitos
db.alumnos.distinct("nombre",{nombre:/\D/i })

//Alumnos que si tiene el curp valido- Valorar el formato del curp
db.alumnos.find({
    curp:/[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]/
},
{nombre:1, curp:1, _id:0})

//Alumnos con un curp con solo numeros
db.alumnos.find({
    $and:[
        {curp:{$not:/\D/}},
        {curp:{$exists:1}}
        ]
},
{nombre:1, curp:1, _id:0})

