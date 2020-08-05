import React, { Component } from "react";
import Header from "./Header";
import PlayingTable from "./game/PlayingTable";
import CardHolder from "./cards/CardHolder";
import ChatBox from "./chat/ChatBox";
import BiddingCard from "./game/BiddingCard";

export class Game extends Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Header />
        <PlayingTable />
        <CardHolder />
        <ChatBox />
        <BiddingCard />
      </div>
    );
  }
}

export default Game;
