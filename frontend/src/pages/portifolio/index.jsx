import React, { Component } from "react";
import { operacoes } from "../../assets/config";
import Table from "../../components/table";
import AlphaVantage from "../../utils/apis/alphaVantage";

class Portifolio extends Component {
  state = {
    portifolio: []
  };

  componentDidMount() {
    let portifolio = [];
    operacoes.forEach(o => {
      let i = portifolio.findIndex(p => p.papel === o.papel);
      if (i === -1) {
        i = portifolio.length;
        portifolio.push({
          papel: o.papel,
          valorTotalInvestido: 0,
          quantidade: 0
        });
      }
      portifolio[i].valorTotalInvestido += o.valor * o.quantidade;
      portifolio[i].quantidade += o.quantidade;
    });
    portifolio.forEach(p => {
      AlphaVantage.getCurrentQuote(p.papel).then(res => {
        const d = res.data;
        p.precoMedio = p.valorTotalInvestido / p.quantidade;
        p.valorTotalAtual = d.price * p.quantidade;
        p.precoAtual = d.price;
        p.ganhoTotal = (p.precoAtual - p.precoMedio) * p.quantidade;
        p.ganhoPercentual = (p.ganhoTotal / p.valorTotalInvestido) * 100;
        this.setState({ portifolio });
      });
    });
  }

  render() {
    const { portifolio } = this.state;
    return <Table columns={columns} items={portifolio} />;
  }
}

export default Portifolio;

const columns = [
  { path: "papel", label: "papel", filter: true },
  { path: "quantidade", label: "quantidade" },
  { path: "valorTotalInvestido", label: "valorTotalInvestido" },
  { path: "valorTotalAtual", label: "valorTotalAtual" },
  { path: "precoMedio", label: "precoMedio" },
  { path: "precoAtual", label: "precoAtual" },
  { path: "ganhoTotal", label: "ganhoTotal" },
  { path: "ganhoPercentual", label: "ganhoPercentual" }
];
