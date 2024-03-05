import mongoose, { Schema } from "mongoose";
import developerModel from "./developerLoginModel";
import projectInfoModel from "../projectInfoModel";


const Dev = mongoose.models.developerLogins || developerModel;
const projectData = mongoose.models.projectInformation || projectInfoModel;

const devNotificationSchema = new mongoose.Schema({

    developerId: {
        type: mongoose.Types.ObjectId,
        ref: Dev,
        required: true,
    },
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
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
const devNotificationModel = mongoose.models.devNotif || mongoose.model("devNotif", devNotificationSchema)
export default devNotificationModel