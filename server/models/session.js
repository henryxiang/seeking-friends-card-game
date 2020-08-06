const Game = require("./game");
const Player = require("./player");
const Card = require("./card");
const { topics } = require("../websocket");

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
      const clientId = socket.handshake.query.id;
      this.sockets[clientId] = socket;
      socket.on(clientId, this.handleClientMessage);
      socket.on(topics.signIn, this.playerSignIn);
      socket.on(topics.start, this.startPlaying);
      socket.on(topics.playCards, this.playCards);
      socket.on(topics.bid, this.processBids);
      socket.on(topics.chat, this.sendChatMessage);
    });
  };
  handleClientMessage = (msg) => {
    const { type, content } = msg;
    switch (type) {
      case "swapHoleCards":
        this.swapHoleCards(content);
        break;
      case "friends":
        this.chooseFriends(content);
        break;
      case "trump":
        this.chooseTrump(content);
        break;
      case "startGame":
        this.endDealerPrep(this.getCurrentGame());
        break;
    }
  };
  swapHoleCards = (holeCards) => {
    console.log("swap hole cards:", holeCards);
    this.getCurrentGame().holeCards = holeCards;
  };
  chooseFriends = (cards) => {
    console.log("friend cards", cards);
    const dealer = this.getCurrentGame().getDealer();
    const friendCards = cards.map((c) => new Card(c.suit, c.rank));
    dealer.friendCards = friendCards;
  };
  chooseTrump = (suit) => {
    console.log("chosen trump:", suit);
    this.getCurrentGame().trump = suit;
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
  sendChatMessage = ({ clientId, message }) => {
    let name = "Game";
    if (clientId) {
      const player = this.players[clientId];
      if (!player) return;
      name = player.name;
    }
    console.log("send message:", name, message);
    this.io.emit(topics.chat, { name, message });
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
    this.io.emit(topics.gameInfo, {
      type: "bidding",
      info: null,
    });
    const minBid = 80 * this.settings.nDecks;
    game.auction.minBid = minBid;
    game.auction.start();
    console.log("auction:", game.auction);
    const bidder = game.auction.getCurrentBidder();
    const clientId = this.idMap[bidder.id];
    console.log(clientId, bidder);
    this.sockets[clientId].emit(clientId, {
      type: "bid",
      info: { playerId: bidder.id, minBid },
    });
  };
  processBids = ({ playerId, bid }) => {
    console.log("processing bid:", playerId, bid);
    const game = this.getCurrentGame();
    const { auction } = game;
    auction.bid(playerId, bid);
    this.sendStatusUpdate();
    if (auction.isEnd()) {
      auction.stop();
      const dealer = auction.getAuctionWinner();
      dealer.isDealer = true;
      game.leadPlayer = dealer;
      this.endBidding(game);
    } else {
      const bidder = auction.getNextBidder();
      const clientId = this.idMap[bidder.id];
      this.sockets[clientId].emit(clientId, {
        type: "bid",
        info: { playerId: bidder.id, minBid: auction.minBid },
      });
    }
  };
  endBidding = (game) => {
    const dealer = game.getDealer();
    this.sendChatMessage({
      clientId: 0,
      message: `${dealer.name} won the auction.`,
    });
    // this.sendStatusUpdate();
    this.startDealerPrep(game);
  };
  startDealerPrep = (game) => {
    const dealer = game.getDealer();
    this.setPlayer(dealer);
    this.dealHoleCards(game);
    this.sendStatusUpdate();
  };
  endDealerPrep = (game) => {
    const dealer = game.getDealer();
    // game.trump = "spade";
    this.io.emit(topics.gameInfo, {
      type: "start",
      info: { dealer: dealer.name, trump: game.trump },
    });
    this.sendChatMessage({
      clientId: 0,
      message: "Dealer is ready. Let's play.",
    });
    game.leadPlayer = dealer;
    this.setPlayer(dealer);
    game.startNewRound();
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
      this.sockets[clientId].emit(clientId, {
        type: "deal",
        info: { id, cards },
      });
    }
  };
  dealHoleCards = (game) => {
    const dealer = game.getDealer();
    const clientId = this.idMap[dealer.id];
    const holeCards = game.holeCards;
    console.log("hole cards", clientId, holeCards);
    this.sockets[clientId].emit(clientId, {
      type: "holdCard",
      info: { id: dealer.id, holeCards },
    });
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
  setPlayer = (player) => {
    for (const p of Object.values(this.players)) {
      if (p.id === player.id) p.isPlaying = true;
      else p.isPlaying = false;
    }
  };
}

module.exports = Session;
