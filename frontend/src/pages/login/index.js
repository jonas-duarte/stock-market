import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Auth from "../../utils/apis/auth";

class Login extends Component {
  state = { user: "", password: "" };

  handleSingIn = () => {
    const { user, password } = this.state;

    Auth.login(user, password).then(token => {
      localStorage.setItem("stock-market-token", token);
      this.props.update();
    });
  };

  handleChangeUser = event => {
    this.setState({ user: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px"
        }}
      >
        <CssBaseline />
        <Avatar
          style={{
            backgroundColor: "blue"
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="user"
          label="User"
          name="user"
          autoComplete="user"
          autoFocus
          onChange={this.handleChangeUser}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={this.handleChangePassword}
        />
        <Button
          onClick={this.handleSingIn}
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </Container>
    );
  }
}

export default Login;
