import React, { Component } from "react";
import socket, { topics } from "../../websocket";
import PlayingTableLane from "./PlayingTableLane";

const styles = {
  container: {
    border: "2px solid black",
    backgroundColor: "palegreen",
    display: "flex",
    justifyContent: "space-around",
    flexGrow: 1,
  },
};

class PlayingTable extends Component {
  state = {
    players: [],
  };

  componentDidMount = () => {
    socket.on(topics.statusUpdate, (players) => {
      this.setState({ players });
    });
  };

  render() {
    return (
      <div style={styles.container}>
        {this.state.players
          .sort((a, b) => a.order - b.order)
          .map((p) => (
            <PlayingTableLane key={p.id} player={p} cards={p.cardsPlayed} />
          ))}
      </div>
    );
  }
}

export default PlayingTable;
