export const companyIsValid = company => {
  try {
    if (company.min52Sem === 0) return false;
    // Se o preço/lucro for negativo, indica que a empresa teve prejuíso
    if (company.indicadoresFundamentalistas.pl <= 0) return false;
    // Dividendos
    // if (company.indicadoresFundamentalistas.divYield < 2) return false;
    // Se o preço/lucro for muito alto, significa que o lucro está muito baixo, se relacionado ao preço da ação
    // if (company.indicadoresFundamentalistas.pl > 20) return false;
    // Indicador Preço / Valor Patrimonial Ajustado
    // if (company.indicadoresFundamentalistas.pvp > 1.5) return false;
    // ROE = Rentabilidade / o patrímonio líquido
    // Ideal > 15
    // if (company.indicadoresFundamentalistas.roe < 10) return false;
    // Divida líquida / Patrímonio líquido
    // Ideal < 50%
    // const divLiqPatLiq =
    //   (company.dadosBalancoPatrimonial.divLiquida /
    //     company.dadosBalancoPatrimonial.patrimLiq) *
    //   100;
    // if (divLiqPatLiq >= 100) return false;
    // Dívida líquida / EBIT anual
    // Ideal < 200%
    // const divLiqEbit =
    //   (company.dadosBalancoPatrimonial.divLiquida /
    //     company.dadosDemonstrativosResultados.ult12Meses.ebit) *
    //   100;
    // if (divLiqEbit >= 300) return false;
    if (companyScore(company) < 8) return false;
  } catch (e) {
    console.log(company.papel, e);
    return false;
  }
  return true;
};

export const companyScore = company => {
  let pontos = 0;
  let indicadores = 5;
  pontos += 20 - company.indicadoresFundamentalistas.pl;
  pontos += company.indicadoresFundamentalistas.roe - 15;
  pontos += (1 / company.indicadoresFundamentalistas.pvp) * 10;
  const divLiqPatLiq =
    (company.dadosBalancoPatrimonial.divLiquida /
      company.dadosBalancoPatrimonial.patrimLiq) *
    100;
  pontos += divLiqPatLiq / 5;
  const divLiqEbit =
    (company.dadosBalancoPatrimonial.divLiquida /
      company.dadosDemonstrativosResultados.ult12Meses.ebit) *
    100;
  pontos += divLiqEbit / 15;
  return pontos / indicadores;
};
