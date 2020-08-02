class Message {
  static parse(data) {
    const msg = JSON.parse(data);
    return new Message(msg.type, msg.content);
  }
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
  toString() {
    return JSON.stringify({
      type: this.type,
      content: this.content,
    });
  }
}

module.exports = Message;
