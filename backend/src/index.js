"use strict";

const express = require("express");
const Fundamentus = require("./routes/fundamentus");

var app = express();
var cors = require("cors");

var fundamentus = new Fundamentus();

app.use(cors());

app.get("/fundamentus/:papel/", function(req, res) {
  fundamentus
    .getDetalhes(req.params.papel, res)
});

app.listen(8080, function() {});

// var logindb = require("./assets/keys").mongodb;

// const MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb+srv://<user>:<password>@stockmarketcluster-ecbdt.mongodb.net/test?retryWrites=true&w=majority"
//   .replace("<user>", logindb.user)
//   .replace("<password>", logindb.password);
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("stock-market").collection("fundamentus");

//   collection.findOne({ qty: 1000 }).then(res => {
//     if (res) return console.log(res);
//     console.log("nao res kkk")
//   });

//   collection.insertOne({ item: "card", qty: 14 });

//   client.close();
// });
