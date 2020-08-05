import React, { Component } from "react";
import socket, { subscribe, topics, getClientId } from "./websocket";
import SignIn from "./components/SignIn";
import Game from "./components/Game";
// import Game from "./components/Debugger";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      signedIn: false,
      players: {},
      cards: [],
      timeElapse: 0,
    };
    subscribe(socket, topics.socketConnect, () => {
      console.log("connected:", new Date().toString());
      this.setState({ connected: true });
    });
    subscribe(socket, topics.signIn, this.signIn);
  }

  signIn = (id) => {
    if (id === getClientId()) {
      this.setState({ signedIn: true });
      console.log(this.state);
    }
  };

  render() {
    if (!this.state.connected) return <div>connecting to server...</div>;
    return <div>{this.state.signedIn ? <Game /> : <SignIn />}</div>;
  }
}

export default App;
