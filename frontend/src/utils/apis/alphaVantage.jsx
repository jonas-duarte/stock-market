import Http from "../http";

class AlphaVantage {
  static url = "https://stock-market-brazil-backend.herokuapp.com/alphavantage/";

  static getCurrentQuote = symbol => {
    return Http.get(`${this.url}${symbol}`);
  };
}

export default AlphaVantage;
