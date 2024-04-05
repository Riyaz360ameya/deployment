import { NextRequest, NextResponse } from "next/server"
import verifierProjectModel from "../../models/Developer/verifierProjects";
import { upDateVerifierTask } from "./upDateVerifierTask";
import { upDateOnPM } from "./upDateOnPM";
import { sendEmail } from "../../helpers/mail";
import ClientInformationModel from "../../models/ClientInformationModel";
import userModel from "../../models/User/userModel";
import authMiddleware from "../../middleware/authMiddleware";
export const PUT = async (req = NextRequest, res = NextResponse) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        if ( role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const verifierId = developerId
        // const ggg = await req.json()
        // console.log(ggg, '----------------formData')
        const { projectId, emailType, formData } = await req.json()
        console.log(projectId, '---------body')

        const projectData = await ClientInformationModel.findById(projectId)

        const userDetails = await userModel.findById(projectData.userId)
        const email = userDetails.email

        const verifierTasks = await verifierProjectModel.findOne({ verifierId })
        if (!verifierTasks) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.log(verifierTasks, '------------verifierTasks')
        const data = verifierTasks.newTasks.find(task => task.projectId.toString() === projectId.toString());

        console.log(data, '-----------task')
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        const upDatedVerifier = await upDateVerifierTask({ data, verifierTasks, projectId })
        const upDatedPM = await upDateOnPM({ projectId })

        if (emailType === "FILES_VERIFIED") {
            const emailSend = await sendEmail({ email, emailType })
        } else {
            console.log('-----------;;;-------jhjhjhj')
            const emailSend = await sendEmail({ email, emailType, formData })
        }
        return NextResponse.json({ message: "Project verification Completed", success: true, upDatedVerifier }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
    }
}