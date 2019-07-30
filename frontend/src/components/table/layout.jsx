import React, { Component } from "react";

import {
  Button,
  Icon,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@material-ui/core";

class Layout extends Component {
  state = {
    layout: []
  };

  componentDidMount() {
    const { id, columns } = this.props;
    this.setState({
      layout: JSON.parse(localStorage.getItem(`layout-${id}`)) || [...columns]
    });
  }

  handleSaveLayout = () => {
    const { id } = this.props;
    const { layout } = this.state;
    localStorage.setItem(`layout-${id}`, JSON.stringify(layout));
    alert("Configuração de layout salva!!!");
  };

  handleInsert = item => {
    const { layout } = this.state;
    const index = layout.findIndex(i => i.path === item.path);
    if (index !== -1) return;
    layout.push(item);
    this.setState({ layout });
  };

  handleRemove = item => {
    const { layout } = this.state;
    const index = layout.findIndex(i => i.path === item.path);
    layout.splice(index, 1);
    this.setState({ layout });
  };

  handleUpPosition = item => {
    const { layout } = this.state;
    const index = layout.findIndex(i => i.path === item.path);
    if (index - 1 < 0) return;
    const aux = layout[index];
    layout[index] = layout[index - 1];
    layout[index - 1] = aux;
    this.setState({ layout });
  };

  handleDownPosition = item => {
    const { layout } = this.state;
    const index = layout.findIndex(i => i.path === item.path);
    if (index + 1 >= layout.length) return;
    const aux = layout[index];
    layout[index] = layout[index + 1];
    layout[index + 1] = aux;
    this.setState({ layout });
  };

  render() {
    const { columns } = this.props;
    const { layout } = this.state;
    return (
      <React.Fragment>
        <Button
          onClick={this.handleSaveLayout}
          style={{
            float: "right"
          }}
        >
          <Icon>save</Icon>Save layout
        </Button>
        <Grid container>
          <Grid item container xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              {columns.map(c => (
                <React.Fragment>
                  <TableBody>
                    <TableRow>
                      <TableCell>{c.label}</TableCell>
                      <TableCell>
                        <Button onClick={() => this.handleInsert(c)}>
                          <Icon>arrow_forward</Icon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </React.Fragment>
              ))}
            </Table>
          </Grid>
          <Grid item container xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Remove</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Up</TableCell>
                  <TableCell>Down</TableCell>
                </TableRow>
              </TableHead>
              {layout.map(c => (
                <React.Fragment>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Button onClick={() => this.handleRemove(c)}>
                          <Icon>arrow_backward</Icon>
                        </Button>
                      </TableCell>
                      <TableCell>{c.label}</TableCell>
                      <TableCell>
                        <Button onClick={() => this.handleUpPosition(c)}>
                          <Icon>arrow_upward</Icon>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => this.handleDownPosition(c)}>
                          <Icon>arrow_downward</Icon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </React.Fragment>
              ))}
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Layout;
