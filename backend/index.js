import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/DbConnection.js";
import {addUser} from "./routes/addUser.js";
import { claimPoints } from "./routes/claimPoints.js";
import { allUsers } from "./routes/getAllUsers.js";
import { authLogin } from "./routes/login.js";
import{ leaderboard } from "./routes/leaderboard.js"
import './server.js';
dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors({
    origin : "http://localhost:5173"
}))

app.use("/" , authLogin);
app.use("/" , addUser);
app.use("/" , allUsers);
app.use("/" , claimPoints);
app.use("/" , leaderboard)


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
});
