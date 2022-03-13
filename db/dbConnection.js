const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:2717/restful_api',  { useCreateIndex : true, useUnifiedTopology: true,  useNewUrlParser: true })
.then(()=>console.log("Veritabanına bağlanıldı"))
.catch((e)=> console.log("Hata",e))
