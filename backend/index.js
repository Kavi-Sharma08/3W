// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/DbConnection.js";
import { addUser } from "./routes/addUser.js";
import { claimPoints } from "./routes/claimPoints.js";
import { allUsers } from "./routes/getAllUsers.js";
import { authLogin } from "./routes/login.js";
import { leaderboard } from "./routes/leaderboard.js";
import { initSocketServer } from "./server.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://chipper-starlight-5e6465.netlify.app",
  credentials: true
}));


app.use("/", authLogin);
app.use("/", addUser);
app.use("/", allUsers);
app.use("/", claimPoints);
app.use("/", leaderboard);


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const server = initSocketServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });
