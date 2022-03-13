const router = require('express').Router();

router.get('/', (req,res)=>{
    res.json({ mesaj : "Tüm kullanıcılar listelenecek"})
})

router.get('/:id', (req,res)=>{
    res.json({ mesaj : `${req.params.id} listelenecek`})
})

router.post('/', (req,res)=>{
    res.json(req.body)
})

router.patch('/:id', (req,res)=>{
    res.json(`${req.params.id} kullanicisi ${JSON.stringify(req.body)} ile güncellencek`)
})

router.delete('/:id', (req,res)=>{
    res.json(`${req.params.id} kullanicisi silinecek`)
})

module.exports = router;