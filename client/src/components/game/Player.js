import React, { Component } from "react";
import Card from "../cards/Card";
import defaultStyles from "./Player.styles";

export class Player extends Component {
  render() {
    const { player } = this.props;
    const styles = defaultStyles;
    if (player.isPlaying) styles.player.border = "1px solid purple";
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
    if (player.isBidding && player.bid) {
      return `Bid: ${player.bid}`;
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
      return `Score: ${player.score}`;
    }
  };
}

export default Player;
