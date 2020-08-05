import React, { Component } from "react";
import styled from "styled-components";

const View = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const Name = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
`;
const Text = styled.span`
  display: inline-block;
  flex-grow: 1;
`;

export class ChatMessage extends Component {
  render() {
    const { name, message } = this.props.msg;
    return (
      <View>
        <Name>{name}:</Name>
        <Text>{message}</Text>
      </View>
    );
  }
}

export default ChatMessage;
