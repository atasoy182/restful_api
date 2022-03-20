"use strict";

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const userController = require("../controllers/userController");

router.get("/", [authMiddleware, adminMiddleware], userController.listAllUsers);

// Oturum açan kullanıcı bilgilerini getirir
router.get("/me", authMiddleware, userController.userDetails);

// oturum açan user güncelleme işlemleri
router.patch("/me", authMiddleware, userController.updateLoggedUser);

router.post("/", userController.createNewUser);

router.post("/login", userController.login);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
