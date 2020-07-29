import "font-awesome/css/font-awesome.min.css";
import React, { Component } from "react";
import Header from "./components/Header";
import PlayingTable from "./components/game/PlayingTable";
import CardHolder from "./components/cards/CardHolder";

class App extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Header />
        <PlayingTable />
        <CardHolder />
      </div>
    );
  }
}

export default App;
