module.exports = (app, db) => {
    var router = require("express").Router();
  
    // Create a new user
    router.post("/user/create", db.users.create);
  
    // Retrieve user
    router.get("/user/:id", db.users.findOne);

    // Create a new consultation
    router.post("/consultation/create", db.consultations.create);
  
    // Retrieve all consultations
    router.get("/consultation/:query", db.consultations.findAll);

    app.use('/api', router);
};