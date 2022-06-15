db.getCollection('alumnos').find({evaluaciones:{$exists:1}}).count()
db.getCollection('alumnos').find({materias:{$exists:1}}).count()

//BUSCA TODOS LOS ELEMENTOS PRESENTES EN UN ARREGLO. LO QUE METAMOS EN LA LISTA SE EVALUA COMO AND(TODOS DEBEN DE ESTAR PRESENTES EN EL ARREGLO)
//all busca todos los elementos de la lista de un arreglo.
db.alumnos.find({materias:{$all:["ESPAÑOL","MATEMATICAS"] }}) 
db.alumnos.find({materias:{$all:["ESPAÑOL","MATEMATICAS",
    "HISTORIA",
    "QUIMICA",
    "FISICA"] }}).count() 
db.alumnos.find({materias:{$all:["ESPAÑOL","ETICA"] }}) 
db.alumnos.find({materias:{$all:["ETICA","MATEMATICAS"] }}).count()
db.alumnos.find({materias:{$all:["ETICA"] }}).count() 

// elemMatch evalua un valor en un arreglo. (in,or,and,etc) 
//EVALUA ELEMENTO POR ELEMENTO DENTRO DE UN ARREGLO. necesita un operador(in)
db.alumnos.find({materias:{$elemMatch:{ $in:["ESPAÑOL","ETICA"] } }}).count()

//EVALUA CADA ELEMENTO Y MUESTRA LOS QUE SON MAYOR E IGUAL A QUIMICA.
db.alumnos.find({materias:{$elemMatch:{ $gte:"QUIMICA" } }}).count()

//"elemMatch" porque lo ocupamos en un segundo nivel
db.alumnos.find({
    evaluaciones:{
            $all:[
                {"$elemMatch":{materia:{$gte:"M"}, calificacion:{$lte:5 }}} //Por default es un AND
        ]
    }
}).count()

db.alumnos.find({
    evaluaciones:{
            $all:[
                {"$elemMatch":{$or:[{materia:{$gte:"M"}}, {calificacion:{$lte:5 }}]}}//Or recibe una serie de evaluaciones.
        ]
    }
}).count()

//EVALUA ARREGLOS SIZE
db.alumnos.find({materias:{$size:4}}).count()

db.alumnos.find({ $expr:{ $gte:[{$size:"$materias"},4]}}).count()//$porque pasa como elemento que pasa por adentro de mi campo.
db.alumnos.find({ $where:"this.materias.length>4"}).coun()

db.alumnos.find({ $where:"this.nombre == 'ALDO'"}).count() //elemento jscrip
db.alumnos.find({ $where:"this.nombre.length == 4" }).count()

db.alumnos.find({ $where:function(){ 
    return ( hex_md5(this.nombre) == '97f9b8b5f3ff0c65246e0c2b8acfae30')//si aldo en hexadecimal es igual a 97... me regresa un verdadero
    }
}).count()


    
    
