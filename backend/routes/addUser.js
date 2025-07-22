import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt"
const addUser = express.Router();

addUser.post("/addUser", async (req, res)=>{
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

export{
    addUser
}