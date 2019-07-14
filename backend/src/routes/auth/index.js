const Db = require("../../db");

class Auth {
  login(user, password) {
    console.log("vai se fuder");
    const collection = Db.getCollection("user");
    return collection.findOne({ user }).then(res => {
      if (res) {
        if (password === res.password) {
          console.log(this.generateToken(user));
          return this.generateToken(user);
        } else {
          throw "Invalid password!";
        }
      } else {
        throw "Account not matched!";
      }
    });
  }

  validToken(token) {
    const collection = Db.getCollection("token");
    return collection.findOne({ token }).then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  }

  generateToken(user) {
    // TODO: Create a better token generator
    const collection = Db.getCollection("token");
    const token = user + "-token";
    collection.insertOne({ user, token });
    return token;
  }
}

module.exports = Auth;
