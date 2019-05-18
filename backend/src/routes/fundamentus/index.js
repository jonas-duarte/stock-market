"use strict";

// convert from UTF-8 to ISO-8859-1
var iconv = require("iconv-lite");

const Http = require("../../utils/http");
const cheerio = require("cheerio");

class Fundamentus {
  constructor() {}

  htmlToJsonDetalhes(html) {
    const $ = cheerio.load(html);
    const td = $("td");
    var list = [];
    td.each((i, e) => list.push($(e).text()));
    return JSON.stringify({
      papel: list[1],
      cotacao: list[3],
      tipo: list[5],
      dataUltCot: list[7],
      empresa: list[9],
      min52Sem: list[11],
      setor: list[13],
      max52Sem: list[15],
      subsetor: list[17],
      volMedio2m: list[19],
      valorDeMercado: list[21],
      ultBalancoProcessado: list[23],
      valorDaFirma: list[25],
      nroAcoes: list[27],
      oscilacoes: {
        dia: list[31],
        mes: list[37],
        _30dias: list[43],
        _12meses: list[49],
        _2019: list[55],
        _2018: list[61],
        _2017: list[67],
        _2016: list[73],
        _2015: list[79],
        _2014: list[85]
      },
      indicadoresFundamentalistas: {
        pl: list[33],
        lpa: list[35],
        pvp: list[39],
        vpa: list[41],
        pEbit: list[45],
        margBruta: list[47],
        psr: list[51],
        margEbit: list[53],
        pAtivos: list[57],
        margLiquida: list[59],
        pCapGiro: list[63],
        ebitAtivo: list[65],
        pAtivoCircLiq: list[69],
        roic: list[71],
        divYield: list[75],
        roe: list[77],
        evEbit: list[81],
        liquidezCorr: list[83],
        giroAtivos: list[87],
        divBrPatrim: list[89],
        cresRec: list[93]
      },
      dadosBalancoPatrimonial: {
        ativo: list[98],
        divBruta: list[100],
        disponibiliades: list[102],
        divLiquida: list[104],
        ativoCirculante: list[106],
        patrimLiq: list[108]
      },
      dadosDemonstrativosResultados: {
        ult12Meses: {
          receitaLiquida: list[113],
          ebit: list[117],
          lucroLiquido: list[121]
        },
        ult3Meses: {
          receitaLiquida: list[115],
          ebit: list[119],
          lucroLiquido: list[123]
        }
      }
    });
  }

  getDetalhes(papel) {
    return Http.get(
      `http://www.fundamentus.com.br/detalhes.php?papel=${papel}`
    ).then(response => {
      return this.htmlToJsonDetalhes(
        iconv.decode(response.data, "ISO-8859-1").toString()
      );
    });
  }
}

module.exports = Fundamentus;
