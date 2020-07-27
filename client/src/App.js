import React, { useState } from "react";
import Card from "./components/cards/Card";
import { dealCards } from "./services/card-service";
import CardHolder from "./components/cards/CardHolder";

function App() {
  const size = 1.2;
  const nCards = 54;
  const decks = 6;
  const d = 20;

  const [cards, setCards] = useState(dealCards(nCards, decks));
  // console.log(cards);
  const removeCard = (i) => {
    console.log("removing", i);
    const newCards = [
      ...cards.slice(0, i),
      ...cards.slice(i + 1, cards.length),
    ];
    setCards(newCards);
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          height: "65vh",
          borderBottom: "2px solid black",
          backgroundColor: "palegreen",
        }}
      ></div>
      <div style={{ position: "relative", backgroundColor: "gray" }}>
        {cards
          .sort((a, b) => b.value - a.value)
          .map((c, i) => (
            <Card
              id={i}
              key={i}
              suit={c.suit}
              rank={c.rank}
              x={25 + d * i}
              y={30}
              size={size}
              onClick={removeCard}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
