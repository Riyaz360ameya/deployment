import { NextRequest, NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { upDateLeadTask } from "./upDateTask";
import devTaskModel from "../../models/Developer/developerTask";
import { upDateOnClient } from "./upDateOnClient";

export const POST = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        console.log(reqBody, '--------55-----body')
        const teamLeadId = reqBody.Lead
        const projectId = reqBody.projectId
        const findLeadTask = await LeadTaskModel.findOne({ teamLeadId })
        if (!findLeadTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const data = findLeadTask.onGoingTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(data, '---55---data');
        // Update data and move it to Completed Tasks
        const developerId = data.assignedDeveloperId.toString()
        const devTask = await devTaskModel.findOne({ developerId })
        const devData = devTask.completedTasks.find(task => task.projectId.toString() === projectId.toString());
        data.devCompletedDate = devData.devCompletedDate
        // const upDatedLead = await upDateLeadTask({ data, findLeadTask, projectId })

        const clientData = await upDateOnClient({ projectId })
        // return NextResponse.json({ message: "Got It", success: true }, { upDatedDev }, { status: 200 });
    } catch (error) {
        console.error(error, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}