import React, { Component } from "react";
import Table from "@material-ui/core/Table";

import TableViewHeader from "./tableViewHeader";
import TableViewBody from "./tableViewBody";

class TableView extends Component {
  render() {
    const { columns, items } = this.props;
    return (
      <Table>
        <TableViewHeader columns={columns} />
        <TableViewBody columns={columns} items={items} />
      </Table>
    );
  }
}

export default TableView;
