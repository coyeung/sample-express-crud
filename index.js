const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost"
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
const db = require("./app/models");

try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // db.sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
    db.sequelize.sync();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// simple route
require("./app/routes/api.route")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to sample application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

