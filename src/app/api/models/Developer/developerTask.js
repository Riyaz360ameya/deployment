import mongoose from "mongoose";
import developerModel from "./developerLoginModel";
import leadLoginModel from "../TeamLead/leadLoginModel";
const moment = require('moment');

const Dev = mongoose.models.developerLogins || developerModel;
const Lead = mongoose.models.leadLogins || leadLoginModel;
const developerTaskSchema = new mongoose.Schema({
    developerId: {
        type: mongoose.Types.ObjectId,
        ref: Dev, // Update to match the actual model name
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
                ref: Lead, // Update to match the actual model name
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
                ref: 'projectInformation',
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
            assignedPersonId: {
                type: mongoose.Types.ObjectId,
                ref: Lead, // Update to match the actual model name
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
                ref: 'projectInformation',
                required: true,
            },
            devStartedDate: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
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
            assignedPersonId: {
                type: mongoose.Types.ObjectId,
                ref: Lead, // Update to match the actual model name
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
                ref: 'projectInformation',
                required: true,
            },
            devStartedDate: {
                type: String,
                required: true,
            },
            devCompletedDate: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
        }
    ]
});
// delete mongoose.connection.models['devTasks'];
const devTaskModel = mongoose.models.devTasks || mongoose.model("devTasks", developerTaskSchema);
export default devTaskModel;