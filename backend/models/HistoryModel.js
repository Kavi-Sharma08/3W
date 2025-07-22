import mongoose from "mongoose";

const HistorySchema =  new mongoose.Schema({

    whoClaimthePoint : {
        type : mongoose.Types.ObjectId,
    },
    usernameOfWhoClaimPoints :{
        type : String

    },
    toWhomPointsisGiven : {
        type : mongoose.Types.ObjectId

    },
    usernameOfWhomPointsisGiven : {
        type : String
    }

})


const History = mongoose.model("History" , HistorySchema);
export {
    History
}