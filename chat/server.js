const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (!rooms[roomID]) {
      rooms[roomID] = [];
    }

    rooms[roomID].push(socket.id);
    const otherUsers = rooms[roomID].filter((id) => id !== socket.id);

    if (otherUsers.length > 0) {
      socket.emit("other users", otherUsers); // 다른 사용자들을 클라이언트에 알림
      otherUsers.forEach((otherUserID) => {
        socket.to(otherUserID).emit("user joined", socket.id);
      });
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });

  socket.on("disconnect", () => {
    for (const roomID in rooms) {
      rooms[roomID] = rooms[roomID].filter((id) => id !== socket.id);
      if (rooms[roomID].length === 0) {
        delete rooms[roomID];
      }
    }
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
