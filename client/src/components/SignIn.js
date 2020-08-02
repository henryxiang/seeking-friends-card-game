import React, { Component } from "react";
import socket, { topics, getClientId } from "../websocket";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "120%",
  },
  input: {
    margin: "20px",
    width: "200px",
  },
};

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  login = (event) => {
    event.preventDefault();
    const playerName = this.inputRef.current.value;
    socket.emit(topics.signIn, { id: getClientId(), name: playerName });
    this.inputRef.current.value = "";
  };

  componentDidMount = () => {
    this.inputRef.current.focus();
  };

  render() {
    console.log("app", socket);
    return (
      <form style={styles.container} onSubmit={this.login}>
        <h3>Seeking Friends Game</h3>
        <input
          style={styles.input}
          ref={this.inputRef}
          placeholder="Enter you name to sign in"
        />
        <input type="submit" value="Sign In" />
      </form>
    );
  }
}

export default SignIn;
