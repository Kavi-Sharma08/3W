import express from "express";
import {User} from "../models/UserModel.js"
const claimPoints = express.Router();

claimPoints.post("/claimPoints/:userId" , async (req , res)=>{

  const userId = req.params.userId;
  console.log(userId);

  const userToClaimPoints = await User.findOne({_id : userId});
  console.log(userToClaimPoints)

  const randomPoints = Math.floor(Math.random() * 10) + 1;

  userToClaimPoints.totalPoints+=randomPoints;

  await userToClaimPoints.save();

  return res.status(200).json(randomPoints)


})

export {
    claimPoints
}