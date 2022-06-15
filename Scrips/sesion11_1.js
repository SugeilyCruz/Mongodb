db.ventas.insertMany([
  { "_id" : 1, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("2"), "fecha" : ISODate("2018-03-01T08:00:00Z") },
  { "_id" : 2, "item" : "guayaba", "precio" : NumberDecimal("20"), "cantidad" : NumberInt("1"), "fecha" : ISODate("2018-03-01T09:00:00Z") },
  { "_id" : 3, "item" : "melon", "precio" : NumberDecimal("5"), "cantidad" : NumberInt( "10"), "fecha" : ISODate("2018-03-15T09:00:00Z") },
  { "_id" : 4, "item" : "melon", "precio" : NumberDecimal("5"), "cantidad" :  NumberInt("20") , "fecha" : ISODate("2018-04-04T11:21:39.736Z") },
  { "_id" : 5, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("10") , "fecha" : ISODate("2018-04-04T21:23:13.331Z") },
  { "_id" : 6, "item" : "limon", "precio" : NumberDecimal("7.5"), "cantidad": NumberInt("5" ) , "fecha" : ISODate("2019-06-04T05:08:13Z") },
  { "_id" : 7, "item" : "limon", "precio" : NumberDecimal("7.5"), "cantidad": NumberInt("10") , "fecha" : ISODate("2019-09-10T08:43:00Z") },
  { "_id" : 8, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("5" ) , "fecha" : ISODate("2020-02-06T20:20:13Z") },
  { "_id" : 9, "item" : "sandia", "precio" : NumberDecimal("17.5"), "cantidad": NumberInt("12") , "fecha" : ISODate("2020-01-10T08:43:00Z") },
  { "_id" : 10, "item" : "manzana", "precio" : NumberDecimal("10"), "cantidad" : NumberInt("8" ) , "fecha" : ISODate("2020-02-07T20:20:13Z") }
])