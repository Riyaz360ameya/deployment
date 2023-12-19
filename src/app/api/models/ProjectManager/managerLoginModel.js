import mongoose from "mongoose";
const projectInfo = mongoose.models.leadLogins || leadLoginModel;
const leadData = mongoose.models.leadLogins || leadLoginModel;
const managerLoginSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
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
        // required: true
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
                ref: 'projectInformation', // Update to match the actual model name
                required: true,
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: String,
                default: () => moment().format('DD/MM/YY hh:mm A'),
            },
        }
    ],
    forgotPassword: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
delete mongoose.connection.models['managerLogin'];
const managerLoginModel = mongoose.models.managerLogin || mongoose.model("managerLogin", managerLoginSchema)
export default managerLoginModel;