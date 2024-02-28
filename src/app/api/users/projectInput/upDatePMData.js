import { NextResponse } from "next/server"
import managerLoginModel from "../../models/ProjectManager/managerLoginModel"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"
import userModel from "../../models/User/userModel"

export const upDatePMProjects = async ({ userId, projectId }) => {

    try {
        const designation = "Project Manager"
        const findPm = await managerLoginModel.findOne({ designation })
        if (!findPm) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        console.log(findPm._id, '------------PM iD')
        const proManagerId = findPm._id
        let savedProject
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
        if (PmProjects) {
            console.log(PmProjects, '---------------existPm')
            PmProjects.newProjects.push({
                userId,
                projectId,
                status: "New Project",
                payment: "Payment is not Done",
            })
            savedProject = await PmProjects.save();
        } else {
            const newProject = new pmProjectsModel({
                proManagerId,
                newProjects:
                    [
                        {
                            userId,
                            projectId,
                            status: "New Project",
                            payment: "Payment is not Done",
                        },
                    ],
            });
            savedProject = await newProject.save();
        }
        const findUser = await userModel.findById(userId);
        console.log(findUser, '...........user Details')
        findPm.notifications.push({
            message: `New Project received from ${findUser.firstName}`,
            projectId,
        })
        const savePm = await findPm.save()
        return savedProject
    } catch (error) {
        console.log(error.message,'-----------error in pm update')
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}