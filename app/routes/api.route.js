const db = require("../models");
const { authJwt } = require("../middlewares");
const authController = require("../controllers/authController");
const consultationController = require("../controllers/consultationController");

module.exports = (app) => {
    var router = require("express").Router();
  
    // Create a new user
    router.post("/auth/create", authController.createUser);
    // Login
    router.post("/auth/login", authController.login);

    // Create a new consultation
    router.post("/consultation/create", [authJwt.verifyToken], consultationController.createConsultation);
    // Retrieve in a period
    router.get("/consultation/listing", [authJwt.verifyToken], consultationController.getConsultationsByPeriod);
    // Retrieve consultation details
    router.get("/consultation/:id", [authJwt.verifyToken], consultationController.getConsultationById);

    app.use('/api', router);
};