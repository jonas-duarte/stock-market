import React, { Component } from "react";

import { default as TableMaterial } from "@material-ui/core/Table";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";
import SelectionList from "../selectionList";

import { paginate } from "../../utils/list/paginate";
import { filterEachFromPath } from "../../utils/list/filters";

const getValuesFromPath = (items, path) => {
  const filterArray = items.map(item => item[path]);
  return Array.from(new Set(filterArray));
};

class Table extends Component {
  state = {
    selectedFilters: {},
    sort: {
      path: "",
      order: ""
    }
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  handleChange = (event, path) => {
    let selectedFilters = this.state.selectedFilters;
    selectedFilters[path] = event.target.value;
    this.setState({ selectedFilters });
  };

  render() {
    const { columns, items, pageSize } = this.props;
    const { sort, selectedFilters } = this.state;

    const filters = columns.filter(column => column.filter);

    let filteredItems = filterEachFromPath(items, filters, selectedFilters);

    const orderedItems =
      sort.path === ""
        ? filteredItems
        : _.orderBy(filteredItems, [sort.path], [sort.order]);

    const paginatedItems = paginate(orderedItems, 1, pageSize);

    return (
      <React.Fragment>
        {filters.map(f => (
          <SelectionList
            key={f.path}
            label={f.label}
            onChange={this.handleChange}
            items={getValuesFromPath(items, f.path)}
            selectedItems={selectedFilters[f.path] || []}
          />
        ))}
        <TableMaterial>
          <TableHeader columns={columns} sort={sort} onSort={this.handleSort} />
          <TableBody
            columns={columns}
            items={paginatedItems}
            pageSize={pageSize}
          />
        </TableMaterial>
      </React.Fragment>
    );
  }
}

Table.defaultProps = {
  pageSize: 1000
};

export default Table;
