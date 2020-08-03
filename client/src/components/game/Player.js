import React, { Component } from "react";

export class Player extends Component {
  render() {
    const { player } = this.props;
    const styles = {
      player: {
        height: "60px",
        textAlign: "center",
        margin: "10px",
      },
    };
    return <div style={styles.player}>{player.name}</div>;
  }
}

export default Player;
