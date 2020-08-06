import React, { Component } from "react";
import Card from "../cards/Card";
import Player from "./Player";
import styles from "./PlayingTableLane.styles";

const h = {
  header: 30,
  footer: 220,
  spacing: 150,
};
export class PlayingTableLane extends Component {
  state = {
    height: window.innerHeight - h.header - h.footer - h.spacing,
  };
  render() {
    const { player, cards } = this.props;
    return (
      <div style={styles.container}>
        <Player player={player} />
        <div style={{ ...styles.cards, height: `${this.state.height}px` }}>
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
  updateHeight = () => {
    const otherHeight = h.header + h.footer + h.spacing;
    this.setState({ height: window.innerHeight - otherHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateHeight);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  }
}

export default PlayingTableLane;
