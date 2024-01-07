require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Mongoose = require("mongoose");
const ssm = require("./connections/aws-ssm");
const state = { isShutdown: false };
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const xlsx = require("xlsx");
const path = require("path");

const DEBUG_DELAY = 2000;
const READINESS_PROBE_DELAY = 2 * 2 * 1000;

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000,
  })
);
app.use(bodyParser.json({ limit: "100mb" }));

var server = app.listen(process.env.PORT, async () => {
  console.log("Connected successfully on port " + process.env.PORT);
  await ssm.initialiseEnvironment();

  const store = new MongoDBStore({
    uri: process.env.MONGO_READ_DB,
    collection: "user_sessions",
  });
  app.use(
    session({
      secret: "ppgLMS",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );
  const routes = require("./routes/routes");


  app.use(routes);

})