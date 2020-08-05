import React, { Component, createRef } from "react";
import socket, { topics, getClientId } from "../../websocket";
import {
  View,
  Header,
  Toggle,
  MessageList,
  Form,
  Input,
} from "./ChatBox.styles";
import ChatMessage from "./ChatMessage";

const maxMessages = 100;

export class ChatBox extends Component {
  state = {
    messages: [],
    message: "",
    show: false,
  };
  inputRef = createRef();

  render() {
    const { show } = this.state;
    return (
      <View>
        <Header>
          <Toggle show={show} onClick={this.toggle} />
        </Header>
        <MessageList show={show}>
          {this.state.messages.map((msg, i) => (
            <ChatMessage key={i} msg={msg} />
          ))}
        </MessageList>
        <Form show={show} onSubmit={this.sendMessage}>
          <Input
            ref={this.inputRef}
            value={this.state.message}
            onChange={this.changeInput}
          />
        </Form>
      </View>
    );
  }
  toggle = () => {
    this.setState({ show: !this.state.show });
  };
  sendMessage = (event) => {
    event.preventDefault();
    const { message } = this.state;
    const clientId = getClientId();
    this.setState({ message: "" });
    socket.emit(topics.chat, { clientId, message });
    return false;
  };
  changeInput = (event) => {
    const message = event.target.value;
    this.setState({ message });
  };
  updateMessages = (msg) => {
    let { messages } = this.state;
    messages.push(msg);
    if (messages.length > maxMessages)
      messages = messages.slice(messages.length - maxMessages, messages.length);
    this.setState({ messages });
  };
  componentDidMount() {
    if (this.state.show) this.inputRef.current.focus();
    socket.on(topics.chat, this.updateMessages);
  }
  componentDidUpdate() {
    if (this.state.show) this.inputRef.current.focus();
  }
}

export default ChatBox;
