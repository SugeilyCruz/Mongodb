//Insertamos la coleccion
db.contactos.insert({nombre:"Juan", apellidos:"Lopez"})
//agregamos otro
db.contactos.find()
db.contactos.insert({nombre:"Juan", telefono:12345678})
db.contactos.insert({contacto:"Juan", celular:12345678})

db.getCollectionInfos()
db.getCollectionInfos({name:"contactos"})

db.contactos.insert({nombre:"Maria", apellidos:"Garcia", telefono:12345678})//le importa que haya un telefono y un nombre por la validacion.
db.contactos.insert({nombre:"Maria", apellidos:"Garcia", telefono:"34567289"})//bsonType:"string"
db.contactos.insert({nombre:"Vania",  telefono:"89765678", etiqueta:"Proveedor"})//solo acepta ["Alumno","Profesor","Directivo"],

db.contactos.insert({nombre:"Vania",  telefono:"89765678", etiqueta:"Alumno"})

//Validacion, lo minimo que pudiera haber.
//corre comando que validen o ejecuten 
db.runCommand({
    collMod: "contactos",//a que coleccion ejecutamos el comando
    validationLevel: "moderate",//los datos que ya existen no se vean afectados
    validationAction: "error",//si algo no se cumple
    validator:{//conjunto de reglas
        $jsonSchema:{//elemento que queremos utilizar, de tipo objeto
            bsonType:"object",//los guardamos tipo objeto.
            required:["nombre","telefono"],
            properties: {       // Condiciones de tipo a los campos requeridos y no requeridos
                telefono: {
                    bsonType: "string",
                    description: "Es necesario ingresar un telefono de tipo cadena",
                },
                etiqueta: {
                    enum: ["Alumno", "Profesor", "Directivo"],
                    description: "Entrada invalida para etiqueta",//lo regresa en log- View y poner log.
                },
                anioIngreso: {
                    bsonType: "int",
                    minimum: 2000,
                    maximum: 2022, 
                },
                promedio: {
                    bsonType: "double",
                    minimum: 0.00,
                    maximum: 10.00,
                },
                direccion: {
                    bsonType: "object",
                    required: ["ciudad", "cp"],
                    properties: {
                        calle: { 
                            bsonType: "string" 
                        },
                        colonia: { 
                            bsonType: "string", 
                            maxLength: 300 
                        },
                        cp: { 
                            bsonType: "string" 
                        },
                    }
                },
                email: {
                    bsonType: "string",
                    pattern: "@fes\.mx$"
                }
            }
        }
    }
})

db.contactos.insert({
    nombre: "Stephany Mileh", 
    apellidos: "Curiel Hernandez", 
    telefono: "5568957856", 
    etiqueta: "Directivo",
    anioIngreso: NumberInt(2000)
})

db.contactos.insert({
    nombre: "Mileh", 
    apellidos: "Curiel Hernandez", 
    telefono: "5568957856", 
    etiqueta: "Alumno",
    anioIngreso: NumberInt(2000),
    promedio: NumberDecimal(8.9),
})

db.contactos.insert({
    nombre: "Luan Emmanuel", 
    apellidos: "Curiel Hernandez", 
    telefono: "5568957856", 
    etiqueta: "Alumno",
    anioIngreso: NumberInt(2000),
    promedio: 8.9,
    direccion: {
        ciudad: "Ciudad de Mexico",
        cp: NumberInt(01710),
        calle: "Pleamares"
    }
})

db.contactos.insert({
    nombre: "Luan Sabdiel", 
    apellidos: "Curiel Hernandez", 
    telefono: "5568957856", 
    etiqueta: "Alumno",
    anioIngreso: NumberInt(2000),
    promedio: 8.9,
    direccion: {
        ciudad: "Ciudad de Mexico",
        cp: "01710",
        calle: "Pleamares",
        numero: "15",
        colonia: "Las Aguilas"
    },
    email: "luansabdiel@fes.mx"
})

db.contactos.insert({
    nombre: "Melania Odette", 
    apellidos: "Curiel Hernandez", 
    telefono: "5568957856", 
    etiqueta: "Alumno",
    anioIngreso: NumberInt(2000),
    promedio: 8.9,
    direccion: {
        ciudad: "Ciudad de Mexico",
        cp: "01710",
        calle: "Pleamares",
        numero: "15",
        colonia: "Las Aguilas"
    },
    email: "meladiaodette@fes.mx"
})

db.contactos.find()

