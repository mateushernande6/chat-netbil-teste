const Express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = Express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.get("/teste", (req, res) => {
  res.json({ teste: "hello" });
});

module.exports = {
  httpServer,
  io,
};
