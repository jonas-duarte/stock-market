const axios = require("axios");

class Http {
  static post(url, body) {
    return axios.post(url, body);
  }

  static get(url, params) {
    return axios.get(url, params);
  }

  static put(url, id, body) {
    return axios.put((url, id), body);
  }

  static delete(url, id) {
    return axios.delete(url, id);
  }
}

module.exports = Http;
