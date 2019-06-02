import Http from "../http";

class AlphaVantage {
  static url = "http://localhost:8080/alphavantage/";

  static getCurrentQuote = symbol => {
    return Http.get(`${this.url}${symbol}`);
  };
}

export default AlphaVantage;
