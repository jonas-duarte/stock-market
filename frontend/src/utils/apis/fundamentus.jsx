import Http from "../http";

class Fundamentus {
  static route = "/fundamentus/";

  static getFundamentalistData = symbol => {
    return Http.get(`${this.route}${symbol}`);
  };
}

export default Fundamentus;
