import React, { Component } from "react";
import Card from "../cards/Card";
import Player from "./Player";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
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
        <Player player={player} />
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
