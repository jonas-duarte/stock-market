const Db = require("../../db");

const generateTokenString = length => {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var token = "";
  for (let i = 0; i < length; i++) {
    token += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return token;
};

class Auth {
  login(user, password) {
    const collection = Db.getCollection("user");
    return collection.findOne({ user }).then(res => {
      if (res) {
        if (password === res.password) {
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

  async generateToken(user) {
    const collection = Db.getCollection("token");
    const token = generateTokenString(50);
    await collection.deleteMany({ user });
    await collection.insertOne({ user, token });
    return token;
  }
}

module.exports = Auth;
