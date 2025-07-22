import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/DbConnection.js";
import {addUser} from "./routes/addUser.js";
import { claimPoints } from "./routes/claimPoints.js";
import { allUsers } from "./routes/getAllUsers.js";
import { authLogin } from "./routes/login.js";
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



connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
});
