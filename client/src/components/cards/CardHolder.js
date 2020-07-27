import React, { Component } from "react";

export class CardHolder extends Component {
  state = {
    cards: [],
    width: window.innerWidth,
    height: window.innerHeight,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { cards, width } = this.state;
    const length = 50;
    const style = {
      margin: `5px ${(width - length) / 2}px`,
    };
    return <div style={style}>CardHolder</div>;
  }
}

export default CardHolder;
