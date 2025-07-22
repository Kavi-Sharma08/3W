import express from "express";
import {User} from "../models/UserModel.js"
import { History } from "../models/HistoryModel.js";
const claimPoints = express.Router();

claimPoints.post("/claimPoints/:userId" , async (req , res)=>{

  const userId = req.params.userId;
  const dataOfWhoClaimPoints = req.body;
  const {username : whoClaim , _id : idOfWhoClaim } = dataOfWhoClaimPoints.loggedInUser;
  const userToClaimPoints = await User.findOne({_id : userId});

  const HistoryofClaimedPoints=new History({
    whoClaimthePoint : idOfWhoClaim,
    usernameOfWhoClaimPoints : whoClaim,
    toWhomPointsisGiven : userToClaimPoints._id,
    usernameOfWhomPointsisGiven : userToClaimPoints.username
  })

  await HistoryofClaimedPoints.save();
  const randomPoints = Math.floor(Math.random() * 10) + 1;
  userToClaimPoints.totalPoints+=randomPoints;
  global.broadcastLeaderboard();
  await userToClaimPoints.save();
  return res.status(200).json(randomPoints)


})

export {
  claimPoints
}