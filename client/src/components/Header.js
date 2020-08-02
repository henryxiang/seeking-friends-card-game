import React, { Component } from "react";
import GameSettings from "./GameSettings";
import AppContext from "../context/app-context";

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

class Header extends Component {
  static contextType = AppContext;
  state = {
    showSettings: false,
    isGameStarted: false,
  };

  showSettings = (event) => {
    event.preventDefault();
    this.setState({ showSettings: true });
  };
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logo}></div>
        <div style={styles.info}>Game Not Started</div>
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
