"use strict";

const express = require("express");
const Fundamentus = require("./routes/fundamentus");
const Db = require("./db");

var app = express();
var cors = require("cors");

var fundamentus = new Fundamentus();

Db.connect(() => {
  app.use(cors());

  app.get("/fundamentus/:papel/", function(req, res) {
    fundamentus
      .getFundamentusData(req.params.papel)
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => res.send(err));
  });

  app.listen(8080, function() {
    console.log("Listenning port 8080");
  });
});
