import React from "react";

const AppContext = React.createContext({
  socket: null,
  login: (playerName) => null,
  clientId: null,
  players: {},
  timeElapse: null,
});

export default AppContext;
