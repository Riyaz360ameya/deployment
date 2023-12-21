import mongoose from "mongoose";
import leadLoginModel from "../TeamLead/leadLoginModel";
import userModel from "../User/userModel";
import developerModel from "../Developer/developerLoginModel";
import managerLoginModel from "./managerLoginModel";
import projectInfoModel from "../projectInfoModel";
import LeadTaskModel from "../TeamLead/leadTaskModel";
const moment = require('moment');

const PM = mongoose.models.managerLogin || managerLoginModel;
const Lead = mongoose.models.leadLogins || leadLoginModel;
const LeadTask = mongoose.models.leadTasks || LeadTaskModel;
const User = mongoose.models.users || userModel;
const Project = mongoose.models.projectInfo || projectInfoModel;

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
                ref: User, // Use the registered 'users' model here
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
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
            payment: {
                type: String,
                required: true,
            }
        }
    ],
    onGoingProjects: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: User, // Use the registered 'users' model here
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
                type: String,
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
            assignedLeadTaskId: {
                type: mongoose.Types.ObjectId,
                ref: LeadTask, // Update to match the actual model name
                required: true,
            },
        }
    ],
    completedProjects: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: User, // Use the registered 'users' model here
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
                type: String,
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
            assignedLeadName: {
                type: String,
                required: true,
            },
            assignedLeadDesignation: {
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
            instruction: {
                type: String,
                required: true,
            },
            leadTaskAssignedDate: {
                type: String,
                required: true,
            },
            leadTaskStartDate: {
                type: String,
                required: true,
            },
            leadTaskEndDate: {
                type: String,
                required: true,
            },
            leadTaskCompletedDate: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
        }
    ]
});
delete mongoose.connection.models['pmProjects'];
const pmProjectsModel = mongoose.models.pmProjects || mongoose.model("pmProjects", proManagerProjectSchema);
export default pmProjectsModel;