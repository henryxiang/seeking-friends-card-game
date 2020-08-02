const subscribe = (socket, topic, callback) => {
  socket.on(topic, callback);
};

const topics = {
  signIn: "SignIn",
  start: "Start",
  dealCards: "DealCards",
  statusUpdate: "StatusUpdate",
  playCards: "PlayCards",
};

module.exports = {
  topics,
  subscribe,
};
