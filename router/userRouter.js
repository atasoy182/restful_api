"use strict";

const router = require("express").Router();
const User = require("../models/userModel");
const createHttpError = require("http-errors");

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

router.patch("/:id", async (req, res, next) => {
  delete req.body.password;
  delete req.body.createdAt;
  delete req.body.updatedAt;

  try {
    const response = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (response) {
      return res.json(response);
    } else {
      throw new Error("Kullanıcı bulunamadı");
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      return res.json({ message: "Kullanıcı silindi" });
    } else {
      throw createHttpError(404, "Kullanıcı Bulunamadı !");
    }
  } catch (e) {
    next(createHttpError(400, e));
  }
});

module.exports = router;
