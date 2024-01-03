import { NextRequest, NextResponse } from "next/server"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"
import { upDatePmProject } from "./upDateProject"
import { upDateClientProject } from "./clientProject"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"
import { getDataFromToken } from "../../helpers/getDataFromToken"

export const PUT = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        console.log(reqBody, '-----------reqBody')
        const { projectId } = reqBody
        const { proManagerId } = await getDataFromToken()
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
        const teamLeadId = data.assignedLeadId
        const leadTask = await LeadTaskModel.findOne({ teamLeadId })
        const leadTaskDetails = leadTask.completedTasks.find(task => task.projectId.toString() === projectId.toString());
        data.leadTaskAssignedDate = leadTaskDetails.assignedDate
        data.leadTaskStartDate = leadTaskDetails.devAssignedDate
        const upDatedPmPro = await upDatePmProject({ data, findPmProjects, projectId })
        const userId = data.userId.toString()
        const upDatedLead = await upDateClientProject({ projectId, userId })

        return NextResponse.json({ message: "Project Completed", success: true }, { upDatedPmPro }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
        return NextResponse.json({ error:error.message }, { status: 500 });
    }
}