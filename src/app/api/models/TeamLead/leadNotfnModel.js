import mongoose, { Schema } from "mongoose";
import ClientInformationModel from "../ClientInformationModel";


const leadData = mongoose.models.leadLogins || leadLoginModel;
const Project = mongoose.models.ClientInformation || ClientInformationModel;


const leadNotificationSchema = new mongoose.Schema({

    teamLeadId: {
        type: mongoose.Types.ObjectId,
        ref: leadData, // Update to match the actual model name
        required: true,
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
const leadNotificationModel = mongoose.models.leadNotif || mongoose.model("leadNotif", leadNotificationSchema)
export default leadNotificationModel