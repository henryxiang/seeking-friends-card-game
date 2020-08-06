import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";

const View = styled.div`
  display: flex;
  align-items: flex-end;
  position: fixed;
  width: 50%;
  left: 25%;
  bottom: 200px;
  z-index: 1;
`;
const Play = styled.button`
  height: 30px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;
const Undo = styled.button`
  height: 30px;
  cursor: pointer;
`;

export class CardStage extends Component {
  render() {
    const { cards, undo, play } = this.props;
    if (cards.length == 0) return null;
    return (
      <View>
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
        <Play onClick={play}>Play</Play>
        <Undo onClick={undo}>Undo</Undo>
      </View>
    );
  }
}

export default CardStage;
