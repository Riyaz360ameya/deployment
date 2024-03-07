import mongoose from "mongoose";
import developerModel from "./developerLoginModel";
import userModel from "../User/userModel";
import ClientInformationModel from "../ClientInformationModel";

const Dev = mongoose.models.developerLogins || developerModel;
const projectData = mongoose.models.ClientInformation || ClientInformationModel;
const user = mongoose.models.users || userModel;

const verifierTaskSchema = new mongoose.Schema({
    verifierId: {
        type: mongoose.Types.ObjectId,
        ref: Dev,
        required: true,
    },
    newTasks: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: user, // Use the registered 'users' model here
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
                required: true,
            },
            assignedDate: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    completedTasks: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: user, // Use the registered 'users' model here
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
                required: true,
            },
            assignedDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                default: Date.now,
            }
        }
    ]
});
delete mongoose.connection.models['verifierProjects'];
const verifierProjectModel = mongoose.models.verifierProjects || mongoose.model("verifierProjects", verifierTaskSchema);
export default verifierProjectModel;