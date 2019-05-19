import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function findPath(object, path) {
  var pathList = path.split(".");
  var obj = object;
  for (let i = 0; i < pathList.length; i++) {
    obj = obj[pathList[i]];
  }
  return obj;
}

const TableViewBody = props => {
  const { columns, items } = props;
  return (
    <TableBody>
      {items.map(item => (
        <TableRow key={item.id}>
          {columns.map(column => (
            <TableCell key={item.id + (column.path || column.key)}>
              {findPath(item, column.path) }
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableViewBody;
