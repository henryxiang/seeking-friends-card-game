import React, { Component } from "react";
import { Card, getPlayers } from "../../services/card-service";
import PlayingTableLane from "./PlayingTableLane";

const styles = {
  container: {
    border: "2px solid black",
    backgroundColor: "palegreen",
    display: "flex",
    justifyContent: "space-around",
  },
  lane: {
    height: "60vh",
  },
};

const cards = [
  new Card("spade", "a"),
  new Card("spade", "10"),
  new Card("spade", "a"),
  new Card("spade", "10"),
  new Card("spade", "k"),
  new Card("spade", "k"),
  new Card("spade", "q"),
  new Card("spade", "j"),
  new Card("spade", "q"),
  new Card("spade", "j"),
  new Card("spade", "a"),
  new Card("spade", "10"),
  new Card("spade", "a"),
  new Card("spade", "10"),
  new Card("spade", "k"),
  new Card("spade", "k"),
  new Card("spade", "q"),
  new Card("spade", "j"),
  new Card("spade", "q"),
  new Card("spade", "j"),
];

class PlayingTable extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const players = getPlayers();
    this.setState({ players });
  }

  render() {
    const { players } = this.state;
    return (
      <div style={styles.container}>
        {players.map((p) => (
          <PlayingTableLane player={p} cards={cards} />
        ))}
      </div>
    );
  }
}

export default PlayingTable;
