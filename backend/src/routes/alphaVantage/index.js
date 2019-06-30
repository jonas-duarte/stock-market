const key = require("../../assets/keys").alphaVantage.key;

const Http = require("../../utils/http");

const url = "https://www.alphavantage.co/";

const Db = require("../../db");

const formatDate = require("../../utils/date").formatDate;

class AlphaVantage {
  getCurrentQuote(papel) {
    const collection = Db.getCollection("alphaVantage-globalQuote");
    return collection
      .findOne({
        papel: papel.toUpperCase(),
        updateDate: formatDate(new Date())
      })
      .then(res => {
        if (res) return res;
        return this.getGlobalQuote(papel).then(res => {
          collection.insertOne(res);
          return res;
        });
      });
  }

  getGlobalQuote(papel) {
    const query = ["function=GLOBAL_QUOTE", `symbol=${papel}.SAO`];
    return Http.get(this.urlBuilder(query)).then(res => {
      const d = res.data;
      return {
        papel: papel.toUpperCase(),
        updateDate: formatDate(new Date()),
        symbol: d["Global Quote"]["01. symbol"],
        open: parseFloat(d["Global Quote"]["02. open"]),
        high: parseFloat(d["Global Quote"]["03. high"]),
        low: parseFloat(d["Global Quote"]["04. low"]),
        price: parseFloat(d["Global Quote"]["05. price"]),
        volume: parseInt(d["Global Quote"]["06. volume"]),
        date: d["Global Quote"]["07. latest trading day"],
        previousClose: parseFloat(d["Global Quote"]["08. previous close"]),
        change: parseFloat(d["Global Quote"]["09. change"]),
        changePercent: parseFloat(d["Global Quote"]["10. change percent"])
      };
    });
  }

  urlBuilder(query) {
    return `${url}query?${query.join("&")}&apikey=${key}`;
  }
}

module.exports = AlphaVantage;
