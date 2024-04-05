import { NextRequest, NextResponse } from "next/server"
import devTaskModel from "../../models/Developer/developerTask"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"
import { upDateDevTask } from "./upDateDev"
import { authMiddleware } from "../../middleware/authMiddleware";

export async function POST(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const teamLeadId = req.userId;
        const role = req.role
        if (role !== "Exterior" || role !== "Interior") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const reqBody = await req.json()
        console.log(teamLeadId, '--------22-----teamLeadId ')
        const projectId = reqBody.projectId
        const updatedTask = await LeadTaskModel.findOneAndUpdate(
            {
                teamLeadId,
                'onGoingTasks.projectId': projectId
            },
            {
                $set: {
                    'onGoingTasks.$.status': 'Re-Assigned'
                }
            },
            { new: true } // Return the modified document
        );
        const Task = updatedTask.onGoingTasks.find(task => task.projectId.toString() === projectId);
        const devId = Task.assignedDeveloperId
        const developerId = devId.toString()
        const findDevTask = await devTaskModel.findOne({ developerId })
        if (!findDevTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const upDatedDev = await upDateDevTask({ findDevTask, projectId })
        return NextResponse.json({ message: "Task Re-Assigned", success: true, updatedTask }, { status: 202 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
