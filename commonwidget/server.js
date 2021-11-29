const express = require("express");
const app = express();
const path = require("path");
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
require("./config/env");
// console.log("process.env", process.env);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", express.static(path.join(__dirname, "build")));

app.listen(process.env.PORT, function () {
  console.log(`Widget server started running at ${process.env.PORT} port`);
});
