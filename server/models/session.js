const Game = require("./game");
const Player = require("./player");
const Message = require("./message");
const { topics } = require("../websocket");
const Auction = require("./auction");

class Session {
  constructor(io) {
    this.io = io;
    this.sockets = {};
    this.players = {};
    this.idMap = {};
    this.games = [];
    this.settings = null;
    this.initEventListeners();
  }
  initEventListeners = () => {
    this.io.on("connection", (socket) => {
      const id = socket.handshake.query.id;
      this.sockets[id] = socket;
      socket.on(topics.signIn, this.playerSignIn);
      socket.on(topics.start, this.startPlaying);
      socket.on(topics.playCards, this.playCards);
    });
  };
  playerSignIn = (msg) => {
    const { id, name } = msg;
    console.log("player sign in:", id, name);
    if (!this.players[id]) {
      const player = new Player(name);
      player.order = Object.keys(this.players).length + 1;
      this.players[id] = player;
      this.idMap[player.id] = id;
      console.log("new player:", player);
    }
    this.sockets[id].emit(topics.signIn, id);
    this.sendStatusUpdate();
  };
  sendStatusUpdate = () => {
    console.log("status update:", this.players);
    this.io.emit(topics.statusUpdate, Object.values(this.players));
  };
  getPlayersInOrder = () => {
    return Object.values(this.players).sort((a, b) => a.order - b.order);
  };
  startPlaying = (settings) => {
    this.settings = settings;
    console.log("game settings:", this.settings);
    console.log("game players:", Object.keys(this.players).length);
    this.startNewGame();
  };
  startNewGame = () => {
    const { nDecks, nHoleCards } = this.settings;
    const game = new Game(this.players, nDecks, nHoleCards);
    this.games.push(game);
    this.dealCards();
    // this.sendStatusUpdate();
    console.log("start new game:", this.games.length);
    this.startBidding(game);
  };
  startBidding = (game) => {
    // Todo: fix this hard-coded stuff
    const firstBidder = Object.values(this.players).find((p) => p.order === 1);
    const auction = new Auction(this.players, firstBidder);
    auction.lowestBid = game.nDecks * 100;
    let currentBidderId = auction.getCurrentBidderClientId();
    console.log("bidder id:", currentBidderId);
    this.sockets[currentBidderId].emit(topics.bid, {
      lowestBid: auction.lowestBid,
    });
    this.sockets[currentBidderId].on(topics.bid, ({ playerId, offer }) => {
      auction.bid(playerId, offer);
      if (auction.isEnd()) {
        this.endBidding(game);
      } else {
        auction.setNextBidder();
        currentBidderId = auction.getCurrentBidderClientId();
        this.sockets[currentBidderId].emit(topics.bid, {
          lowestBid: auction.lowestBid,
        });
      }
    });
    // this.endBidding(game);
  };
  endBidding = (game) => {
    const dealer = game.getDealer();
    game.trump = "spade";
    this.io.emit(topics.gameInfo, { dealer: dealer.name, trump: game.trump });
    this.sendStatusUpdate();
  };
  getCurrentGame = () => {
    return this.games[this.games.length - 1];
  };
  dealCards = () => {
    const { players } = this;
    for (const clientId in players) {
      const { id } = players[clientId];
      const cards = this.getCurrentGame().dealCards();
      console.log("deal cards", clientId, cards.length);
      this.sockets[clientId].emit(clientId, { id, cards });
    }
  };
  playCards = ({ clientId, cards }) => {
    this.getCurrentGame().playCards(clientId, cards);
    // this.players[clientId].cardsPlayed = cards;
    this.sendStatusUpdate();
    if (this.getCurrentGame().isCurrentRoundEnd()) {
      setTimeout(() => {
        this.getCurrentGame().startNewRound();
        this.sendStatusUpdate();
      }, 2000);
    }
  };
}

module.exports = Session;
