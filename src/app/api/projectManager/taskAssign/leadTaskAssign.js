import { NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const leadTaskAssign = async ({ findLead, teamLeadId, findPM, projectId, reqBody }) => {
    try {
        const { importance, projectTitle, description, instruction, startDate, endDate, projectId } = reqBody
        const existLeadTask = await LeadTaskModel.findOne({ teamLeadId })
        let savedTask
        if (existLeadTask) {
            existLeadTask.newTasks.push({
                assignedBy: "Project Manager",
                assignedPersonName: `${findPM.firstName} ${findPM.lastName}`,
                assignedPersonId: findPM._id,
                importance,
                projectTitle,
                description,
                status: "New Task",
                instruction,
                endDate,
                projectId,
                startDate
            })
            savedTask = await existLeadTask.save();
        } else {
            const assignedTask = new LeadTaskModel({
                teamLeadId,
                newTasks: [{
                    assignedBy: "Project Manager",
                    assignedPersonName: `${findPM.firstName} ${findPM.lastName}`,
                    assignedPersonId: findPM._id,
                    importance,
                    projectTitle,
                    description,
                    status: "New Task",
                    instruction,
                    endDate,
                    projectId,
                    startDate
                }],
            });
            savedTask = await assignedTask.save();
        }
        const latestNewTaskId = savedTask.newTasks[savedTask.newTasks.length - 1]._id;
        findLead.notifications.push({
            message: `Project Manager ${findPM.firstName} Assigned a New Task`,
            projectId: latestNewTaskId,
        })
        const saveNotification = await findLead.save()
        return savedTask
    } catch (error) {
        console.log(error.message, '----------error ')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}