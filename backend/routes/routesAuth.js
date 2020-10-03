const express = require("express");
const router = new express.Router();
const asegurarAutenticacion = require("../config/Auth");

module.exports = (passport, db) => {
    const AuthController = require('../controllers/AuthController')(passport, db);
  
// Autenticacion
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// router.get("/logout", AuthController.logout);
router.post("/usuario/confirm", AuthController.confirmAuth);


return router 
}
