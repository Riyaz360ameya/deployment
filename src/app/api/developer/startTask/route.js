import { NextRequest, NextResponse } from "next/server"
import devTaskModel from "../../models/Developer/developerTask"
import { upDateTask } from "./upDateTask";
import { upDateOnLead } from "./upDateOnLead";

export const POST = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        const { projectId, developerId } = reqBody
        console.log(reqBody, '------22----reqBody')
        const findDevTask = await devTaskModel.findOne({ developerId })
        if (!findDevTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const data = findDevTask.newTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(data, '------data');
        // Update data and move it to onGoingTasks
        const upDatedDev = await upDateTask({ data, findDevTask, projectId })
        const teamLeadId = data.assignedLeadId
        const upDatedLead = await upDateOnLead({ projectId, teamLeadId })
        return NextResponse.json({ message: "Task Started", success: true }, { upDatedDev }, { status: 200 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
