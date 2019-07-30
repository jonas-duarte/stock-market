import React, { Component } from "react";

import { default as TableMaterial } from "@material-ui/core/Table";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";
import SelectionList from "../selectionList";

import { paginate } from "../../utils/list/paginate";
import { filterEachFromPath } from "../../utils/list/filters";
import { Button, Icon, Grid } from "@material-ui/core";

import { findObject } from "./utils";
import Modal from "../modal";
import Layout from "./layout";
import Filters from "./filters";
import Sort from "./sort";

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
    },
    layout: [],
    open: false,
    modal: null
  };

  loadProperties() {
    const { id, columns } = this.props;
    this.setState({ layout: JSON.parse(localStorage.getItem(`layout-${id}`)) || [...columns] });
  }

  componentDidMount() {
    this.loadProperties();
  }

  handleSort = sort => {
    this.setState({ sort });
  };

  handleChange = (event, path) => {
    let selectedFilters = this.state.selectedFilters;
    selectedFilters[path] = event.target.value;
    this.setState({ selectedFilters });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleOpenModal = component => {
    this.setState({ open: true, modal: component });
  };

  handleUpdate = () => {
    this.loadProperties();
  };

  render() {
    const { id, columns, items, pageSize } = this.props;
    const { sort, selectedFilters, open, modal, layout } = this.state;

    const filters = columns.filter(column => column.filter);

    let filteredItems = filterEachFromPath(items, filters, selectedFilters);

    // Filtrar conforme seleção

    const orderedItems =
      sort.path === ""
        ? filteredItems
        : _.orderBy(filteredItems, [sort.path], [sort.order]);

    const paginatedItems = paginate(orderedItems, 1, pageSize);

    return (
      <React.Fragment>
        <Grid container direction="row" alignItems="center">
          {filters.map(f => (
            <SelectionList
              key={f.path}
              label={f.label}
              onChange={this.handleChange}
              items={getValuesFromPath(items, f.path)}
              selectedItems={selectedFilters[f.path] || []}
            />
          ))}
          {[
            {
              label: "Filtros",
              icon: "filter_list",
              onClick: () =>
                this.handleOpenModal(<Filters id={id} columns={columns} />)
            },
            {
              label: "Ordenação",
              icon: "sort",
              onClick: () =>
                this.handleOpenModal(<Sort id={id} columns={columns} />)
            },
            {
              label: "Layout",
              icon: "view_column",
              onClick: () =>
                this.handleOpenModal(<Layout id={id} columns={columns} />)
            },
            {
              label: "Update",
              icon: "update",
              onClick: this.handleUpdate
            }
          ].map(b => (
            <Button onClick={b.onClick} style={{ height: "48px" }}>
              <Icon>{b.icon}</Icon>
              {b.label}
            </Button>
          ))}
        </Grid>
        <TableMaterial>
          <TableHeader columns={layout} sort={sort} onSort={this.handleSort} />
          <TableBody
            columns={layout}
            items={paginatedItems}
            pageSize={pageSize}
          />
        </TableMaterial>

        <Modal open={open} onClose={this.handleCloseModal} size="90">
          {modal}
        </Modal>
      </React.Fragment>
    );
  }
}

Table.defaultProps = {
  pageSize: 1000
};

export default Table;
