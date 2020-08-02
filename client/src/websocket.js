import io from "socket.io-client";
import { uuid } from "uuidv4";

export const getClientId = () => {
  let clientId = window.localStorage.getItem("sfcg:clientId");
  if (!clientId) {
    clientId = uuid();
    window.localStorage.setItem("sfcg:clientId", clientId);
  }
  return clientId;
};

export const subscribe = (socket, topic, callback) => {
  console.log("subscribe:", topic);
  socket.on(topic, callback);
};

export const topics = {
  socketConnect: "connect",
  signIn: "SignIn",
  start: "Start",
  dealCards: "DealCards",
  statusUpdate: "StatusUpdate",
  playCards: "PlayCards",
};

const socket = io("", { query: { id: getClientId() } });
export default socket;
