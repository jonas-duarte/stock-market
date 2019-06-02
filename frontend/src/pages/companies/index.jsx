import React, { Component } from "react";
import { papeis } from "../../assets/config";
import Fundamentus from "../../utils/apis/fundamentus";
import Table from "../../components/table";

class Companies extends Component {
  state = {
    companies: []
  };

  componentDidMount() {
    papeis.forEach(p => {
      Fundamentus.getFundamentalistData(p).then(res => {
        this.state.companies.push(res.data);
        this.setState({ companies: this.state.companies });
      });
    });
  }

  render() {
    const { companies } = this.state;
    return <Table columns={columns} items={companies} />;
  }
}

export default Companies;

const columns = [
  { path: "papel", label: "papel", filter: true },
  { path: "cotacao", label: "cotacao" },
  { path: "tipo", label: "tipo", filter: true },
  { path: "dataUltCot", label: "dataUltCot" },
  { path: "empresa", label: "empresa" },
  { path: "min52Sem", label: "min52Sem" },
  { path: "setor", label: "setor", filter: true },
  { path: "max52Sem", label: "max52Sem" },
  { path: "subsetor", label: "subsetor", filter: true },
  { path: "volMedio2m", label: "volMedio2m" },
  { path: "valorDeMercado", label: "valorDeMercado" },
  { path: "ultBalancoProcessado", label: "ultBalancoProcessado" },
  { path: "valorDaFirma", label: "valorDaFirma" },
  { path: "nroAcoes", label: "nroAcoes" },
  { path: "oscilacoes.dia", label: "oscilacoes.dia" },
  { path: "oscilacoes.mes", label: "oscilacoes.mes" },
  { path: "oscilacoes._30dias", label: "oscilacoes._30dias" },
  { path: "oscilacoes._12meses", label: "oscilacoes._12meses" },
  { path: "oscilacoes._2019", label: "oscilacoes._2019" },
  { path: "oscilacoes._2018", label: "oscilacoes._2018" },
  { path: "oscilacoes._2017", label: "oscilacoes._2017" },
  { path: "oscilacoes._2016", label: "oscilacoes._2016" },
  { path: "oscilacoes._2015", label: "oscilacoes._2015" },
  { path: "oscilacoes._2014", label: "oscilacoes._2014" },
  {
    path: "indicadoresFundamentalistas.pl",
    label: "indicadoresFundamentalistas.pl"
  },
  {
    path: "indicadoresFundamentalistas.lpa",
    label: "indicadoresFundamentalistas.lpa"
  },
  {
    path: "indicadoresFundamentalistas.pvp",
    label: "indicadoresFundamentalistas.pvp"
  },
  {
    path: "indicadoresFundamentalistas.vpa",
    label: "indicadoresFundamentalistas.vpa"
  },
  {
    path: "indicadoresFundamentalistas.pEbit",
    label: "indicadoresFundamentalistas.pEbit"
  },
  {
    path: "indicadoresFundamentalistas.margBruta",
    label: "indicadoresFundamentalistas.margBruta"
  },
  {
    path: "indicadoresFundamentalistas.psr",
    label: "indicadoresFundamentalistas.psr"
  },
  {
    path: "indicadoresFundamentalistas.margEbit",
    label: "indicadoresFundamentalistas.margEbit"
  },
  {
    path: "indicadoresFundamentalistas.pAtivos",
    label: "indicadoresFundamentalistas.pAtivos"
  },
  {
    path: "indicadoresFundamentalistas.margLiquida",
    label: "indicadoresFundamentalistas.margLiquida"
  },
  {
    path: "indicadoresFundamentalistas.pCapGiro",
    label: "indicadoresFundamentalistas.pCapGiro"
  },
  {
    path: "indicadoresFundamentalistas.ebitAtivo",
    label: "indicadoresFundamentalistas.ebitAtivo"
  },
  {
    path: "indicadoresFundamentalistas.pAtivoCircLiq",
    label: "indicadoresFundamentalistas.pAtivoCircLiq"
  },
  {
    path: "indicadoresFundamentalistas.roic",
    label: "indicadoresFundamentalistas.roic"
  },
  {
    path: "indicadoresFundamentalistas.divYield",
    label: "indicadoresFundamentalistas.divYield"
  },
  {
    path: "indicadoresFundamentalistas.roe",
    label: "indicadoresFundamentalistas.roe"
  },
  {
    path: "indicadoresFundamentalistas.evEbit",
    label: "indicadoresFundamentalistas.evEbit"
  },
  {
    path: "indicadoresFundamentalistas.liquidezCorr",
    label: "indicadoresFundamentalistas.liquidezCorr"
  },
  {
    path: "indicadoresFundamentalistas.giroAtivos",
    label: "indicadoresFundamentalistas.giroAtivos"
  },
  {
    path: "indicadoresFundamentalistas.divBrPatrim",
    label: "indicadoresFundamentalistas.divBrPatrim"
  },
  {
    path: "indicadoresFundamentalistas.cresRec",
    label: "indicadoresFundamentalistas.cresRec"
  },
  {
    path: "dadosBalancoPatrimonial.ativo",
    label: "dadosBalancoPatrimonial.ativo"
  },
  {
    path: "dadosBalancoPatrimonial.divBruta",
    label: "dadosBalancoPatrimonial.divBruta"
  },
  {
    path: "dadosBalancoPatrimonial.disponibiliades",
    label: "dadosBalancoPatrimonial.disponibiliades"
  },
  {
    path: "dadosBalancoPatrimonial.divLiquida",
    label: "dadosBalancoPatrimonial.divLiquida"
  },
  {
    path: "dadosBalancoPatrimonial.ativoCirculante",
    label: "dadosBalancoPatrimonial.ativoCirculante"
  },
  {
    path: "dadosBalancoPatrimonial.patrimLiq",
    label: "dadosBalancoPatrimonial.patrimLiq"
  },
  {
    path: "dadosDemonstrativosResultados.ult12Meses.receitaLiquida",
    label: "dadosDemonstrativosResultados.ult12Meses.receitaLiquida"
  },
  {
    path: "dadosDemonstrativosResultados.ult12Meses.ebit",
    label: "dadosDemonstrativosResultados.ult12Meses.ebit"
  },
  {
    path: "dadosDemonstrativosResultados.ult12Meses.lucroLiquido",
    label: "dadosDemonstrativosResultados.ult12Meses.lucroLiquido"
  },
  {
    path: "dadosDemonstrativosResultados.ult3Meses.receitaLiquida",
    label: "dadosDemonstrativosResultados.ult3Meses.receitaLiquida"
  },
  {
    path: "dadosDemonstrativosResultados.ult3Meses.ebit",
    label: "dadosDemonstrativosResultados.ult3Meses.ebit"
  },
  {
    path: "dadosDemonstrativosResultados.ult3Meses.lucroLiquido",
    label: "dadosDemonstrativosResultados.ult3Meses.lucroLiquido"
  }
];
