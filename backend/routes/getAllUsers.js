import express from "express";
import {User} from "../models/UserModel.js"
const allUsers = express.Router();
allUsers.get("/getAllUsers", async (req, res) => {
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
export {
    allUsers
}