import ClientInformationModel from "../../models/ClientInformationModel";

export const createNewProject = async ({ reqData, userId }) => {
    try {
        const {
            projectName,
            projectDes,
            projectHighlights,
            projectType,
            projectUSP,
            specification,

            clientName,
            clientEmail,
            clientMobileNO,
            clientOfficeAddress,
            clientSiteAddress,
            clientSiteLocation,

            architectureName,
            architectureMobNo,
            architectureEmail,

            landscapeName,
            landscapeEmail,
            landscapeMobNo,

           
            coordinatorName_0,
            coordinatorEmail_0,
            coordinatorMobile_0,

            coordinatorName,
            coordinatorMobile,
            coordinatorEmail,
        } = reqData;
       
        const newProject = new ClientInformationModel({
            userId,
            projectInfo: {
                projectDetails: {
                    projectName,
                    projectDes,
                    projectHighlights,
                    projectType,
                    projectUSP,
                    specification,
                },
                contactDetails: {
                    name:clientName,
                    email: clientEmail,
                    contact: clientMobileNO,
                    siteLocation: clientSiteLocation,
                    siteAddress: clientSiteAddress,
                    officeAddress: clientOfficeAddress,
                    architecture: {
                        architectureName: architectureName,
                        architectureEmail:architectureEmail,
                        architectureMobNo: architectureMobNo,
                    },
                    landscape: {
                        landscapeName:landscapeName,
                        landscapeEmail:landscapeEmail,
                        landscapeMobNo:landscapeMobNo,
                    },
                  
                    coordinators: {
                        coordinatorName: coordinatorName,
                        coordinatorMobile:coordinatorMobile,
                        coordinatorEmail:coordinatorEmail,
                        coordinatorName_0:coordinatorName_0,
                        coordinatorEmail_0: coordinatorEmail_0,
                        coordinatorMobile_0:coordinatorMobile_0,
                      
                    },
                },
                status: "New Project",
            },
        });

        const savedData = await newProject.save();
        return savedData;
    } catch (error) {
        console.error("Error adding project details:", error.message);
        throw new Error("Failed to create a new project. Please try again.");
    }
};
