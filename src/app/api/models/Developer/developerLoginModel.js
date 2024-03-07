import mongoose from "mongoose";
const developerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    roles: [
        {
            type: String,
            required: true
        }
    ],
    notifications: [
        {
            projectId: {
                type: mongoose.Types.ObjectId,
                ref: 'leadTasks', // Update to match the actual model name
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
    forgotPassword: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
delete mongoose.connection.models['developerLogins'];
const developerModel = mongoose.models.developerLogins || mongoose.model("developerLogins", developerSchema);
export default developerModel