import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import verifierProjectModel from "../../models/Developer/verifierProjects";
import { upDateVerifierTask } from "./upDateVerifierTask";
import { upDateOnPM } from "./upDateOnPM";
import { sendEmail } from "../../helpers/mail";

export const PUT = async (request = NextRequest) => {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NO Dev Id present');
            return removeTokenCookie();
        }
        const verifierId = developerId
        const { projectId, email } = await request.json()
        console.log(projectId, '---------body',email)
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
        // Update data and move it to completedTasks
        const upDatedVerifier = await upDateVerifierTask({data, verifierTasks,projectId})

        const upDatedPM = await upDateOnPM({ projectId })

        const emailType = "FILES_VERIFIED"

        const emailSend = await sendEmail({ email, emailType })

        return NextResponse.json({ message: "Project verification Completed", success: true ,upDatedVerifier }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
    }
}