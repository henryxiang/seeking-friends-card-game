import React, { Component } from "react";
import socket, { topics, getClientId } from "../../websocket";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    width: "20vw",
    backgroundColor: "lightblue",
    bottom: "220px",
    left: "40vw",
    borderRadius: "20px",
    zIndex: 1,
  },
  title: {
    margin: "5px",
    fontSize: "110%",
    fontWeight: "bold",
  },
  input: {
    display: "inline-block",
    height: "2em",
    fontSize: "2em",
    fontWeight: "bold",
    textAlign: "center",
    width: "8vw",
  },
  toolbar: {
    display: "flex",
    width: "15vw",
    justifyContent: "center",
  },
  button: {
    display: "inline-block",
    width: "6vw",
    flexGrow: 1,
    color: "white",
    backgroundColor: "blue",
    cursor: "pointer",
    margin: "5px",
  },
};
export class BiddingCard extends Component {
  state = {
    show: false,
    minBid: 100,
    bid: 100,
    playerId: null,
  };
  inputRef = React.createRef();
  bid = () => {
    const { playerId, bid } = this.state;
    socket.emit(topics.bid, { playerId, bid });
    this.setState({ show: false, bid: this.state.minBid });
  };
  quit = () => {
    const { playerId } = this.state;
    const bid = "quit";
    socket.emit(topics.bid, { playerId, bid });
    this.setState({ show: false });
  };
  changeInput = (event) => {
    const bid = event.target.value;
    this.setState({ bid });
  };
  componentDidMount() {
    const clientId = getClientId();
    if (this.state.show) this.inputRef.current.focus();
    socket.on(clientId, ({ type, info }) => {
      if (type === "bid") {
        const { playerId, minBid } = info;
        const bid = parseInt(minBid);
        console.log("bid:", playerId, bid);
        this.setState({ show: true, playerId, minBid, bid });
      }
    });
  }
  render() {
    if (!this.state.show) return null;
    return (
      <div style={styles.container}>
        <div style={styles.title}>Enter Your Bid</div>
        <input
          ref={this.inputRef}
          style={styles.input}
          type="number"
          step="5"
          max={this.state.minBid}
          defaultValue={this.state.bid}
          onChange={this.changeInput}
        />
        <div style={styles.toolbar}>
          <button style={styles.button} onClick={this.bid}>
            Bid
          </button>
          <button style={styles.button} onClick={this.quit}>
            Quit
          </button>
        </div>
      </div>
    );
  }
}

export default BiddingCard;
