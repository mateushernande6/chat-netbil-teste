const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");
const users = require("./fake.json");

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user conect users", users);

  socket.on("chat", (msg) => {
    console.log("message => => ", msg);
  });
});

httpServer.listen(8000);
