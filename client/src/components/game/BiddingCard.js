import React, { Component } from "react";

const styles = {
  container: {
    display: "fixed",
    width: "50%",
    height: "20%",
    bottom: "220px",
    left: "25%",
  },
};
export class BiddingCard extends Component {
  state = {
    show: true,
  };
  bid = () => {
    this.setState({ show: false });
  };
  render() {
    if (!this.state.show) return null;
    return (
      <div style={styles.container}>
        <input type="number" step="5" />
        <button onClick={this.bid}>Bid</button>
        <button>Pass</button>
        <button>Quit</button>
      </div>
    );
  }
}

export default BiddingCard;
