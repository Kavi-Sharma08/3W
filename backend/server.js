// server.js
import http from "http";
import { Server } from "socket.io";
import { User } from "./models/UserModel.js";

export const initSocketServer = (app) => {
  const server = http.createServer(app);
  
  const io = new Server(server, {
    cors: {
      origin: "https://chipper-starlight-5e6465.netlify.app",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  const broadcastLeaderboard = async () => {
    const users = await User.find().sort({ totalPoints: -1 });
    io.emit("leaderboard", users);
  };

  global.io = io;
  global.broadcastLeaderboard = broadcastLeaderboard;

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    broadcastLeaderboard();

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return server;
};
