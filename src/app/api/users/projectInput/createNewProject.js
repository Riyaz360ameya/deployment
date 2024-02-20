import ClientInformationModel from "../../models/ClientInformationModel";

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
        const newProject = new ClientInformationModel({
            userId,
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
