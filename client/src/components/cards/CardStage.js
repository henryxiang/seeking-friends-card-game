import React, { Component } from "react";
import Card from "./Card";

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-end",
    position: "fixed",
    width: "50%",
    left: "25%",
    bottom: "200px",
  },
};

export class CardStage extends Component {
  render() {
    const { cards, undo, play } = this.props;
    if (cards.length == 0) return null;
    return (
      <div style={styles.container}>
        {cards
          .sort((a, b) => b.value - a.value)
          .map((c) => (
            <Card
              key={c.id}
              position="static"
              size={0.7}
              suit={c.suit}
              rank={c.rank}
            />
          ))}
        <button
          style={{
            height: "30px",
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer",
          }}
          onClick={play}
        >
          Play
        </button>
        <button style={{ height: "30px", cursor: "pointer" }} onClick={undo}>
          Undo
        </button>
      </div>
    );
  }
}

export default CardStage;
