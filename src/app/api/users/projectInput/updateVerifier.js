import { NextResponse } from "next/server"
import managerLoginModel from "../../models/ProjectManager/managerLoginModel"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"
import userModel from "../../models/User/userModel"
import developerModel from "../../models/Developer/developerLoginModel"
import verifierProjectModel from "../../models/Developer/verifierProjects"

export const updateVerifier = async ({ userId, projectId }) => {
    try {
        const designation = "File Verifier"
        const findVerifier = await developerModel.findOne({ designation })
        if (!findVerifier) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        const verifierId = findVerifier._id
        let savedData
        const existVerifier = await verifierProjectModel.findOne({ verifierId })
        if (existVerifier) {
            existVerifier.newTasks.push({
                userId,
                projectId,   // Match the field name
            });
            savedData = await existVerifier.save();
            console.log(savedData,'..................... new verifier first')
            return savedData;
        } else {
            const newProject = new verifierProjectModel({
                verifierId,
                newTasks: [
                    {
                        userId,
                        projectId,
                    },
                ],
            });
            console.log(newProject, '------------newProject in verifier')
            savedData = await newProject.save();
            return savedData;
        }
    } catch (error) {
        console.error(error);
        // Handle the error appropriately (log, respond, etc.)
        throw error;
    }
}