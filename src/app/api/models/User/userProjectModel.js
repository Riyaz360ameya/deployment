
import mongoose from "mongoose";
import userModel from "./userModel";
import projectInfoModel from "../projectInfoModel";

// Register the 'users' model with Mongoose
const User = mongoose.models.users || userModel;
const Project = mongoose.models.projectInfo || projectInfoModel;
const userProjectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: User, // Use the registered 'users' model here
            required: true,
        },
        NewProjects: [
            {
                ProjectId: {
                    type: mongoose.Types.ObjectId,
                    ref: Project,
                    required: true,
                }
            }
        ],
        onGoingProjects: [
            {
                ProjectId: {
                    type: mongoose.Types.ObjectId,
                    ref: Project,
                    required: true,
                },
                status: {
                    type: String,
                    required: true
                },
                payment: {
                    type: String,
                    required: true
                },
                startedDate: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        completedProjects: [
            {
                ProjectId: {
                    type: mongoose.Types.ObjectId,
                    ref: Project,
                    required: true,
                },
                status: {
                    type: String,
                    required: true
                },
                payment: {
                    type: String,
                    required: true
                },
                startedDate: {
                    type: Date,
                    required: true,
                },
                completedDate: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
    }
);

delete mongoose.connection.models['userProjects'];
const userProjectsModel = mongoose.models.userProjects || mongoose.model("userProjects", userProjectSchema);
export default userProjectsModel;