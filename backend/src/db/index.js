var logindb = require("../assets/keys").mongodb;

const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://<user>:<password>@stockmarketcluster-ecbdt.mongodb.net/test?retryWrites=true&w=majority"
  .replace("<user>", logindb.user)
  .replace("<password>", logindb.password);

const client = new MongoClient(uri, { useNewUrlParser: true });

const database = "stock-market";

class Db {
  constructor() {}

  static connect(callback) {
    client.connect(err => {
      if (!err) {
        console.log("Successfully connected in the data base :)");
        callback();
      } else {
        console.log("Error: " + err);
      }
    });
  }

  static close() {
    console.log("Closing connection with the data base :(");
    client.close();
  }

  static getCollection(collection) {
    return client.db(database).collection(collection);
  }
}

module.exports = Db;
