import React, { Component, createRef } from "react";
import socket, { topics } from "../websocket";
import labels from "../labels-en";

const styles = {
  modal: {
    position: "fixed",
    zIndex: 1,
    paddingTop: "100px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    backgroundColor: "#fefefe",
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "60%",
    height: "40%",
  },
  form: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "110%",
    color: "black",
  },
  input: {
    margin: "10px",
    width: "50px",
    height: "20px",
  },
  buttonToolBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100px",
    height: "30px",
    margin: "10px",
    cursor: "pointer",
  },
  label: {
    marginTop: "10px",
  },
};

export class GameSettings extends Component {
  deckRef = createRef();
  holeCardRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      nDecks: 1,
      nHoleCards: 6,
      show: props.show,
    };
  }

  componentDidMount() {
    this.deckRef.current.focus();
  }
  componentDidUpdate(_, prevState) {
    if (!prevState.show) {
      this.setState({ show: true });
    }
  }

  startGame = (event) => {
    event.preventDefault();
    const { nDecks, nHoleCards } = this.state;
    socket.emit(topics.start, { nDecks, nHoleCards });
    this.setState({ show: false });
  };

  cancel = (event) => {
    event.preventDefault();
    this.setState({ show: false });
  };

  onInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  };
  render() {
    if (!this.state.show) return null;
    return (
      <div style={styles.modal}>
        <div style={styles.content}>
          <form style={styles.form} onSubmit={this.startGame}>
            <h3>{labels.gameSettings.title}</h3>
            <div style={styles.label}>{labels.gameSettings.decks}</div>
            <input
              type="number"
              ref={this.deckRef}
              style={styles.input}
              defaultValue={this.state.nDecks}
              onChange={this.onInputChange}
            />
            <div style={styles.label}>{labels.gameSettings.holeCards}</div>
            <input
              type="number"
              style={styles.input}
              defaultValue={this.state.nHoleCards}
              onChange={this.onInputChange}
            />
            <div style={styles.buttonToolBar}>
              <button style={styles.button} onClick={this.startGame}>
                {labels.gameSettings.playButton}
              </button>
              <button style={styles.button} onClick={this.cancel}>
                {labels.gameSettings.cancelButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default GameSettings;
