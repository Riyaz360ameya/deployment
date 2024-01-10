import mongoose from "mongoose";
import projectInfoModel from "../projectInfoModel";

const projectInfo = mongoose.models.leadLogins || projectInfoModel;
const managerLoginSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        // required: true
    },
    haveAccess: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectInfo, // Update to match the actual model name
                required: true,
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    forgotPassword: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
delete mongoose.connection.models['managerLogin'];
const managerLoginModel = mongoose.models.managerLogin || mongoose.model("managerLogin", managerLoginSchema)
export default managerLoginModel;