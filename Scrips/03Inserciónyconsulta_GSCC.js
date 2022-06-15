//GUADALUPE SUGEILY CRUZ CERVANTES
use blogNoticias

//INCIAN LAS INSERCIONES

//Cada autor tiene un nombre, un nombre de usuario, un correo, una ciudad y una descripción (opcional).
db.autor.insertMany(
    [
        {nombre: "Sugeily Cruz",
         usuario: "user1",
         correo: "sucrz@gmail.com",
         ciudad: "Ciudad de México",
         descripcion: "Autora seccion 1 noticias"
        },
        {nombre: "Petra Martinez",
         usuario: "user2",
         correo: "petram@hotmail.com.mx",
         ciudad: "Acapulco",
         descripcion: "Autora seccion 2 noticias"
        },
        {nombre: "Karla Lopez",
         usuario: "user3",
         correo: "karl@gmail.com",
         ciudad: "Cancun",
         descripcion: "Autora seccion 3 noticias"
        },
        {nombre: "Aron Gutierrez",
         usuario: "user4",
         correo: "arong@live.com.mx",
         ciudad: "New York",
         descripcion: "Autora seccion 4 noticias"
        },
        {nombre: "Pedro Cervantes",
         usuario: "user5",
         correo: "pedroc@hotmail.com.mx",
         ciudad: "Texas",
         descripcion: "Autora seccion 5 noticias"
        },
        {nombre: "Anuel Guerrero",
         usuario: "user6",
         correo: "anuelg@gmail.com",
         ciudad: "Veracruz",
         descripcion: "Autora seccion 6 noticias"
        },
        {nombre: "Cid Cruz",
         usuario: "user7",
         correo: "cidc@yahoo.com.mx",
         ciudad: "Guadalajara",
         descripcion: "Autora seccion 7 noticias"
        },
        {nombre: "Victor Flores",
         usuario: "user8",
         correo: "vicf@gmail.com",
         ciudad: "Tijuana",
         descripcion: "Autora seccion 8 noticias"
        },
        {nombre: "Ana Villanueva",
         usuario: "user9",
         correo: "anav@gmail.com",
         ciudad: "Guanajuato",
         descripcion: "Autora seccion 9 noticias"
        },
        {nombre: "Sam Lopez",
         usuario: "user10",
         correo: "saml@gmail.com",
         ciudad: "Amburgo",
         descripcion: "Autora seccion 10 noticias"
        }
    ]
)
db.autor.find()

//De forma opcional, los usuarios pueden proporcionar como datos su dirección (calle, número, C.P.) o sus teléfonos de contacto (pueden tener varios).
db.usuario.insertMany(
    [
        {nombre: "Ana Cruz",
         direccion:{calle:"Lago Xochimilco",colonia:"Agua Azul",numero:"210",CP:"57500"},
         telefono: ["5516425816"]
        },
        {nombre: "Susana Cervantes",
         direccion:{calle:"Lago Flores",colonia:"Laureles",numero:"232",CP:"55300"},
         telefono: ["5514357816"]
        },
        {nombre: "Luis Flores",
         direccion:{calle:"Balderas",colonia:"Cuauhtemoc",numero:"27A",CP:"06040"},
         telefono: ["5534786253","23267548"]
        },
        {nombre: "Xia Yang",
         direccion:{calle:"La Palma",colonia:"Demacu",numero:"65B",CP:"54896"},
         telefono: ["5598789675","55238976"]
        },
        {nombre: "Antonio Soliz",
         direccion:{calle:"San Nicolas",colonia:"Reforma",numero:"98",CP:"67872"},
         telefono: ["5565764356"]
        },
        {nombre: "Ana Guitierrez",
         direccion:{calle:"Juarez",colonia:"Virgencitas",numero:"A54",CP:"74562"},
         telefono: ["5523561945"]
        },
        {nombre: "Daniel Park",
         direccion:{calle:"Lago Azteca",colonia:"Caramelo",numero:"46",CP:"65600"},
         telefono: ["5587452367"]
        },
        {nombre: "Andres Hernandez",
         direccion:{calle:"El Tablon",colonia:"Salvador",numero:"78C",CP:"67300"},
         telefono: ["5587985678","42567843"]
        },
        {nombre: "Caro Xiang",
         direccion:{calle:"Carmelia",colonia:"Flores",numero:"10",CP:"35700"},
         telefono: ["5587654323","56432518"]
        },
        {nombre: "Camila Cabello",
         direccion:{calle:"Agustin Lara",colonia:"Centro Tuxtepec",numero:"859B",CP:"68430"},
         telefono: ["0128761961","91876278"]
        }
    ]
)
db.usuario.drop()
db.usuario.find()
      
// Las noticias tienen tema, título, texto y fecha de publicación. | Son publicadas por un autor y pueden contener o no, una lista de etiquetas.
db.noticia.insertMany(
    [
        {autor:"Sugeily Cruz",
         titulo: "Ciberseguridad en Mexico",
         tema: "Tecnologia",
         texto: "Para que se considere ético es imprescindible contar con la autorización de la empresa. De hecho, lo ideal es que se confeccione un contrato donde se indiquen las obligaciones que ha de cumplir el auditor que,en este caso, sería el hacker ético. Por norma general, en estos acuerdos se incluyen cláusulas de confidencialidad, secreto profesional e integridad y se esclarecen los límites de la auditoría.",
         fechaPublicacion: new Date("2020,06,23"),
         etiquetas: ["Tecnologia", "Seguridad"]
        },
        {autor:"Sugeily Cruz",
         titulo: "Rusia y Ucrania",
         tema: "Exportaciones estrategicas",
         texto: "Esto no solo ha sido consecuencia de las duras sanciones occidentales contra Rusia, que ahora incluyen el gas y petróleo. El precio de las materias primas también está disparado debido a las interrupciones en el suministro causadas por la invasión rusa, que ha bloqueado el flujo de granos y metales desde la región.",
         fechaPublicacion: new Date("2022,01,15"),
         etiquetas: ["Politica"]
        },
        {autor:"Sugeily Cruz",
         titulo: "¿Seguiremos odiando igual a las redes sociales tras la guerra en Ucrania?",
         tema: "Redes sociales en Ucrania",
         texto: "Ut bibendum faucibus fringilla. Nunc sem ante, tempus ac tristique in, vehicula id nunc. Sed sit amet tincidunt lacus. Etiam eu lobortis nisl. Mauris vel orci sed libero ornare aliquam vel quis lorem. Fusce arcu lectus, ornare et ex at, laoreet placerat sapien. Praesent fermentum tempus magna, eu ullamcorper libero egestas a. Nam mollis viverra faucibus. Nam pulvinar nisi eros, luctus blandit nisl tincidunt vitae.",
         fechaPublicacion: new Date("2022,02,01"),
         etiquetas: ["Tecnologia","Politica"]
        },
        {autor:"Petra Martinez",
         titulo: "La inteligencia artificial puede medir la polarización política",
         tema: "Tecnologia",
         texto: "Aliquam bibendum velit id maximus ultricies. Suspendisse volutpat, nibh nec mollis ultricies, arcu dui egestas est, eget congue arcu nisl iaculis quam. Duis ultricies rutrum magna, sed mollis neque tempor vel. Aliquam condimentum eget urna eu maximus. Suspendisse tincidunt dictum nisl. Praesent suscipit eu diam tincidunt facilisis. Aenean lobortis finibus pharetra.",
         fechaPublicacion: new Date("2021,12,27"),
         etiquetas: ["Tecnologia","Politica"]
        },
        {autor:"Petra Martinez",
         titulo: "Sus mejores películas a través de sus recuerdos",
         tema: "Mejores peliculas Pedro Cervantes",
         texto: "De ‘El cochecito’ a la trilogía nacional de Berlanga, el hijo del prolífico actor repasa, con las vivencias de su padre, los grandes trabajos de una leyenda del cine que hoy cumpliría 100 años.",
         fechaPublicacion: new Date("2019,05,27"),
         etiquetas: ["Cultura"]
        },
        {autor:"Petra Martinez",
         titulo: "Realidad aumentada en publicidad",
         tema: "Realidad aumentada",
         texto: "Los anuncios que vemos en los estadios de fútbol o baloncesto cambian según el canal o país donde se emita el partido.",
         fechaPublicacion: new Date("2020,05,18"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Karla Lopez",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Tecnologia",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Karla Lopez",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Karla Lopez",
         titulo: "Hacker Sombrero Blanco",
         tema: "Hacker Etico",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Aron Gutierrez",
         titulo: "Ciberseguridad en Mexico",
         tema: "Tecnologia",
         texto: "Para que se considere ético es imprescindible contar con la autorización de la empresa. De hecho, lo ideal es que se confeccione un contrato donde se indiquen las obligaciones que ha de cumplir el auditor que,en este caso, sería el hacker ético. Por norma general, en estos acuerdos se incluyen cláusulas de confidencialidad, secreto profesional e integridad y se esclarecen los límites de la auditoría.",
         fechaPublicacion: new Date("2020,06,23"),
         etiquetas: ["Tecnologia", "Seguridad"]
        },
        {autor:"Aron Gutierrez",
         titulo: "Rusia y Ucrania",
         tema: "Exportaciones estrategicas",
         texto: "Esto no solo ha sido consecuencia de las duras sanciones occidentales contra Rusia, que ahora incluyen el gas y petróleo. El precio de las materias primas también está disparado debido a las interrupciones en el suministro causadas por la invasión rusa, que ha bloqueado el flujo de granos y metales desde la región.",
         fechaPublicacion: new Date("2022,01,15"),
         etiquetas: ["Politica"]
        },
        {autor:"Aron Gutierrez",
         titulo: "¿Seguiremos odiando igual a las redes sociales tras la guerra en Ucrania?",
         tema: "Redes sociales en Ucrania",
         texto: "Ut bibendum faucibus fringilla. Nunc sem ante, tempus ac tristique in, vehicula id nunc. Sed sit amet tincidunt lacus. Etiam eu lobortis nisl. Mauris vel orci sed libero ornare aliquam vel quis lorem. Fusce arcu lectus, ornare et ex at, laoreet placerat sapien. Praesent fermentum tempus magna, eu ullamcorper libero egestas a. Nam mollis viverra faucibus. Nam pulvinar nisi eros, luctus blandit nisl tincidunt vitae.",
         fechaPublicacion: new Date("2022,02,01"),
         etiquetas: ["Tecnologia","Politica"]
        },
        {autor:"Pedro Cervantes",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Tecnologia",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Pedro Cervantes",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Pedro Cervantes",
         titulo: "Hacker Sombrero Blanco",
         tema: "Hacker Etico",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Anuel Guerrero",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Estados Unidos amenaza a Rusia con sanciones tecnológicas",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Anuel Guerrero",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Anuel Guerrero",
         titulo: "Hacker Sombrero Blanco",
         tema: "Tecnologia",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Cid Cruz",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Estados Unidos amenaza a Rusia con sanciones tecnológicas",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Cid Cruz",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Cid Cruz",
         titulo: "Hacker Sombrero Blanco",
         tema: "Tecnologia",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Victor Flores",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Estados Unidos amenaza a Rusia con sanciones tecnológicas",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Victor Flores",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Victor Flores",
         titulo: "Hacker Sombrero Blanco",
         tema: "Tecnologia",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Ana Villanueva",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Estados Unidos amenaza a Rusia con sanciones tecnológicas",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Ana Villanueva",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Ana Villanueva",
         titulo: "Hacker Sombrero Blanco",
         tema: "Tecnologia",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Sam Lopez",
         titulo: "Si invades Ucrania te quedas sin iPhones",
         tema: "Estados Unidos amenaza a Rusia con sanciones tecnológicas",
         texto: "El conflicto también amenaza al sector energético de la Unión Europea, con una gran dependencia del gas ruso.",
         fechaPublicacion: new Date("2022,01,28"),
         etiquetas: ["Tecnologia"]
        },
        {autor:"Sam Lopez",
         titulo: "El futuro del Chelsea",
         tema: "Las sanciones contra el oligarca Abramóvich",
         texto: "La retirada del patrocinio de la empresa ThreeUK y la prohibición de venta de entradas o comercialización de la marca del club provoca serios apuros económicos al campeón de Europa",
         fechaPublicacion: new Date("2020,08,15"),
         etiquetas: ["Deportes"]
        },
        {autor:"Sam Lopez",
         titulo: "Hacker Sombrero Blanco",
         tema: "Tecnologia",
         texto: "Nunc imperdiet nisi ac magna commodo, nec lobortis ex venenatis. Donec congue ac arcu id pulvinar. Sed vel semper lacus. In hac habitasse platea dictumst. Vivamus in leo interdum dui dapibus ornare. Integer sit amet dignissim massa, eget convallis erat. Mauris vel dui orci.",
         fechaPublicacion: new Date("2021,11,08"),
         etiquetas: ["Tecnologia"]
        }
    ]
)
db.noticia.find().count()
        
//INICIAN LAS CONSULTAS
        
//Insertar 10 usuarios con al menos 3 noticias cada uno
db.noticia.aggregate([
    {$group:{"_id":"$autor","noArt":{$sum:1}}}
])
//Listar el numero de usuarios por ciudad
db.autor.aggregate([
    {$group:{"_id":"$ciudad","noAutor":{$sum:1}}},
    {$project:{ciudad:"$_id", noAutor:"$noAutor",_id:0}}
])
//Listar las noticias de temas ”TECNOLOGIA”
db.noticia.find({tema: /Tecnologia/i})
//Listar el nombre y correo de los usuarios que tengan una descripcion
db.autor.find({descripcion: {$exists:1}}, {nombre: 1, correo: 1, _id:0})
//Listar los usuarios que tengan mas de un telefono (arreglo)
db.usuario.find(
    {
        "$where": "this.telefono.length > 1",
        "telefono": {$exists:1}
    }
)
    
//Listar el numero de noticias por tema
db.noticia.aggregate([
    {$group:{"_id":"$tema","noArt":{$sum:1}}},
    {$project:{tema:"$_id", noArt:"$noArt",_id:0}}
])