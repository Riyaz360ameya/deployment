import managerLoginModel from "../../models/ProjectManager/managerLoginModel"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"

export const upDatePMData = async (savedData) => {
    const userId = savedData.userId
    const latestNewTaskId = savedData.Details[savedData.Details.length - 1]._id;
    console.log(latestNewTaskId, '.........latestNewTaskId 8787')
    const designation = "Project Manager"
    const findPm = await managerLoginModel.findOne({ designation })
    console.log(findPm._id, '------------PM iD')
    const proManagerId = findPm._id

    // const existUser = await pmProjectsModel.findOne({ userId })
    const existPm = await pmProjectsModel.findOne({ proManagerId })
    if (existPm) {
        console.log(existPm, '---------------existPm')
        existPm.newProjects.push({
            userId,
            projectId: latestNewTaskId,
            status: "New Project",
            payment: "Payment is not Completed",
        })
        const savedProject = await existPm.save();
        return savedProject
    } else {
        const newProject = new pmProjectsModel({
            proManagerId,
            newProjects:
                [
                    {
                        userId,
                        projectId: latestNewTaskId,
                        status: "New Project",
                        payment: "Payment is not Completed",
                    },
                ],
        });
        const savedProject = await newProject.save();
        return savedProject
    }



    findPm.notifications.push({
        message: `Team Lead ${findUser.firstName} Assigned a New Project`,
        projectId: latestNewTaskId,
    })

}