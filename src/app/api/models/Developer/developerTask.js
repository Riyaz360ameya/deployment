import mongoose from "mongoose";
import developerModel from "./developerLoginModel";
import leadLoginModel from "../TeamLead/leadLoginModel";
import projectInfoModel from "../projectInfoModel";
const moment = require('moment');

const Dev = mongoose.models.developerLogins || developerModel;
const Lead = mongoose.models.leadLogins || leadLoginModel;
const projectData = mongoose.models.projectInformation || projectInfoModel;

const developerTaskSchema = new mongoose.Schema({
    developerId: {
        type: mongoose.Types.ObjectId,
        ref: Dev,
        required: true,
    },
    newTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedLeadId: {
                type: mongoose.Types.ObjectId,
                ref: Lead,
                required: true,
            },
            assignedLeadName: {
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
                type: Date,
                default: Date.now,
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
            },
        }
    ],
    onGoingTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedLeadId: {
                type: mongoose.Types.ObjectId,
                ref: Lead,
                required: true,
            },
            assignedLeadName: {
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
                type: Date,
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
            devStartedDate: {
                type: Date,
                default: Date.now,
            },
            devCompletedDate: {
                type: String,
            },
        }
    ],
    completedTasks: [
        {
            assignedBy: {
                type: String,
                required: true,
            },
            assignedLeadId: {
                type: mongoose.Types.ObjectId,
                ref: Lead,
                required: true,
            },
            assignedLeadName: {
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
                type: Date,
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
            devStartedDate: {
                type: String,
                required: true,
            },
            devCompletedDate: {
                type: Date,
                default: Date.now,
            },
        }
    ]
});
delete mongoose.connection.models['devTasks'];
const devTaskModel = mongoose.models.devTasks || mongoose.model("devTasks", developerTaskSchema);
export default devTaskModel;