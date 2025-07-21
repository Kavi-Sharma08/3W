import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true , "username already used"],
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String
    },
    totalPoints : {
        type : Number,
        default : 0
    }
})

const User = mongoose.model("User" , UserSchema);

export {
    User
}
