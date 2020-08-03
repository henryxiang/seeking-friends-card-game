import io from "socket.io-client";
import { uuid } from "uuidv4";
import ws from "./message-topics";

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

export const topics = ws.topics;

const socket = io("", { query: { id: getClientId() } });
export default socket;
