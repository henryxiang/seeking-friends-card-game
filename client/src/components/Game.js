import React, { Component } from "react";
import Header from "./Header";
import PlayingTable from "./game/PlayingTable";
import CardHolder from "./cards/CardHolder";
import ChatBox from "./game/ChatBox";

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
      </div>
    );
  }
}

export default Game;
