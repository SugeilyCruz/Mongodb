db.restaurantsgeo.getIndexes()
db.neighborhoods.getIndexes()

db.restaurantsgeo.createIndex({name:1},{name:"Restaurant name"})//preordenamos los datos, estan ordenados
db.restaurantsgeo.createIndex({location:"2dsphere"})//valores que queremos indexar, mejor lectura de los datos.

db.neighborhoods.createIndex({geometry: "2dsphere"})//indice para coordenadas

db.neighborhoods.findOne({ geometry: {
        $geoIntersects: {//operador de interseccion
            $geometry: {
                type: "Point", 
                coordinates: [-73.93414657, 40.82302903]
            }
        }
    }
})

var neighborhood= db.neighborhoods.findOne({ geometry: {
        $geoIntersects: {//operador de interseccion
            $geometry: {
                type: "Point", 
                coordinates: [-73.93414657, 40.82302903]
            }
        }
    }
})

n


//Localizar restaurantes en el vecindario en el que nos encontramos
db.restaurantsgeo.find({location:{
    $geoWithin:{//dentro de un area
        $geometry:
            neighborhood.geometry
        }
    }
}).count()
//limitar distancia
db.restaurantsgeo.find({location:{
    $geoWithin:{//dentro
        $centerSphere://limite geografico
            [[-73.93414657, 40.82302903],1/3963.2]//420 restaurantes en 1 milla a la redonda.
        }
    }
}).count()

//buscar por cercania
var mpm= 1609.34 //metros por milla
db.restaurantsgeo.find({
    location:{
    $nearSphere:{//lo que este mas cercano a un Area
        $geometry:{
            type:"Point",
            coordinates:[-73.93414657, 40.82302903]  //longitud, latitud 
            },
            $maxDistance:5*mpm 
        }
    }
}).count()


