import mongoose, { Schema } from "mongoose";
import ClientInformationModel from "../ClientInformationModel";

const Project = mongoose.models.ClientInformation || ClientInformationModel;

const userNotificationSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: Project,
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
const userNotificationModel = mongoose.models.userNotif || mongoose.model("userNotif", userNotificationSchema)
export default userNotificationModel