// server.js
import http from "http";
import { Server } from "socket.io";
import express from "express"
import { connectDB } from "./database/DbConnection.js";
import {User} from "./models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
const app =express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const broadcastLeaderboard = async () => {
  const users = await User.find().sort({ totalPoints: -1 });
  io.emit("leaderboard", users);
};

// Save to global so you can use it in routes
global.io = io;
global.broadcastLeaderboard = broadcastLeaderboard;

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  broadcastLeaderboard();

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// DB + server start
connectDB()
  .then(() => {
    const PORT = process.env.PORT2 || 3000;
    server.listen(PORT);
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });
