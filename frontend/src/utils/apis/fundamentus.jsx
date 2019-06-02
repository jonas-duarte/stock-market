import Http from "../http";

class Fundamentus {
  static url = "http://localhost:8080/fundamentus/";

  static getFundamentalistData = symbol => {
    return Http.get(`${this.url}${symbol}`);
  };
}

export default Fundamentus;
