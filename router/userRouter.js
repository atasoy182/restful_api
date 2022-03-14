"use strict";

const router = require("express").Router();
const User = require("../models/userModel");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

router.get("/:id", (req, res) => {
  res.json({ mesaj: `${req.params.id} listelenecek` });
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const response = await newUser.save();
    res.json(response);
  } catch (e) {
    console.log("Kullanıcı kaydedilirken hata oluştu", e);
    res.json({ message: e.errmsg });
  }
});

router.patch("/:id", async (req, res) => {
    try{
        const response = await User.findByIdAndUpdate({_id : req.params.id}, req.body, {new : true, runValidators : true})
        if(response){
            return res.json(response)
        }else{
            return res.status(404).json({
                message: "Kullanıcı bulunamadı"
            })
        }
        
    }catch(e){
        console.log("Kullanıcı güncellenirken hata oluştu", e);
        res.json({ message: "Kullanıcı güncellenirken hata oluştu" });
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      return res.json({ message: "Kullanıcı silindi" });
    } else {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }
  } catch (e) {
    console.log("Kullanıcı silinirken hata oluştu", e);
    res.json({ message: "Kullanıcı silinirken hata oluştu" });
  }
});

module.exports = router;
