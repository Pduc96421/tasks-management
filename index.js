const express = require("express");
const database = require("./config/database");
require("dotenv").config();

const routeApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.port;

database.connect();

// Routes Version 1
routeApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});