import mongoose, { Schema } from "mongoose";
const otpVerifySchema = new mongoose.Schema({
    email: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
    otp: {
        type: String
    }
},
    {
        timestamps: true
    });
const otpVerifyModel = mongoose.models.otpVerifies || mongoose.model("otpVerifies", otpVerifySchema)
// const userModel = mongoose.models.users || mongoose.model("users", otpSchema)
export default otpVerifyModel