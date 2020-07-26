import React, { Component } from "react";
import {ReactComponent as HeartA} from "../components/cards/heart-a.svg";

export class Circle extends Component {
  render() {
    return (
      <svg width={500} height={600}>
        <HeartA/>
      </svg>
    );
  }
}

export default Circle;
