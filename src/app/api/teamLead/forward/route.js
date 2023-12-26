import { NextRequest, NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { upDateLeadTask } from "./upDateTask";
import devTaskModel from "../../models/Developer/developerTask";
import { upDatePmProjects } from "./upDatePmProjects";

export const POST = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        const teamLeadId = reqBody.Lead
        const projectId = reqBody.projectId
        const findLeadTask = await LeadTaskModel.findOne({ teamLeadId })
        if (!findLeadTask) {
            console.log(error.message, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const data = findLeadTask.onGoingTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        // Update data and move it to Completed Tasks
        const upDatedLead = await upDateLeadTask({ data, findLeadTask, projectId })
        const proManagerId = data.assignedPersonId
        const upDatePm = await upDatePmProjects({ data, proManagerId, projectId })
        return NextResponse.json({ message: "Update Sent To Project Manager", success: true }, { upDatedLead }, { status: 200 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}