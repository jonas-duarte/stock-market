import React, { Component } from "react";

import { default as TableMaterial } from "@material-ui/core/Table";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";
import SelectionList from "../selectionList";

const getValuesFromPath = (items, path) => {
  const filterArray = items.map(item => item[path]);
  return Array.from(new Set(filterArray));
};

const filterMultiples = (items, path, filters) => {
  let filteredItems = [];
  items.forEach(item => {
    if (filters.includes(item[path])) {
      filteredItems.push(item);
    }
  });
  return filteredItems;
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
    const { columns, items } = this.props;
    const { sort, selectedFilters } = this.state;

    const filters = columns.filter(column => column.filter);

    let filteredItems = items;
    filters.forEach(f => {
      if (selectedFilters[f.path] && selectedFilters[f.path].length > 0) {
        filteredItems = filterMultiples(
          filteredItems,
          f.path,
          selectedFilters[f.path]
        );
      }
    });

    const orderedItems =
      sort.path === ""
        ? filteredItems
        : _.orderBy(filteredItems, [sort.path], [sort.order]);

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
          <TableBody columns={columns} items={orderedItems} />
        </TableMaterial>
      </React.Fragment>
    );
  }
}

export default Table;
