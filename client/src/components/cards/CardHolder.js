import React, { Component } from "react";
import socket, { topics, getClientId } from "../../websocket";
import Card from "./Card";
import CardStage from "./CardStage";

const cardSize = 1.2;
export class CardHolder extends Component {
  state = {
    cards: [],
    cardsToPlay: [],
    width: window.innerWidth,
    height: window.innerHeight,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  removeCard = (id) => {
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

  componentDidMount() {
    const clientId = getClientId();
    socket.on(clientId, (cards) => {
      console.log("cards dealt:", cards.length);
      this.setState({ cards });
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
    console.log(cards);
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
