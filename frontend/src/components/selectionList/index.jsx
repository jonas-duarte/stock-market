import React, { Component } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Input,
  ListItemText,
  FormControl
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class SelectionList extends Component {
  state = {};
  render() {
    const { classes, items, selectedItems, onChange, label } = this.props;
    return (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
          <Select
            multiple
            value={selectedItems}
            onChange={event => onChange(event, label)}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {items.map(item => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={selectedItems.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SelectionList);
