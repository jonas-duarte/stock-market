import React, { Component } from "react";
import { operacoes as minhasOperacoes } from "../../assets/config";
import Table from "../../components/table";

class Operacoes extends Component {
  state = {
    operacoes: []
  };

  componentDidMount() {
    this.setState({ operacoes: minhasOperacoes });
  }

  render() {
    const { operacoes } = this.state;
    return <Table columns={columns} items={operacoes} />;
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
