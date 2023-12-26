import { NextRequest, NextResponse } from "next/server"
import devTaskModel from "../../models/Developer/developerTask"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"
import { upDateDevTask } from "./upDateDev"

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const teamLeadId = reqBody.Lead
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
        return NextResponse.json({ message: "Task Re-Assigned", success: true }, { updatedTask }, { status: 202 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
