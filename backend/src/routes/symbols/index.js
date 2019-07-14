const Db = require("../../db");

class Symbols {
  get() {
    const collection = Db.getCollection("symbols");
    return collection.find({ ativo: true }).toArray();
  }
}

module.exports = Symbols;
