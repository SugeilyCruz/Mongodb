//Validacion
db.runCommand({
    collMod: "autor",//a que coleccion ejecutamos el comando
    validationLevel: "moderate",//los datos que ya existen no se vean afectados
    validationAction: "error",//si algo no se cumple
    validator:{//conjunto de reglas
        $jsonSchema:{//elemento que queremos utilizar, de tipo objeto
            bsonType:"object",//los guardamos tipo objeto.
            required:["nombre","correo","descripcion","usuario","redSocial"],
            properties: {       // Condiciones de tipo a los campos requeridos y no requeridos
                nombre: {
                    bsonType: "string",
                    description: "Es necesario ingresar un nombre de tipo cadena"
                },
                correo: {
                    bsonType: "string",
                    pattern: "\.*@.*",
                    description: "El campo correo es requerido y debe ser de tipo cadena."
                },
                usuario: {
                    bsonType: "object",
                    required: ["nomUser", "direccion","telefono"],
                    properties: {
                        nomUser: { 
                            bsonType: "string",
                            description: "Es necesario ingresar un nombre de usuario de tipo cadena",
                        },
                        telefono: {
                            bsonType: "object",
                            required: ["movil"],
                            properties: {
                                movil: {
                                    bsonType: "string",
                                    description: "El campo movil es requerido y debe ser de tipo cadena.",
                                    maxLength: 10
                                }
                            }
                        },
                        direccion: {
                            bsonType: "object",
                            required: ["calle","noExterno","noInterno","cp","estado","ciudad","pais"],
                            properties: {
                                calle: {
                                    bsonType: "string",
                                    description: "El campo calle es requerido y debe ser de tipo cadena.",
                                },
                                noExterno: {
                                    bsonType: "string",
                                    description: "El campo noExterno es requerido y debe ser de tipo cadena.",
                                    maxLength: 4
                                },
                                noInterno: {
                                    bsonType: "string",
                                    description: "El campo noInterno es requerido y debe ser de tipo cadena.",
                                    maxLength: 3
                                },
                                cp: {
                                    bsonType: "string",
                                    description: "El campo cp es requerido y debe ser de tipo cadena.",
                                    maxLength: 5
                                    
                                },
                                estado: {
                                    bsonType: "string", 
                                    maxLength: 300,
                                    description: "El campo estado es requerido y debe ser de tipo cadena."
                                },
                                ciudad: {
                                    bsonType: "string", 
                                    maxLength: 300,
                                    description: "El campo ciudad es requerido y debe ser de tipo cadena."
                                },
                                pais: {
                                    bsonType: "string", 
                                    maxLength: 300,
                                    description: "El campo pais es requerido y debe ser de tipo cadena."
                                }
                            }
                        },
                    }
                },
                redSocial: {
                    bsonType: "object",
                    required: ["cuenta", "nombreRedS"],
                    properties: {
                        nombreRedS: { 
                            enum: ["Instagram", "YouTube", "SnapChat", "Facebook", "Twitter", "TikTok", "Otro"],
                            description: "Entrada invalida, introduzca una Red Social valida."
                        },
                        cuenta: {
                            bsonType: "string",
                            description: "El campo cuenta es requerido y debe ser de tipo cadena."
                        }
                    }
                },
            }
        }
    }
})