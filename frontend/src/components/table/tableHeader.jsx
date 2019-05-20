import React, { Component } from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Icon from "@material-ui/core/Icon";

class TableHeader extends Component {
  state = {};

  raiseSort = path => {
    if (path == null) {
      return;
    }
    let order = "asc";
    if (path === this.props.sort.path && this.props.sort.order === "asc") {
      order = "desc";
    }

    this.props.onSort({ path, order });
  };

  renderSortIcon = column => {
    const { sort } = this.props;
    if (column.path === sort.path) {
      return (
        <Icon>
          {sort.order === "asc" ? "arrow_drop_down" : "arrow_drop_up"}
        </Icon>
      );
    }
  };

  render() {
    const { columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
