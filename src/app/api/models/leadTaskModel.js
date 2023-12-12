import mongoose from "mongoose";
const moment = require('moment');
const teamLeadSchema = new mongoose.Schema({
    teamLeadId: {
        type: mongoose.Types.ObjectId,
        ref: 'leadLogins', // Update to match the actual model name
        required: true,
    },
    newTasks: [
        {
            assignedBy: {
                type: String,
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
                ref: 'projectInformation',
                required: true,
            }
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
            completedDate: {
                type: String,
                required: true,
            },
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: 'projectInformation',
                required: true,
            }
        }
    ]
});
delete mongoose.connection.models['leadTasks'];
const LeadTaskModel = mongoose.models.leadTasks || mongoose.model("leadTasks", teamLeadSchema);
export default LeadTaskModel;