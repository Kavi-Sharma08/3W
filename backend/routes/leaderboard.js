import express from "express";
import {User} from "../models/UserModel.js";

const leaderboard = express.Router();

leaderboard.get("/leaderboard", async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const page= parseInt(req.query.page) || 1
  
  try {
    const users = await User.find()
    .sort({ totalPoints: -1 })
    .skip((page-1)*limit)
    .limit(limit);

    const total = await User.countDocuments();
    res.status(200).json({
      users,
      totalPages : Math.ceil(total/limit),
      currentPage : page
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

export {
  leaderboard
}