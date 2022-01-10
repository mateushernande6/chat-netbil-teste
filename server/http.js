const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

module.exports = {
  httpServer,
  io
}