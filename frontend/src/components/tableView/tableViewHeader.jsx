import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class TableViewHeader extends Component {
  state = {};
  render() {
    const { columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.path || column.key}>
              {column.label}
              {console.log(column.label)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableViewHeader;
