"use strict";

const express = require("express");
const Fundamentus = require("./routes/fundamentus");

var app = express();
var cors = require("cors");

var fundamentus = new Fundamentus();

app.use(cors());

app.get("/fundamentus/:papel/", function(req, res) {
  fundamentus
    .getDetalhes(req.params.papel)
    .then(response => res.send(response));
});

app.listen(8080, function() {});
