"use strict";

const express = require("express");
const AlphaVantage = require("./routes/alphaVantage");
const Fundamentus = require("./routes/fundamentus");
const Db = require("./db");

var app = express();
var cors = require("cors");

var fundamentus = new Fundamentus();
var alphaVantage = new AlphaVantage();

var password = require("./assets/keys").password;

Db.connect(() => {
  app.use(cors());

  app.get("/fundamentus/:papel/", function(req, res) {
    if (req.headers.password === password) {
      fundamentus
        .getFundamentusData(req.params.papel)
        .then(data => res.send(JSON.stringify(data)))
        .catch(err => res.send(err));
    } else {
      res.send("Invalid password!!!");
    }
  });

  app.get("/alphaVantage/:papel/", function(req, res) {
    if (req.headers.password === password) {
      alphaVantage
        .getCurrentQuote(req.params.papel)
        .then(data => res.send(JSON.stringify(data)))
        .catch(err => res.send(err));
    } else {
      res.send("Invalid password!!!");
    }
  });

  app.listen(8080, function() {
    console.log("Listenning port 8080");
  });
});
