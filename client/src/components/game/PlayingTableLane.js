import React, { Component } from "react";
import Card from "../cards/Card";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  player: {
    height: "60px",
    textAlign: "center",
    margin: "10px",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
  },
};

export class PlayingTableLane extends Component {
  render() {
    const { player, cards } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.player}>{player.name}</div>
        <div style={styles.cards}>
          {cards
            .sort((a, b) => b.value - a.value)
            .map((c, i) => (
              <Card
                key={i}
                suit={c.suit}
                rank={c.rank}
                size={0.6}
                position="static"
              />
            ))}
        </div>
      </div>
    );
  }
}

export default PlayingTableLane;
