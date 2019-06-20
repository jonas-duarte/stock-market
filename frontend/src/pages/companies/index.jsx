import React, { Component } from "react";
import CompaniesTable from "./companiesTable";
import { papeis } from "../../assets/config";
import { filterEachFromPath } from "../../utils/list/filters";
import SelectionList from "../../components/selectionList";
import { Button } from "@material-ui/core";

const filters = [
  { path: "setor", label: "setor" },
  { path: "subsetor", label: "subsetor" }
];

const getValuesFromPath = (items, path) => {
  const filterArray = items.map(item => item[path]);
  return Array.from(new Set(filterArray));
};

class Companies extends Component {
  state = {
    selectedFilters: {},
    filteredItems: []
  };

  handleFilterChange = (event, path) => {
    let selectedFilters = this.state.selectedFilters;
    selectedFilters[path] = event.target.value;
    this.setState({ selectedFilters });
  };

  handleOnFilter = () => {
    const { selectedFilters } = this.state;
    this.setState({
      filteredItems: filterEachFromPath(papeis, filters, selectedFilters)
    });
  };

  render() {
    const { selectedFilters, filteredItems } = this.state;

    return (
      <div>
        <div>
          {filters.map(f => (
            <SelectionList
              key={f.path}
              label={f.label}
              onChange={this.handleFilterChange}
              items={getValuesFromPath(papeis, f.path)}
              selectedItems={selectedFilters[f.path] || []}
            />
          ))}
          <Button onClick={this.handleOnFilter}>Ok</Button>
        </div>
        <div>
          <CompaniesTable papeis={filteredItems} />
        </div>
      </div>
    );
  }
}

export default Companies;
