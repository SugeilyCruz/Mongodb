//$type - tipos de datos de nuestra collections(Lista)
db.alumnos.find({"curp":{$type:"number"}}).count()
db.alumnos.find({"curp":{$type:"string"}}).count()
db.alumnos.find({"curp":{$type:2}})
db.alumnos.find({"curp":{$type:19}}).count()

db.direcciones.insertMany(
[
  {"_id":1, direccion:"Av Rancho seco SN", cp: "57200", "alumnos": [ "Juan", "Ana", "Pedro" ]},
  {"_id":2, direccion:"Av Universidad 3000", cp: 30300},
  {"_id":3, direccion:"Av Central 5000", cp: NumberLong(56234), "posgrado": true},
  {"_id":4, direccion:"Las Palmas 4", cp: NumberInt(56330), "preferencias": {
        "seguimientoEmails": false,
        "idioma": "Español",
        "zonaHoraria": 5
    }},
  {"_id":5, direccion:"Bosques de Africa 2", cp: ["57200", "57201"], "fecha" : ISODate("2020-01-08T08:52:30.038Z")},
  {"_id":6, direccion:"Bosques de Africa 2", cp: {codigo:"57200", zp:"57201"}}
]
)
  
db.direcciones.insertMany(
  [
  {"_id":7, 
  direccion:"Bosques de Africa 2", cp: [
   {codigo:"57200", zp:"57201"},
   {codigo:"58200", zp:"58201"},
   {codigo:"59200", zp:"59201"}
   ]
  },
  {"_id":8, 
  direccion:"Bosques de Africa 2", cp: [
   ["57200", 57201],
   ["58200", 58201],
   ["59200", 59201]
   ]
  },
  {"_id":9, direccion:"Bosques de Africa 2", "cp" : ISODate("2020-01-08T08:52:30.038Z")}
  ]
)
  
db.direcciones.insert({"_id":10, direccion:"Bosques de Africa 2", "cp" : true})
db.direcciones.insert({"_id":11, direccion:"Av Universidad 3000", cp: 30.300})
  
db.direcciones.find().count()
db.direcciones.find({"cp":{$exists:1}})

//Double
db.direcciones.find({"cp":{$type:1}})
db.direcciones.find({"cp":{$type:"Double"}})

//String
db.direcciones.find({"cp":{$type:2}})
db.direcciones.find({"cp":{$type:"String"}})

//Object
db.direcciones.find({"cp":{$type:3}})
db.direcciones.find({"cp":{$type:"object"}})

//Object
db.direcciones.find({"cp":{$type:4}})
db.direcciones.find({"cp":{$type:"array"}})

//ObjectId
db.direcciones.find({"cp":{$type:7}})
db.direcciones.find({"cp":{$type:"objectId"}})

db.direcciones.find({"_id":{$type:7}})
db.direcciones.find({"_id":{$type:"objectId"}})

db.direcciones.find({"_id":{$type:7}})
db.direcciones.find({"cp":{$type:"objectId"}})

//Boolean
db.direcciones.find({"cp":{$type:8}})
db.direcciones.find({"cp":{$type:"bool"}})

//Date
db.direcciones.find({"cp":{$type:9}})
db.direcciones.find({"cp":{$type:"date"}})

//null
db.direcciones.find({"cp":{$type:10})
db.direcciones.find({"cp":{$type:"null"}})

//int 
db.direcciones.find({"cp":{$type:16}})
db.direcciones.find({"cp":{$type:"int"}})

//decimal
db.direcciones.find({"cp":{$type:19}})
db.direcciones.find({"cp":{$type:"decimal"}})

//int
db.direcciones.find({"cp":{$type:"number"}})

db.alumnos.find({"edad.anios":{$gte:30}}).count()

//Operador de expresion $expr
db.alumnos.find({$expr:{$gt:["$edad.dias","$edad.anios"]}}).count()

//Buscar alumnos mayores de 30 anios
db.alumnos.find({
    $expr: { 
            $gt: [
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 30] },
                        then: { $divide:["$edad.anios", 2] },
                        else: { $divide:["$edad.anios", 3] }
                    }
                }, 
                10
            ]
        }
    })
    
db.alumnos.find({
    $expr: { 
            $gt: [
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 28] },
                        then: { $divide:["$edad.anios", 2] },
                        else: { $divide:["$edad.anios", 3] }
                    }
                }, 
                {
                    $cond: {
                        if: { $gte:["$edad.anios", 28] },
                        then:  "$edad.meses" ,
                        else:  "$edad.dias" 
                    }
                }
            ]
        }
    }).count()
//14.5>11 object 16
db.alumnos.find({ 
    $and:[
    {
    $expr: { 
        $gt:[
            {
                $cond:{
                    if:{ $gte:["$edad.anios", 28]},
                    then:{ $divide:["$edad.anios", 2]},
                    else:{ $divide:["$edad.anios", 3]}
                }
            },
            {
                $cond:{//[- recibe mas de dos cosas y {- cuado es una.
                    if:{ $gte:["$edad.anios", 28]},//esta evaluando un operador, inicia con llave o multiple condicion
                    then: "$edad.meses" ,//no es operador, es un obejto 
                    else: "$edad.dias" 
                }
            }
        ] 
    } 
    },
    { edad:{ $exists:1} }
   ]
}).count()
