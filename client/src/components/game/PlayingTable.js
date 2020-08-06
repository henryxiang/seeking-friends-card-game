import React, { Component } from "react";
import socket, { topics } from "../../websocket";
import PlayingTableLane from "./PlayingTableLane";
import styles from "./PlayingTable.styles";
class PlayingTable extends Component {
  state = {
    players: [],
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
  componentDidMount = () => {
    socket.on(topics.statusUpdate, (players) => {
      this.setState({ players });
    });
  };
}
export default PlayingTable;
