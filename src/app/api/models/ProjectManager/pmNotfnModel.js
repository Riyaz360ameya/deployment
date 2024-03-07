import mongoose, { Schema } from "mongoose";
import managerLoginModel from "./managerLoginModel";
import ClientInformationModel from "../ClientInformationModel";


const PM = mongoose.models.managerLogin || managerLoginModel;
const Project = mongoose.models.ClientInformation || ClientInformationModel;


const pmNotificationSchema = new mongoose.Schema({

    proManagerId: {
        type: mongoose.Types.ObjectId,
        ref: PM, // Update to match the actual model name
        required: true,
    },
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: Project, // Update to match the actual model name
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
},
    {
        timestamps: true
    });
const pmNotificationModel = mongoose.models.pmNotif || mongoose.model("pmNotif", pmNotificationSchema)
export default pmNotificationModel