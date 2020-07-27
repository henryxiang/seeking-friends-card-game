import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import Card from "./components/cards/Card";
import { dealCards } from "./services/card-service";
import { Header } from "./components/Header";
import PlayingTable from "./components/game/PlayingTable";

const players = ["Henry", "Aaron", "Joe", "Alex", "David", "Peter"];

const App = () => {
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
      <Header />
      <PlayingTable players={players} />
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
};

export default App;
