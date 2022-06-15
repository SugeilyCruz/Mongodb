//GUADALUPE SUGEILY CRUZ CERVANTES
use noticias
//Coleccion Autor
db.autor.insert(
{
    nombre: "Cid Cruz",
    correo: "cidcr@gmail.com",
    descripcion: "Ut rutrum pulvinar libero. Sed convallis tellus vel consectetur ullamcorper.",
    usuario: {
         nomUser:"gomitatres",
         direccion:{
             calle:"Lago Xochimilco",
             noExterno:"210",
             noInterno:"11",
             cp:"57502",
             estado:"Veracruz",
             ciudad:"Tlapacoyan",
             pais:"Mexico"
             },
         telefono: {
             casa:"5554867598",
             movil:"5563526895",
             oficina: "5568594523",
             }
         },
    redSocial:{
        cuenta:"cid07cr",
        nombreRedS:"Instagram"
        }
    }
)
db.autor.insertMany([
    {
    nombre: "Sugeily Cruz",
    correo: "sucrz@gmail.com",
    descripcion: "Sed convallis tellus vel consectetur ullamcorper. Ut rutrum pulvinar libero.",
    usuario: {
         nomUser:"user1",
         direccion:{
             calle:"Lago Xochimilco",
             noExterno:"210",
             noInterno:"10",
             cp:"57500",
             estado:"Veracruz",
             ciudad:"Martinez de la Torre",
             pais:"Mexico"
             },
         telefono: {
             casa:"5516425816",
             movil:"5565986578",
             oficina: "5598675849",
             }
         },
    redSocial:{
        cuenta:"sugecrz",
        nombreRedS:"Facebook"
        }
    },
    {
    "nombre":"Rosette Elvish",
    "correo":"relvish0@sciencedirect.com",
    "descripcion":"cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque",
    usuario:{
        "nomUser":"lsketch0",
        direccion:{
            "calle":"Cherokee",
            "noExterno":"85",
            "noInterno":"15",
            "cp":"86020",
            "estado":"Poitou Charentes",
            "ciudad":"Poitiers",
            "pais":"Francia"
             },
        telefono: {
             "casa":"6089454021",
             "movil":"1621480497",
             "oficina":"7717124825"
             }
        },
    redSocial:{
        "cuenta":"ovoak0",
        "nombreRedS":"Facebook"
        }
    },
    
    {
    "nombre":"Tootsie Hatherall",
    "correo":"thatherall1@ameblo.jp",
    "descripcion":"lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna",
    usuario:{
        "nomUser":"mdraijer1",
        direccion:{
             "calle":"Mcbride",
             "noExterno":"117",
             "noInterno":"15",
             "cp":"49905",
             "estado":"Pays de la Loire",
             "ciudad":"Angers",
             "pais":"China"
             },
        telefono: {
             "casa":"3661422401",
             "movil":"6687962589",
             "oficina":"3599525675"
             }     
        },
    redSocial:{
        "cuenta":"lgraeser1",
        "nombreRedS":"Instagram"
        }
    },
    
    {
    "nombre":"Kailey Beddis",
    "correo":"kbeddis2@examiner.com",
    "descripcion":"bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa",
    usuario:{
        "nomUser":"adowrey2",
        direccion:{
             "calle":"Spaight",
             "noExterno":"99",
             "noInterno":"13",
             "cp":"71142",
             "estado":"Oaxaca",
             "ciudad":"Morelos",
             "pais":"Mexico"
             },
        telefono: {
             "casa":"6189656073",
             "movil":"7836859613",
             "oficina":"1958809932"
             }      
        },
    redSocial:{
        "cuenta":"ajerger2",
        "nombreRedS":"Twitter"
        }
    },
    
    {
    "nombre":"Yehudi McGown",
    "correo":"ymcgown3@live.com",
    "descripcion":"amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique",
    usuario:{
        "nomUser":"smcelmurray3",
        direccion:{
             "calle":"Upham",
             "noExterno":"53",
             "noInterno":"5",
             "cp":"13298",
             "estado":"Provence Azur",
             "ciudad":"Marseille",
             "pais":"Francia"
             },
        telefono: {
             "casa":"4314075470",
             "movil":"7945299906",
             "oficina":"2825284542"
             }      
        },
    redSocial:{
        "cuenta":"medgars3",
        "nombreRedS":"Facebook"
        }
    },
    
    {
    "nombre":"Niels Silverwood",
    "correo":"nsilverwood4@toplist.cz",
    "descripcion":"et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor",
    usuario:{
        "nomUser":"lwatling4",
        direccion:{
             "calle":"Judy",
             "noExterno":"513",
             "noInterno":"23",
             "cp":"65894",
             "estado":"British Columbia",
             "ciudad":"Pemberton",
             "pais":"Canada"
             },
         telefono: {
             "casa":"7603975339",
              "movil":"7625218623",
              "oficina":"2042852688"
             }      
        },
    redSocial:{
        "cuenta":"dferencz4",
        "nombreRedS":"Instagram"
        }
    },
    
    {
    "nombre":"Lucina Orkney",
    "correo":"lorkney5@bandcamp.com",
    "descripcion":"turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien",
    usuario:{
        "nomUser":"sgrasser5",
        direccion:{
             "calle":"Heath",
             "noExterno":"435",
             "noInterno":"9",
             "cp":"89359",
             "estado":"Tamaulipas",
             "ciudad":"Niños Heroes",
             "pais":"Mexico"
             },
         telefono: {
             "casa":"9746654131",
             "movil":"6486475366",
             "oficina":"5071733274"
             }     
        },
    redSocial:{
        "cuenta":"dtrinkwon5",
        "nombreRedS":"Twitter"
        }
    },
    
    {
    "nombre":"Kathe Victor",
    "correo":"kvictor6@eepurl.com",
    "descripcion":"aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam",
    usuario:{
        "nomUser":"lbeacroft6",
        direccion:{
             "calle":"Westend",
             "noExterno":"68",
             "noInterno":"6",
             "cp":"87569",
             "estado":"Manitoba",
             "ciudad":"Thompson",
             "pais":"Canada"
             },
         telefono: {
             "casa":"8346492191",
             "movil":"6339039792",
             "oficina":"8539304496"
             }    
        },
    redSocial:{
        "cuenta":"ameron6",
        "nombreRedS":"TikTok"
        }
    },
    
    {
    "nombre":"Theodore Clancy",
    "correo":"tclancy7@arstechnica.com",
    "descripcion":"justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea",
    usuario:{
        "nomUser":"disbell7",
        direccion:{
             "calle":"Union",
             "noExterno":"214",
             "noInterno":"20",
             "cp":"65891",
             "estado":"British Columbia",
             "ciudad":"Merritt",
             "pais":"Canada"
             },
         telefono: {
             "casa":"8042281821",
             "movil":"4825021311",
             "oficina":"1084088389"
             }    
        },
    redSocial:{
        "cuenta":"zcraighall7",
        "nombreRedS":"Otro"
        }
    },
    
    {
    "nombre":"Fina Rubinowitch",
    "correo":"frubinowitch8@paginegialle.it",
    "descripcion":"turpis donec posuere metus vitae ipsum aliquam non mauris morbi non",
    usuario:{
        "nomUser":"abolzen8",
        direccion:{
             "calle":"Dahle",
             "noExterno":"232",
             "noInterno":"3",
             "cp":"91982",
             "estado":"Lokiw",
             "ciudad":"Tokyo",
             "pais":"Japon"
             },
         telefono: {
             "casa":"6088148621",
             "movil":"3945165644",
             "oficina":"5838288453"
             }     
        },
    redSocial:{
        "cuenta":"iparidge8",
        "nombreRedS":"Instagram"
        }
    },
    
    {
    "nombre":"Larissa O' Mullane",
    "correo":"lo9@moonfruit.com",
    "descripcion":"eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar",
    usuario:{
        "nomUser":"dgribbell9",
        direccion:{
             "calle":"Packers",
             "noExterno":"92",
             "noInterno":"1",
             "cp":"80146",
             "estado":"Picardie",
             "ciudad":"Abbeville",
             "pais":"Colombia"
             },
         telefono: {
             "casa":"1641418725",
             "movil":"9477496675",
             "oficina":"9339091425"
             }     
        },
    redSocial:{
        "cuenta":"rmarkel9",
        "nombreRedS":"Otro"
        }
    },
    
    {
    "nombre":"Latisha Breckin",
    "correo":"lbreckina@rediff.com",
    "descripcion":"turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu",
    usuario:{
        "nomUser":"garnauduca",
        direccion:{
             "calle":"Clove",
             "noExterno":"320",
             "noInterno":"17",
             "cp":"86042",
             "estado":"Poitou Charentes",
             "ciudad":"Poitiers",
             "pais":"Belice"
             },
        telefono: {
             "casa":"3463440330",
             "movil":"3284760119",
             "oficina":"4669991991"
             }     
        },
    redSocial:{
        "cuenta":"epleumana",
        "nombreRedS":"TikTok"
        }
    },
    
    {
    "nombre":"Aristotle Baniard",
    "correo":"abaniardb@pinterest.com",
    "descripcion":"tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer",
    usuario:{
        "nomUser":"ewillattsb",
        direccion:{
             "calle":"Hudson",
             "noExterno":"302",
             "noInterno":"15",
             "cp":"10606",
             "estado":"Champagne Ardenne",
             "ciudad":"Troyes",
             "pais":"Brasil"
             },
        telefono: {
             "casa":"7832817640",
             "movil":"6384944380",
             "oficina":"1954911899"
             }     
        },
    redSocial:{
        "cuenta":"dnegrob",
        "nombreRedS":"Facebook"
        }
    },
    
    {
    "nombre":"Geneva Lamshead",
    "correo":"glamsheadc@ehow.com",
    "descripcion":"ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
    usuario:{
        "nomUser":"nbowlec",
        direccion:{
             "calle":"Crownhardt",
             "noExterno":"0193",
             "noInterno":"6",
             "cp":"84304",
             "estado":"Provence Alpes",
             "ciudad":"Cavaillon",
             "pais":"Belice"
             },
        telefono: {
             "casa":"9295351126",
             "movil":"2748377885",
             "oficina":"5039962063"
             }      
        },
    redSocial:{
        "cuenta":"sbootellc",
        "nombreRedS":"Twitter"
        }
    },
    
    {
    "nombre":"Diahann Badrock",
    "correo":"dbadrockd@psu.edu",
    "descripcion":"condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum",
    usuario:{
        "nomUser":"arawd",
        direccion:{
             "calle":"Sunnyside",
             "noExterno":"861",
             "noInterno":"7",
             "cp":"33492",
             "estado":"Valentín Virasoro",
             "ciudad":"Ingeniero",
             "pais":"Argentina"
             },
        telefono: {
             "casa":"1769210293",
             "movil":"4452622644",
             "oficina":"7325244970"
             }      
        },
    redSocial:{
        "cuenta":"alehucquetd",
        "nombreRedS":"Instagram"
        }
    },
    
    {
    "nombre":"Sasha Cottu",
    "correo":"scottue@oracle.com",
    "descripcion":"dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor",
    usuario:{
        "nomUser":"smountaine",
        direccion:{
             "calle":"Golf",
             "noExterno":"243",
             "noInterno":"8",
             "cp":"94043",
             "estado":"Karibe",
             "ciudad":"Río Gallegos",
             "pais":"Argentina"
             },
        telefono: {
             "casa":"9833268838",
             "movil":"3089831829",
             "oficina":"7921921495"
             }      
        },
    redSocial:{
        "cuenta":"tmoppette",
        "nombreRedS":"SnapChat"
        }
    },
    
    {
    "nombre":"Hadria Dahlgren",
    "correo":"hdahlgrenf@google.com.br",
    "descripcion":"blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id",
    usuario:{
        "nomUser":"rkinchleaf",
        direccion:{
             "calle":"Dovetail",
             "noExterno":"159",
             "noInterno":"19",
             "cp":"95601",
             "estado":"Veracruz Llave",
             "ciudad":"Las Palmas",
             "pais":"Mexico"
             },
        telefono: {
             "casa":"7977887459",
             "movil":"3478578963",
             "oficina":"3198615265"
             }      
        },
    redSocial:{
        "cuenta":"hadrid09",
        "nombreRedS":"Facebook"
        }
    },
    
    {
    "nombre":"Hilario Maxwale",
    "correo":"hmaxwaleg@livejournal.com",
    "descripcion":"duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in",
    usuario:{
        "nomUser":"sdietzlerg",
        direccion:{
             "calle":"Division",
             "noExterno":"195",
             "noInterno":"5",
             "cp":"46091",
             "estado":"Midi Pyrenées",
             "ciudad":"Cahors",
             "pais":"Barbados"
             },
        telefono: {
             "casa":"3435552850",
             "movil":"6124976153",
             "oficina":"7798916518"
             }      
        },
    redSocial:{
        "cuenta":"acurtainf",
        "nombreRedS":"YouTube"
        }
    },
    
    {
    "nombre":"Katya Pankhurst.",
    "correo":"kpankhursth@scribd.com",
    "descripcion":"eget massa tempor convallis nulla neque libero convallis eget eleifend",
    usuario:{
        "nomUser":"bnasih",
        direccion:{
             "calle":"Helena",
             "noExterno":"233",
             "noInterno":"15",
             "cp":"85009",
             "estado":"Pays de la Loire",
             "ciudad":"La Roche sur Yon",
             "pais":"Japon"
             },
        telefono: {
             "casa":"6002858356",
             "movil":"5635040605",
             "oficina":"6554864616"
             }      
        },
    redSocial:{
        "cuenta":"acattellg",
        "nombreRedS":"SnapChat"
        }
    },
    
    {
    "nombre":"Ragnar Cicchitello",
    "correo":"rcicchitelloi@cnbc.com",
    "descripcion":"lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet",
    usuario:{
        "nomUser":"gtocknelli",
        direccion:{
             "calle":"Parkside",
             "noExterno":"80",
             "noInterno":"10",
             "cp":"37132",
             "estado":"Konichiwa",
             "ciudad":"Tokyo",
             "pais":"Japon"
             },
        telefono: {
             "casa":"2561155714",
             "movil":"5808013981",
             "oficina":"8676138364"
             }      
        },
    redSocial:{
        "cuenta":"xscrancherh",
        "nombreRedS":"YouTube"
        }
    }
])
    
db.autor.find()
    

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
                    description: "Es necesario ingresar un nombre de tipo cadena",
                },
                correo: {
                    bsonType: "string",
                    pattern: "@\.com$"
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
                                    description: "El campo estado es requerido y debe ser de tipo cadena.",
                                },
                                ciudad: {
                                    bsonType: "string",
                                    description: "El campo ciudad es requerido y debe ser de tipo cadena.",
                                },
                                pais: {
                                    bsonType: "string",
                                    description: "El campo pais es requerido y debe ser de tipo cadena.",
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
                            description: "Entrada invalida, introduzca una Red Social valida.",
                        },
                        cuenta: {
                            bsonType: "string",
                            description: "El campo cuenta es requerido y debe ser de tipo cadena.",
                        }
                    }
                },
            }
        }
    }
})

db.autor.insert()