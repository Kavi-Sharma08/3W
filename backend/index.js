import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt"
import { connectDB } from "./database/DbConnection.js";
import { User } from "./models/UserModel.js";
dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors({
    origin : "http://localhost:5173"
}))

app.post("/addUser", async (req, res)=>{
    try {
        const data = req.body;
        const {username , name , password}  = data;

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = new User({
            username,
            name,
            password : hashedPassword
        })

        const userData = await user.save();

        return res.status(200).json(userData)
    } catch (err) {
      if (err?.cause?.code === 11000) {
        console.log("Key pattern:", err.cause.keyPattern);
        console.log("Duplicate value:", err.cause.keyValue);
        console.log("Full message:", err.message);
        return res.status(400).json({message : err.message});
      } else {
        console.error("Some other error:", err);
      }
    }
    

})
app.get("/getAllUsers", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

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
