import React, { Component } from "react";
import Fundamentus from "../../utils/apis/fundamentus";
import Table from "../../components/table";

import { columns } from "./columns";
import { companyIsValid, companyScore } from "./filters";

class CompaniesTable extends Component {
  state = {
    companies: []
  };

  updateCompanies() {
    let { papeis } = this.props;
    this.state.companies = [];
    papeis.forEach(p => {
      Fundamentus.getFundamentalistData(p.papel).then(res => {
        const c = res.data;
        // if (!companyIsValid(c)) return;
        c.score = companyScore(c);
        this.state.companies.push(c);
        this.setState({ companies: this.state.companies });
      });
    });
  }

  componentDidMount() {
    this.updateCompanies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.papeis !== this.props.papeis) this.updateCompanies();
  }

  render() {
    const { papeis } = this.props;
    const { companies } = this.state;

    return (
      <React.Fragment>
        <div>
          Empresas listadas/total: {companies.length}/{papeis.length}
        </div>
        <Table columns={columns} items={companies} />
      </React.Fragment>
    );
  }
}

export default CompaniesTable;
