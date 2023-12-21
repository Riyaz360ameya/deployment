import mongoose from "mongoose";
const moment = require('moment');
import leadLoginModel from "./leadLoginModel";
import developerModel from "../Developer/developerLoginModel";
import projectInfoModel from "../projectInfoModel";
import managerLoginModel from "../ProjectManager/managerLoginModel";

const PmData = mongoose.models.managerLogin || managerLoginModel;
const leadData = mongoose.models.leadLogins || leadLoginModel;
const DevData = mongoose.models.developerLogins || developerModel;
const projectData = mongoose.models.projectInformation || projectInfoModel;

const teamLeadSchema = new mongoose.Schema({
    teamLeadId: {
        type: mongoose.Types.ObjectId,
        ref: leadData, // Update to match the actual model name
        required: true,
    },
    newTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedPersonId: {
                type: mongoose.Types.ObjectId,
                ref: PmData, // Update to match the actual model name
                required: true,
            },
            assignedPersonName: {
                type: String,
                required: true,
            },
            importance: {
                type: String,
                required: true,
            },
            projectTitle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            instruction: {
                type: String,
                required: true,
            },
            assignedDate: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
            endDate: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
                required: true,
            }
        }
    ],
    onGoingTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedPersonName: {
                type: String,
                required: true,
            },
            assignedPersonId: {
                type: mongoose.Types.ObjectId,
                ref: PmData, // Update to match the actual model name
                required: true,
            },
            importance: {
                type: String,
                required: true,
            },
            projectTitle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            instruction: {
                type: String,
                required: true,
            },
            assignedDate: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
                required: true,
            },
            devAssignedDate: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
            assignedDeveloperName: {
                type: String,
                required: true,
            },
            assignedDeveloperId: {
                type: mongoose.Types.ObjectId,
                ref: DevData,
                required: true,
            },

        }
    ],
    completedTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedPersonName: {
                type: String,
                required: true,
            },
            assignedPersonId: {
                type: mongoose.Types.ObjectId,
                ref: PmData, // Update to match the actual model name
                required: true,
            },
            importance: {
                type: String,
                required: true,
            },
            projectTitle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            instruction: {
                type: String,
                required: true,
            },
            assignedDate: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
                required: true,
            },
            completedDate: {
                type: String,
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: projectData,
                required: true,
            },
            devAssignedDate: {
                type: String,
                required: true,
            },
            assignedDeveloperName: {
                type: String,
                required: true,
            },
            assignedDeveloperId: {
                type: mongoose.Types.ObjectId,
                ref: DevData,
                required: true,
            },
            devCompletedDate: {
                type: String,
                required: true,
            },
        }
    ]
});
delete mongoose.connection.models['leadTasks'];
const LeadTaskModel = mongoose.models.leadTasks || mongoose.model("leadTasks", teamLeadSchema);
export default LeadTaskModel;