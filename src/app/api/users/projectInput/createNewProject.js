import mongoose from "mongoose";
import ClientInformationModel from "../../models/ClientInformationModel";
import userProjectsModel from "../../models/User/userProjectModel";

export const createNewProject = async ({ reqData, userId }) => {
    try {
        const incomingData = reqData
        let maxIndex = 0;
        Object.keys(incomingData).forEach((key) => {
            const match = key.match(/^coordinatorMobile_(\d+)$/);
            if (match) {
                const index = parseInt(match[1], 10);
                if (index > maxIndex) {
                    maxIndex = index;
                }
            }
        });
        const MAX_COORDINATORS = maxIndex + 1;
        const coordinators = [];
        for (let i = 0; i < MAX_COORDINATORS; i++) {
            const coordinatorName = incomingData[`coordinatorName_${i}`];
            if (coordinatorName) {
                coordinators.push({
                    coordinatorName: coordinatorName,
                    coordinatorEmail: incomingData[`coordinatorEmail_${i}`],
                    coordinatorMobile: incomingData[`coordinatorMobile_${i}`],
                });
            }
        }
        const ProjectUniqId = await generateUniqueCode(incomingData.projectName, userId);
        console.log(ProjectUniqId, '--------------ProjectUniqId')
        const newProject = new ClientInformationModel({
            userId,
            ProjectUniqId,
            projectInfo: {
                projectDetails: {
                    projectName: incomingData.projectName,
                    projectType: incomingData.projectType,
                    specification: incomingData.specification,
                    projectUSP: incomingData.projectUSP,
                    projectDes: incomingData.projectDes,
                    projectHighlights: incomingData.projectHighlights,
                },
                contactDetails: {
                    name: incomingData.clientName,
                    email: incomingData.clientEmail,
                    contact: incomingData.clientMobileNO,
                    siteLocation: incomingData.clientSiteLocation,
                    siteAddress: incomingData.clientSiteAddress,
                    officeAddress: incomingData.clientOfficeAddress,
                    architecture: {
                        architectureName: incomingData.architectureName,
                        architectureEmail: incomingData.architectureEmail,
                        architectureMobNo: incomingData.architectureMobNo,
                    },
                    landscape: {
                        landscapeName: incomingData.landscapeName,
                        landscapeEmail: incomingData.landscapeEmail,
                        landscapeMobNo: incomingData.landscapeMobNo,
                    },
                    coordinators: coordinators,
                },
                status: "New Project",
            },
        });
        console.log(newProject, '-------21----------newProject')
        const savedData = await newProject.save();
        return savedData;
    } catch (error) {
        console.error(error.message, "............Error adding project details:");
        throw new Error("Failed to create a new project. Please try again.");
    }
};

async function getTotalProjects(userId) {
    try {
        const result = await userProjectsModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } }, {
                $project: {
                    totalProjects: {
                        $sum: [
                            { $size: "$NewProjects" },
                            { $size: "$onGoingProjects" },
                            { $size: "$completedProjects" }
                        ]
                    }
                }
            }
        ]);
        console.log(result, '---------------result')
        if (result && result.length > 0) {
            return result[0].totalProjects;
        } else {
            return 0; // User not found or has no projects
        }
    } catch (error) {
        console.error("Error calculating total projects:", error.message);
        throw error;
    }
}
export async function generateUniqueCode(projectName, userId) {
    const currentYear = new Date().getFullYear();

    const userTotalProjects = await getTotalProjects(userId);
    const projectSeriesNumber = userTotalProjects + 1;
    return `Ameya360${projectName}${currentYear}${projectSeriesNumber.toString().padStart(4, '0')}`; //Ameya360Prestigious2024001
}
