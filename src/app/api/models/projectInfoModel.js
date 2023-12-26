import mongoose from "mongoose";
import userModel from "./User/userModel";

// Register the 'users' model with Mongoose
const User = mongoose.models.users || userModel;

const projectInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: User, // Use the registered 'users' model here
            required: true,
        },
        projectInfo: {
            ventureName: {
                type: String,
                required: true,
            },
            projectPlace: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            ventureType: {
                type: String,
                required: true,
            },
            vision: {
                type: String,
                required: true,
            },
            projectUsp: {
                type: String,
                required: true,
            },
            contact: {
                type: Number,
                required: true,
            },
            specification: {
                type: String,
                required: true,
            },
            amenities: {
                type: String,
                required: true,
            },
            pages: {
                type: Number,
                required: true,
            },
            brochureLanguage: {
                type: String,
                required: true,
            },
            brochureBudget: {
                type: Number,
                required: true,
            },
            leafLet: {
                type: String,
                required: true,
            },
            ventureDescription: {
                type: String,
                required: true,
            },
            estimatedDeliveryDate: {
                type: String,
                required: true,
            },
            siteAddress: {
                type: String,
                required: true,
            },
            previousVenture: {
                type: String,
                required: true,
            },
            officeAddress: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            projectOverview: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
);

delete mongoose.connection.models['projectInfo'];
const projectInfoModel = mongoose.models.projectInfo || mongoose.model("projectInfo", projectInfoSchema);
export default projectInfoModel;













