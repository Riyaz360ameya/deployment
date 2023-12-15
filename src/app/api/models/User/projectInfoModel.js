import mongoose from "mongoose";
import userModel from "./userModel";

// Register the 'users' model with Mongoose
const User = mongoose.models.users || userModel;
const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: User, // Use the registered 'users' model here
            required: true,
        },
        Details: [
            {
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
                    type: String,
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
                    type: String,
                    required: true,
                },
                brochureLanguage: {
                    type: String,
                    required: true,
                },
                brochureBudget: {
                    type: String,
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
                estimatedDelivaryDate: {
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
                officeAdress: {
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
                createdAt: {
                    type: Date
                },
                status: {
                    type: String,
                    required: true,
                },
                date: Date,
            }
        ],
    }
);

delete mongoose.connection.models['projectInformation'];
const projectInfoModel = mongoose.models.projectInformation || mongoose.model("projectInformation", projectSchema);
export default projectInfoModel;













