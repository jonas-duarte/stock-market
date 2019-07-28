import React from "react";

import { default as TableBodyMaterial } from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function findObject(object, path) {
  var pathList = path.split(".");
  var obj = object;
  for (let i = 0; i < pathList.length; i++) {
    obj = obj[pathList[i]];
  }
  return obj;
}

const TableBody = props => {
  const { columns, items } = props;
  return (
    <TableBodyMaterial>
      {items.map(item => (
        <TableRow key={item.id}>
          {columns.map(column => {
            let object;
            if (column.path) {
              object = findObject(item, column.path);
            } else {
              object = column.object;
            }
            return (
              <TableCell
                key={item.id + (column.path || column.key)}
                align={typeof object == "number" ? "right" : "left"}
              >
                {typeof object == "number" ? object.toFixed(2) : object}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBodyMaterial>
  );
};

export default TableBody;
