import { NextRequest, NextResponse } from "next/server"
import devTaskModel from "../../models/Developer/developerTask"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"
import { upDateDevTask } from "./upDateDev"

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody, '-------------body')
        const teamLeadId = reqBody.Lead
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
        console.log(devId.toString(), '----------------developerId')
        const developerId = devId.toString()
        const findDevTask = await devTaskModel.findOne({ developerId })
        if (!findDevTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const data = findDevTask.completedTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(data, '------data---')
        const upDatedDev = await upDateDevTask({ data, findDevTask, projectId })

        return NextResponse.json({ message: "Got It", success: true }, { updatedTask }, { status: 202 });
    } catch (error) {
        console.error(error, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
