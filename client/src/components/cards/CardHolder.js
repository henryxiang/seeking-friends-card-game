import React, { Component } from "react";
import { dealCards } from "../../services/card-service";
import Card from "./Card";
import CardStage from "./CardStage";

const cardSize = 1.2;
const nCards = 30;
const nDecks = 6;

export class CardHolder extends Component {
  state = {
    cards: [],
    stage: [],
    width: window.innerWidth,
    height: window.innerHeight,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  removeCard = (id) => {
    const cards = this.state.cards.filter((c) => c.id !== id);
    const removed = this.state.cards.filter((c) => c.id === id);
    const { stage } = this.state;
    stage.push(removed[0]);
    this.setState({ cards, stage });
  };

  play = () => {
    this.setState({ stage: [] });
  };

  undo = () => {
    const cards = [...this.state.cards, ...this.state.stage];
    this.setState({ cards, stage: [] });
  };

  componentDidMount() {
    const cards = dealCards(nCards, nDecks);
    this.setState({ cards });
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
        <CardStage cards={this.state.stage} play={this.play} undo={this.undo} />
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
