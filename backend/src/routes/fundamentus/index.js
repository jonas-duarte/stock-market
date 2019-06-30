"use strict";

var iconv = require("iconv-lite");

const Http = require("../../utils/http");
const cheerio = require("cheerio");

const Db = require("../../db");

class Fundamentus {
  constructor() {}

  htmlToJsonDetalhes(html, papel) {
    const $ = cheerio.load(html);
    const td = $("td");
    var list = [];
    td.each((i, e) =>
      list.push(
        $(e)
          .text()
          .replace(/\%/g, "")
          .replace(/\./g, "")
          .replace(/\,/g, ".")
          .replace(/\n/g, "")
          .trim()
      )
    );
    return {
      papel: papel.toUpperCase(),
      updateDate: formatDate(new Date()),
      sync: list[1].toUpperCase() === papel.toUpperCase() ? "ok" : "com falha",
      cotacao: parseFloat(list[3]),
      tipo: list[5],
      dataUltCot: list[7],
      empresa: list[9],
      min52Sem: parseFloat(list[11]),
      setor: list[13],
      max52Sem: parseFloat(list[15]),
      subsetor: list[17],
      volMedio2m: parseFloat(list[19]),
      valorDeMercado: parseFloat(list[21]),
      ultBalancoProcessado: list[23],
      valorDaFirma: parseFloat(list[25]),
      nroAcoes: parseInt(list[27]),
      oscilacoes: {
        dia: parseFloat(list[31]),
        mes: parseFloat(list[37]),
        _30dias: parseFloat(list[43]),
        _12meses: parseFloat(list[49]),
        _2019: parseFloat(list[55]),
        _2018: parseFloat(list[61]),
        _2017: parseFloat(list[67]),
        _2016: parseFloat(list[73]),
        _2015: parseFloat(list[79]),
        _2014: parseFloat(list[85])
      },
      indicadoresFundamentalistas: {
        pl: parseFloat(list[33]),
        lpa: parseFloat(list[35]),
        pvp: parseFloat(list[39]),
        vpa: parseFloat(list[41]),
        pEbit: parseFloat(list[45]),
        margBruta: parseFloat(list[47]),
        psr: parseFloat(list[51]),
        margEbit: parseFloat(list[53]),
        pAtivos: parseFloat(list[57]),
        margLiquida: parseFloat(list[59]),
        pCapGiro: parseFloat(list[63]),
        ebitAtivo: parseFloat(list[65]),
        pAtivoCircLiq: parseFloat(list[69]),
        roic: parseFloat(list[71]),
        divYield: parseFloat(list[75]),
        roe: parseFloat(list[77]),
        evEbit: parseFloat(list[81]),
        liquidezCorr: parseFloat(list[83]),
        giroAtivos: parseFloat(list[87]),
        divBrPatrim: parseFloat(list[89]),
        cresRec: parseFloat(list[93])
      },
      dadosBalancoPatrimonial: {
        ativo: parseFloat(list[98]),
        divBruta: parseFloat(list[100]),
        disponibiliades: parseFloat(list[102]),
        divLiquida: parseFloat(list[104]),
        ativoCirculante: parseFloat(list[106]),
        patrimLiq: parseFloat(list[108])
      },
      dadosDemonstrativosResultados: {
        ult12Meses: {
          receitaLiquida: parseFloat(list[113]),
          ebit: parseFloat(list[117]),
          lucroLiquido: parseFloat(list[121])
        },
        ult3Meses: {
          receitaLiquida: parseFloat(list[115]),
          ebit: parseFloat(list[119]),
          lucroLiquido: parseFloat(list[123])
        }
      }
    };
  }

  getDetalhes(papel) {
    return Http.get(
      `http://www.fundamentus.com.br/detalhes.php?papel=${papel}`
    ).then(response => {
      return this.htmlToJsonDetalhes(
        iconv
          .decode(new Buffer.from(response.data, "latin1"), "WINDOWS-1252")
          .toString(),
        papel
      );
    });
  }

  getFundamentusData(papel) {
    const collection = Db.getCollection("fundamentus");

    return collection
      .findOne({
        papel: papel.toUpperCase(),
        updateDate: formatDate(new Date())
      })
      .then(res => {
        if (res) return res;
        return this.getDetalhes(papel).then(res => {
          collection.insertOne(res);
          return res;
        });
      });
  }
}

module.exports = Fundamentus;
