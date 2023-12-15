import mongoose from "mongoose";
const moment = require('moment');
const developerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: 'leadTasks', // Update to match the actual model name
                required: true,
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
        }
    ],
    forgotPassword: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
const developerModel = mongoose.models.developerLogins || mongoose.model("developerLogins",developerSchema);
export default developerModel