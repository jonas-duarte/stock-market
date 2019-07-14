"use strict";

const express = require("express");
const AlphaVantage = require("./routes/alphaVantage");
const Fundamentus = require("./routes/fundamentus");
const Auth = require("./routes/auth");
const Operations = require("./routes/operations");
const Symbols = require("./routes/symbols");
const Properties = require("./routes/properties");
const Db = require("./db");

var app = express();
var cors = require("cors");

var fundamentus = new Fundamentus();
var alphaVantage = new AlphaVantage();
var auth = new Auth();
var operations = new Operations();
var symbols = new Symbols();

const port = process.env.PORT || 8080;

Db.connect(() => {
  app.use(cors());

  app.get("/auth/", function(req, res) {
    auth
      .login(req.headers.user, req.headers.password)
      .then(token => res.send(token))
      .catch(err => res.status(500).send(err));
  });

  app.get("/test/", function(req, res) {
    res.send("Olá, vem sempre aqui?");
  });

  app.get("/operations/", function(req, res) {
    auth.validToken(req.headers.token).then(valid => {
      if (valid) {
        operations
          .get()
          .then(data => res.send(JSON.stringify(data)))
          .catch(err => res.status(500).send(err));
      } else {
        res.status(401).send("Invalid token!");
      }
    });
  });

  app.get("/symbols/", function(req, res) {
    auth.validToken(req.headers.token).then(valid => {
      if (valid) {
        symbols
          .get()
          .then(data => res.send(JSON.stringify(data)))
          .catch(err => res.status(500).send(err));
      } else {
        res.status(401).send("Invalid token!");
      }
    });
  });

  app.get("/fundamentus/:papel/", function(req, res) {
    auth.validToken(req.headers.token).then(valid => {
      if (valid) {
        fundamentus
          .getFundamentusData(req.params.papel)
          .then(data => res.send(JSON.stringify(data)))
          .catch(err => res.status(500).send(err));
      } else {
        res.status(401).send("Invalid token!");
      }
    });
  });

  app.get("/alphaVantage/:papel/", function(req, res) {
    auth.validToken(req.headers.token).then(valid => {
      if (valid) {
        alphaVantage
          .getCurrentQuote(req.params.papel)
          .then(data => res.send(JSON.stringify(data)))
          .catch(err => res.status(500).send(err));
      } else {
        res.status(401).send("Invalid token!");
      }
    });
  });

  app.listen(port, function() {
    console.log("Listenning port " + port);
  });
});
