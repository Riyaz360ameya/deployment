import mongoose from "mongoose";
import leadLoginModel from "../TeamLead/leadLoginModel";
import managerLoginModel from "./managerLoginModel";
import userModel from "../User/userModel";
import projectInfoModel from "../projectInfoModel";
import ClientInformationModel from "../ClientInformationModel";

const PM = mongoose.models.managerLogin || managerLoginModel;
// const Project = mongoose.models.projectInfo || projectInfoModel;
const Project = mongoose.models.ClientInformation || ClientInformationModel;

const Lead = mongoose.models.leadLogins || leadLoginModel;
const user = mongoose.models.users || userModel;

const proManagerProjectSchema = new mongoose.Schema({
    proManagerId: {
        type: mongoose.Types.ObjectId,
        ref: PM, // Update to match the actual model name
        required: true,
    },
    newProjects: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: user, // Use the registered 'users' model here
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: Project, // Update to match the actual model name
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            projectReachedOn: {
                type: Date,
                default: Date.now,
            },
            payment: {
                type: String,
                required: true,
            },
            projectVerified: {
                type: Boolean,
                default: false
            }
        }
    ],
    onGoingProjects: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: user, // Use the registered 'users' model here
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: Project, // Update to match the actual model name
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            projectReachedOn: {
                type: Date,
                required: true,
            },
            payment: {
                type: String,
                required: true,
            },
            assignedLeadId: {
                type: mongoose.Types.ObjectId,
                ref: Lead, 
                required: true,
            },
            projectVerified: {
                type: Boolean,
                
            }
        }
    ],
    completedProjects: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: user, // Use the registered 'users' model here
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: Project, // Update to match the actual model name
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            projectReachedOn: {
                type: Date,
                required: true,
            },
            payment: {
                type: String,
                required: true,
            },
            assignedLeadId: {
                type: mongoose.Types.ObjectId,
                ref: Lead, 
                required: true,
            },
            leadTaskAssignedDate: {
                type: Date,
                required: true,
            },
            leadTaskStartDate: {
                type: Date,
                required: true,
            },
            leadTaskCompletedDate: {
                type: Date,
                default: Date.now,
            },
            projectVerified: {
                type: Boolean,
            }
        }
    ]
});
delete mongoose.connection.models['pmProjects'];
const pmProjectsModel = mongoose.models.pmProjects || mongoose.model("pmProjects", proManagerProjectSchema);
export default pmProjectsModel;