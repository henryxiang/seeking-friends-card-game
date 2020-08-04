import React, { Component, createRef } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    marginLeft: "25vw",
    width: "50vw",
    bottom: "220px",
    alignItems: "stretch",
    backgroundColor: "lightgrey",
    borderRadius: "5px",
    border: "2px solid black",
  },
  messages: {
    height: "30vh",
    overflow: "scroll",
    border: "1px solid blue",
    backgroundColor: "white",
  },
  input: {
    margin: "3px",
    height: "2em",
    padding: "3px",
    lineHeight: "2em",
    width: "100%",
  },
  toolbar: {
    textAlign: "center",
    background: "lightgrey",
    height: "1em",
  },
  toggle: {
    display: "inline-block",
    color: "blue",
    width: "200px",
    cursor: "pointer",
  },
};
export class ChatBox extends Component {
  state = {
    messages: [],
    message: "",
    show: false,
  };
  inputRef = createRef();
  changeInput = (event) => {
    const message = event.target.value;
    this.setState({ message });
  };
  sendMessage = (event) => {
    event.preventDefault();
    this.setState({ message: "" });
    return false;
  };
  toggle = () => {
    this.setState({ show: !this.state.show });
  };
  componentDidMount() {
    if (this.state.show) this.inputRef.current.focus();
  }
  componentWillUpdate() {
    if (this.state.show) this.inputRef.current.focus();
  }
  render() {
    const { show } = this.state;
    if (!show)
      return (
        <div style={styles.container}>
          <div style={styles.toolbar}>
            <i
              style={styles.toggle}
              className={show ? "fa fa-caret-down" : "fa fa-caret-up"}
              onClick={this.toggle}
            />
          </div>
        </div>
      );
    return (
      <div style={styles.container}>
        <div style={styles.toolbar}>
          <i
            style={styles.toggle}
            className={show ? "fa fa-caret-down" : "fa fa-caret-up"}
            onClick={this.toggle}
          />
        </div>
        <div style={styles.messages}>
          {this.state.messages.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
        <form onSubmit={this.sendMessage} style={{ display: "flex" }}>
          <input
            ref={this.inputRef}
            style={styles.input}
            placeholder="Enter text to chat"
            value={this.state.message}
            onChange={this.changeInput}
          />
        </form>
      </div>
    );
  }
}

export default ChatBox;
