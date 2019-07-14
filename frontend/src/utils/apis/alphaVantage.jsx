import Http from "../http";

class AlphaVantage {
  static route = "/alphavantage/";

  static getCurrentQuote = symbol => {
    return Http.get(`${this.route}${symbol}`);
  };
}

export default AlphaVantage;
