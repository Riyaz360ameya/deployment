import { NextRequest, NextResponse } from "next/server"
import pmProjectsModel from "../../models/ProjectManager/pmProjects"
import { upDatePmProject } from "./upDateProject"
import { upDateClientProject } from "./clientProject"
import LeadTaskModel from "../../models/TeamLead/leadTaskModel"
import { authMiddleware } from "../../middleware/authMiddleware";

export const PUT = async (req = NextRequest, res = NextResponse) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const proManagerId = req.userId;
        const role = req.role
        if (role !== "Project Manager") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
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
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
            .populate({
                path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.assignedLeadId onGoingProjects.projectId completedProjects.assignedLeadId completedProjects.userId completedProjects.projectId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
            })
        const allComProject = PmProjects.completedProjects
        return NextResponse.json({ message: "Project Completed", success: true, allComProject }, { status: 200 });
    } catch (error) {
        console.error(error.message, '--------error message');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}