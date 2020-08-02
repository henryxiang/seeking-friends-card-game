import React, { Component, createRef } from "react";
import styled from "styled-components";
import socket, { getClientId, topics } from "../websocket";

const View = styled.div`
  display: flex;
  flex-direction: column;
`;
const Messages = styled.div`
  margin: 0;
  padding: 0;
  overflow: scroll;
  height: 70vh;
  border-bottom: 2px solid black;
`;
const Form = styled.div`
  padding: 3px;
  height: 15vh;
  width: 100%;
`;
const Label = styled.div`
  margin: 5px 20px;
`;
const DataInput = styled.textarea`
  padding: 10px;
  display: block;
  width: 90%;
  height: 15vh;
  margin: 5px 20px;
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  width: 60px;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background: blue;
    color: white;
  }
`;

const Message = ({ msg }) => (
  <div style={{ borderBottom: "1px solid blue" }}>
    <pre>{JSON.stringify(msg, null, 2)}</pre>
  </div>
);

export class Debugger extends Component {
  state = {
    messages: [],
  };
  inputRef = createRef();
  clearMessages = () => {
    this.setState({ messages: [] });
  };
  sendMessage = () => {
    const input = this.inputRef.current.value;
    const [topic, message] = input.split(";\n").map((d) => d.trim());
    console.log("send message:", topic, message);
    socket.emit(topic, JSON.parse(message));
    this.inputRef.current.value = "";
  };
  updateMessage = (msg) => {
    const { messages } = this.state;
    messages.push(msg);
    this.setState({ messages });
  };
  componentDidMount = () => {
    const clientId = getClientId();
    this.updateMessage({ clientId });
    socket.on(clientId, this.updateMessage);
    socket.on(topics.statusUpdate, this.updateMessage);
    socket.on(topics.dealCards, this.updateMessage);
  };
  render() {
    return (
      <View>
        <Messages>
          {this.state.messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
        </Messages>
        <Form>
          <Label>Data:</Label>
          <DataInput ref={this.inputRef} />
          <Toolbar>
            <Button onClick={this.sendMessage}>Send</Button>
            <Button onClick={this.clearMessages}>Clear</Button>
          </Toolbar>
        </Form>
      </View>
    );
  }
}

export default Debugger;
