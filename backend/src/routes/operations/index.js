const Db = require("../../db");

class Operations {
  get() {
    const collection = Db.getCollection("operations");
    return collection.find().toArray();
  }
}

module.exports = Operations;
