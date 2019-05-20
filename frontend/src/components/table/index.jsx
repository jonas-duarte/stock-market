import React, { Component } from "react";

import { default as TableMaterial } from "@material-ui/core/Table";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";

class Table extends Component {
  state = {
    sort: {
      path: "",
      order: ""
    }
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  render() {
    const { columns, items } = this.props;
    const { sort } = this.state;

    const orderedItems =
      sort.path === "" ? items : _.orderBy(items, [sort.path], [sort.order]);

    return (
      <TableMaterial>
        <TableHeader columns={columns} sort={sort} onSort={this.handleSort} />
        <TableBody columns={columns} items={orderedItems} />
      </TableMaterial>
    );
  }
}

export default Table;
