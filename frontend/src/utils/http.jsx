import axios from "axios";

const url = "https://stock-market-brazil-backend.herokuapp.com";
// const url = "http://localhost:8080";

const handleError = error => {
  if (error.response.status === 401) {
    localStorage.removeItem("stock-market-token");
    window.location.reload();
  }
  throw error;
};

class Http {
  static post = (route, body) => {
    return axios
      .post(this.getLink(route), body, this.getConfig(null))
      .catch(err => handleError(err));
  };

  static get = (route, params) => {
    return axios
      .get(this.getLink(route), this.getConfig(params))
      .catch(err => handleError(err));
  };

  static put = (route, body) => {
    return axios
      .put(this.getLink(route), body, this.getConfig(null))
      .catch(err => handleError(err));
  };

  static delete = route => {
    return axios
      .delete(this.getLink(route), this.getConfig(null))
      .catch(err => handleError(err));
  };

  static getLink(route) {
    return url + route;
  }

  static getConfig(params) {
    const config = { headers: params || {} };
    config.headers.token = localStorage.getItem("stock-market-token") || "";
    return config;
  }
}

export default Http;
