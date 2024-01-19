import mongoose from "mongoose";
const leadCredentialSchema = new mongoose.Schema({
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
    haveAccess: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
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
                type: String, // Change the type to String
                required: true,
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
delete mongoose.connection.models['leadLogins'];
const leadLoginModel = mongoose.models.leadLogins || mongoose.model("leadLogins", leadCredentialSchema)
export default leadLoginModel;