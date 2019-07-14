const Db = require("../../db");

class Properties {
  static async get(key) {
    const collection = Db.getCollection("properties");
    const data = await collection.findOne({ key });
    return data.value;
  }
}

module.exports = Properties;
