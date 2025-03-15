const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const routeApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.port;

database.connect();

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser("Ducno96421"));

// Routes Version 1
routeApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
