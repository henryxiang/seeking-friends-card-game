import React, { Component } from "react";
import socket, { topics } from "../websocket";
import labels from "../labels-en";
import GameSettings from "./GameSettings";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "blue",
    color: "white",
    height: "30px",
  },
  logo: {
    width: "50px",
  },
  info: {
    flexGrow: 1,
    contentJustify: "center",
    textAlign: "center",
    lineHeight: "2rem",
  },
  control: {
    width: "50px",
    lineHeight: "2rem",
  },
  button: {
    cursor: "pointer",
  },
};

const suitUnicode = {
  heart: 9825,
  diamond: 9826,
  club: 9827,
  spade: 9828,
};

const GameInfo = ({ dealer, trump }) =>
  !dealer || !trump ? (
    <span>Game Not Started</span>
  ) : (
    <span>
      {`${labels.header.dealer}: 
        ${dealer}  |  
        ${labels.header.trump}: 
        ${String.fromCharCode(suitUnicode[trump])}`}
    </span>
  );

class Header extends Component {
  state = {
    showSettings: false,
    isGameStarted: false,
    dealer: null,
    trump: null,
  };

  showSettings = (event) => {
    event.preventDefault();
    this.setState({ showSettings: true });
  };

  componentDidMount() {
    socket.on(topics.gameInfo, ({ dealer, trump }) => {
      this.setState({ dealer, trump, showSettings: false });
    });
  }

  render() {
    const { dealer, trump } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.logo}></div>
        <div style={styles.info}>
          <GameInfo dealer={dealer} trump={trump} />
        </div>
        <div style={styles.control}>
          <i
            style={styles.button}
            className="fa fa-gear"
            onClick={this.showSettings}
          />
        </div>
        {this.state.showSettings ? (
          <GameSettings show={this.state.showSettings} />
        ) : null}
      </div>
    );
  }
}

export default Header;
