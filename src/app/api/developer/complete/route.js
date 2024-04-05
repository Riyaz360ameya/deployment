import { NextRequest, NextResponse } from "next/server"
import { upDateTask } from "./upDateTask"
import { upDateOnLead } from "./upDateOnLead"
import devTaskModel from "../../models/Developer/developerTask"
import authMiddleware from "../../middleware/authMiddleware"

export const POST = async (req = NextRequest, res = NextResponse) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        console.log(userId, '-----------userId')
        if ( role !== "Exterior Developer" || role !== "Interior Developer" || role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const reqBody = await req.json()
        const { projectId } = reqBody
        const findDevTask = await devTaskModel.findOne({ developerId })
        if (!findDevTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const data = findDevTask.onGoingTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        // Update data and move it to onGoingTasks
        const upDatedDev = await upDateTask({ data, findDevTask, projectId })
        const teamLeadId = data.assignedLeadId.toString()
        const upDatedLead = await upDateOnLead({ projectId, teamLeadId })
        return NextResponse.json({ message: "Task Completed", success: true, upDatedDev }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
    }
}