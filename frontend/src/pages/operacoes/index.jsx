import React, { Component } from "react";
// import { operacoes as minhasOperacoes } from "../../assets/config";
import Table from "../../components/table";
import J from "../../utils/apis/J";

class Operacoes extends Component {
  state = {
    operacoes: []
  };

  async componentDidMount() {
    const operacoes = await J.getOperations();
    this.setState({ operacoes });
  }

  render() {
    const { operacoes } = this.state;
    return <Table id="operacoes" columns={columns} items={operacoes} />;
  }
}

export default Operacoes;

const columns = [
  { path: "operacao", label: "operacao", filter: true },
  { path: "papel", label: "papel", filter: true },
  { path: "quantidade", label: "quantidade" },
  { path: "valor", label: "valor" },
  { path: "data", label: "data" }
];
