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
        ProjectUniqId: {
            type: String,
            required: true,
        },
        projectInfo: {
            projectDetails: {
                projectName: {
                    type: String,
                    required: true,
                },
                projectType: {
                    type: String,
                    required: true,
                },
                specification: {
                    type: String,
                    required: true,
                },
                projectUSP: {
                    type: String,
                    required: true,
                },
                projectDes: {
                    type: String,
                    required: true,
                },
            },
            contactDetails: {
                email: {
                    type: String,
                    required: true,
                },
                contact: {
                    type: Number,
                    required: true,
                },
                siteLocation: {
                    type: String,
                    required: true,
                },
                siteAddress: {
                    type: String,
                    required: true,
                },
                officeAddress: {
                    type: String,
                    required: true,
                },
                architecture: {

                    architectureName: {
                        type: String,
                        required: true,
                    },
                    architectureEmail: {
                        type: String,
                        required: true,
                    },
                    architectureMobNo: {
                        type: Number,
                        required: true,
                    }
                },
                landscape: {

                    landscapeName: {
                        type: String,
                        required: true,
                    },
                    landscapeEmail: {
                        type: String,
                        required: true,
                    },
                    landscapeMobNo: {
                        type: Number,
                        required: true,
                    }
                },
                coordinators: [
                    {
                        coordinatorName: {
                            type: String,
                            required: true,
                        },
                        coordinatorEmail: {
                            type: String,
                            required: true,
                        },
                        coordinatorMobile: {
                            type: Number,
                            required: true,
                        },
                    }
                ]
            },
        },
    },
    { timestamps: true }
);

delete mongoose.connection.models['ClientInformation'];
const ClientInformationModel = mongoose.models.ClientInformation || mongoose.model("ClientInformation", projectInfoSchema);
export default ClientInformationModel;













