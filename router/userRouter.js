
const router = require('express').Router();
const User = require('../models/userModel');
router.get('/', async (req,res)=>{
    const allUsers = await User.find({});
    res.json(allUsers)
})

router.get('/:id', (req,res)=>{
    res.json({ mesaj : `${req.params.id} listelenecek`})
})

router.post('/', async (req,res)=>{
    try{
        const newUser = new User(req.body);
        const response = await newUser.save();
        res.send(response)

    }catch(e){
        console.log("Kullanıcı kaydedilirken hata oluştu")
    }
    res.json(req.body)
})

router.patch('/:id', (req,res)=>{
    res.json(`${req.params.id} kullanicisi ${JSON.stringify(req.body)} ile güncellencek`)
})

router.delete('/:id', (req,res)=>{
    res.json(`${req.params.id} kullanicisi silinecek`)
})

module.exports = router;