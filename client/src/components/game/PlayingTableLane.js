import React, { Component } from "react";
import Card from "../cards/Card";
import Player from "./Player";

const h = {
  header: 30,
  footer: 220,
  spacing: 150,
};
export class PlayingTableLane extends Component {
  styles = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
    cards: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignContent: "center",
      marginTop: "30px",
    },
  };
  state = {
    height: window.innerHeight - h.header - h.footer - h.spacing,
  };
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
  render() {
    const { player, cards } = this.props;
    return (
      <div style={this.styles.container}>
        <Player player={player} />
        <div style={{ ...this.styles.cards, height: `${this.state.height}px` }}>
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
