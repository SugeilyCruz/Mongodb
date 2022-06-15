db.noticia.insert({
    "titulo":"Strange UNAM",
    "cuerpo":"consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo",
    "fechaPubli": new Date("2021-05-27"),
    "nombre":"Kenia Penia",
    "tags":["Robotica","Ciencia"],
    "comentarios":[
        {
            "nomUser":"disbell7",
            "comentario":"hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at",
            "fechaC": new Date("2021-01-11T05:38:57.000Z"),
            "calificacion":8,
            "tagsC":"Ciencia"
        },
        {
            "nomUser":"lbeacroft6",
            "comentario":"in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet",
            "fechaC": new Date("2021-01-12T09:36:48.000Z"),
            "calificacion":8,
            "tagsC":"Arte"
        }
    ]
})

//autor
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
             casa:"5587659548",
             movil:"5568586954",
             oficina: "5568594523",
             }
         },
    redSocial:{
        cuenta:"cid07cr",
        nombreRedS:"Instagram"
        }
    }
)
