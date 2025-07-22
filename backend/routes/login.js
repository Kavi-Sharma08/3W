import express from "express"
import { User } from "../models/UserModel.js";
const authLogin= express.Router();

authLogin.post("/login" , async(req ,res)=>{
    console.log("Inside login")
  const {username} = req.body;

  const userInfo = await User.findOne({username});
  console.log(userInfo)

  if(!userInfo){
    return res.status(400).json({message : "User not exist"});
  }
  
  return res.status(200).json(userInfo);
})

export {
    authLogin
}