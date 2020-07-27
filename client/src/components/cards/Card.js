import React, { Component } from "react";
import styled from "styled-components";

const images = require.context("./png", true);

const Img = styled.img.attrs((props) => ({
  src: props.src,
  width: 100 * props.size,
}))`
  position: ${(props) => props.position || "absolute"};
  left: ${(props) => props.x + "px"};
  top: ${(props) => props.y + "px"};
  &:hover {
    top: ${(props) => props.y - 20 + "px"};
  }
`;

export class Card extends Component {
  render() {
    const {
      id,
      suit,
      rank,
      x = 0,
      y = 0,
      size = 2,
      position = "absolute",
      onClick = () => null,
    } = this.props;
    const src = images(`./${suit}-${rank}.png`);
    return (
      <Img
        src={src}
        x={x}
        y={y}
        size={size}
        position={position}
        onClick={() => onClick(id)}
      />
    );
  }
}

export default Card;
