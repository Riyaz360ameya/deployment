import { NextRequest, NextResponse } from "next/server"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"
import { upDatePmProject } from "./upDateProject"
import { upDateClientProject } from "./clientProject"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"

export const POST = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        console.log(reqBody, '-----------reqBody')
        const { projectId, proManagerId } = reqBody
        const findPmProjects = await pmProjectsModel.findOne({ proManagerId })
        if (!findPmProjects) {
            console.log(error.message, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const data = findPmProjects.onGoingProjects.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log(error.message, 'Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(data, '------------data')
        const teamLeadId = data.assignedLeadId
        const leadTask = await LeadTaskModel.findOne({ teamLeadId })
        const leadTaskDetails = leadTask.completedTasks.find(task => task.projectId.toString() === projectId.toString());
        // console.log(leadTask, '-----------leadTask')
        // console.log(leadTaskDetails, '-----------leadTaskDetails')

        data.leadTaskAssignedDate = leadTaskDetails.assignedDate
        data.leadTaskStartDate = leadTaskDetails.devAssignedDate

        // data.leadTaskCompletedDate = leadTaskDetails.completedDate
        // Update data and move it to completedProjects

        const upDatedPmPro = await upDatePmProject({ data, findPmProjects, projectId })
        const userId = data.userId.toString()
        const upDatedLead = await upDateClientProject({ projectId, userId })

        return NextResponse.json({ message: "Project Completed", success: true }, { upDatedPmPro }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
        return NextResponse.json({ error:error.message }, { status: 500 });
    }
}