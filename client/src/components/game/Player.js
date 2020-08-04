import React, { Component } from "react";
import Card from "../cards/Card";

export class Player extends Component {
  render() {
    const { player } = this.props;
    const styles = {
      container: {},
      player: {
        height: "2em",
        textAlign: "center",
        marginTop: "5px",
        padding: "0px 20px",
        lineHeight: "2em",
        fontSize: "100%",
        fontWeight: "bold",
      },
      info: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
      },
      label: {
        display: "none",
        color: "red",
        marginLeft: "5px",
      },
    };
    if (player.isPlaying) styles.player.border = "1px solid purple";
    // if (player.isDealer) styles.player.fontSize = "120%";
    if (player.isFriend || player.isDealer)
      styles.label.display = "inline-block";
    return (
      <div style={styles.container}>
        <div style={styles.player}>
          {player.name}
          <i style={styles.label} className="fa fa-flag-checkered" />
        </div>
        <div style={styles.info}>{this.renderPlayerInfo(player)}</div>
      </div>
    );
  }

  renderPlayerInfo = (player) => {
    if (player.isBidding) {
      return player.bid;
    } else if (player.isDealer) {
      return player.friendCards.map((c) => (
        <Card
          key={c.id}
          position="static"
          size={0.25}
          suit={c.suit}
          rank={c.rank}
        />
      ));
    } else if (player.score) {
      return player.score;
    }
  };
}

export default Player;
