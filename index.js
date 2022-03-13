const express = require('express');
require('./db/dbConnection');

// ROUTES
const userRouter = require('./router/userRouter');

const app = express();
const bodyParser = require('body-parser');
const req = require('express/lib/request');

app.use(bodyParser.json());
// Form-url encoded için
app.use(bodyParser.urlencoded({extended : true}))

// İstek api/users ile başlıyorsa tetiklenir
app.use('/api/users', userRouter)

app.get('/', (req,res) => {
    res.status(200).json({'mesaj' : "Hoş geldiniz"})
})


app.listen(3000, ()=>{
    console.log("Erişim sağlandı")
}) 