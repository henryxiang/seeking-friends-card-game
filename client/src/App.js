import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import Card from "./components/cards/Card";
import { dealCards } from "./services/card-service";
import { Header } from "./components/Header";
import PlayingTable from "./components/game/PlayingTable";

const players = ["Henry", "Aaron", "Joe", "Alex", "David", "Peter", "Jane", "Zoe", "Frank", "Mark"];

const App = () => {
  const size = 1.2;
  const nCards = 25;
  const decks = 6;
  const d = 20;

  const [cards, setCards] = useState(dealCards(nCards, decks));
  // console.log(cards);
  const removeCard = (id) => {
    console.log("removing", id);
    const newCards = cards.filter(c => c.id !== id);
    setCards(newCards);
  };
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <PlayingTable players={players} />
      {/** Moving the following code to CardHolder component */}
      <div style={{ position: "relative", backgroundColor: "gray" }}>
        {cards
          .sort((a, b) => b.value - a.value)
          .map((c, i) => (
            <Card
              id={c.id}
              key={c.id}
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
