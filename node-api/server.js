const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// force: true will drop the table if it already exists
/*db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
});*/

// Base Route
app.get("/", (req, res) => {
    res.json({ message: "Tenpo-Asalazar" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is in ${process.env.TENPO_ENV} mode, running on port ${PORT}.`);
});