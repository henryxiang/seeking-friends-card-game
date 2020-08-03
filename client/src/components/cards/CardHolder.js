import React, { Component } from "react";
import socket, { topics, getClientId } from "../../websocket";
import Card from "./Card";
import CardStage from "./CardStage";

const cardSize = 1.2;
export class CardHolder extends Component {
  state = {
    playerId: 1,
    player: { id: 0 },
    leadingCards: [],
    cards: [],
    cardsToPlay: [],
    width: window.innerWidth,
    height: window.innerHeight,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  removeCard = (id) => {
    const { player, playerId } = this.state;
    console.log("remove card:", playerId, player);
    if (player.id === playerId && !player.isPlaying) return;
    const cards = this.state.cards.filter((c) => c.id !== id);
    const removed = this.state.cards.filter((c) => c.id === id);
    const { cardsToPlay } = this.state;
    cardsToPlay.push(removed[0]);
    this.setState({ cards, cardsToPlay });
  };

  play = () => {
    socket.emit(topics.playCards, {
      clientId: getClientId(),
      cards: this.state.cardsToPlay,
    });
    this.setState({ cardsToPlay: [] });
  };

  undo = () => {
    const cards = [...this.state.cards, ...this.state.cardsToPlay];
    this.setState({ cards, cardsToPlay: [] });
  };

  getLocalPlayer = (players) => {
    const player = players.find((p) => p.id === this.state.playerId);
    console.log("cardholder player updated:", player);
    this.setState({ player });
  };

  getLeadingCards = (players) => {
    const player = players.find((p) => p.cardsPlayed.length !== 0);
    if (this.state.leadingCards.length === 0 && player) {
      this.setState({ leadingCards: player.cardsPlayed });
    } else if (this.state.leadingCards.length > 0 && !player) {
      this.setState({ leadingCards: [] });
    }
  };

  componentDidMount() {
    const clientId = getClientId();
    socket.on(clientId, ({ id, cards }) => {
      console.log("cards dealt:", id, cards.length);
      this.setState({ playerId: id, cards });
    });
    socket.on(topics.statusUpdate, (players) => {
      this.getLocalPlayer(players);
      this.getLeadingCards(players);
    });
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { cards, width } = this.state;
    const d = 18 * cardSize;
    const length = 100 * cardSize + d * (cards.length - 1);
    const space = (width - length) / 2;

    const styles = {
      container: {
        textAlign: "center",
        position: "relative",
        height: "220px",
      },
    };
    return (
      <div style={styles.container}>
        <CardStage
          cards={this.state.cardsToPlay}
          play={this.play}
          undo={this.undo}
        />
        {cards
          .sort((a, b) => b.value - a.value)
          .map((c, i) => (
            <Card
              id={c.id}
              key={c.id}
              suit={c.suit}
              rank={c.rank}
              x={space + d * i}
              y={30}
              size={cardSize}
              onClick={this.removeCard}
            />
          ))}
      </div>
    );
  }
}

export default CardHolder;
