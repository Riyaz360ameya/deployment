import { NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const leadTaskAssign = async ({ teamLeadId, reqBody, findLead, findPM }) => {
    try {
        console.log(teamLeadId, '-------------------------asdf 55')

        const { importance, projectTitle, description, instruction, startDate, endDate, projectId, phase } = reqBody
        console.log(phase, '------------------phase')
        const existLeadTask = await LeadTaskModel.findOne({ teamLeadId })
        console.log(existLeadTask, '-------------------existLeadTask')
        let savedTask
        if (existLeadTask) {
            const taskDetails = {
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
            };
            // Dynamically set workType based on phase
            if (phase === "White Render" || phase === "Texture And Lightning" || phase === "8K Render") {
                taskDetails.workType = { [phase]: true };
            }
            existLeadTask.newTasks.push(taskDetails);
            console.log(existLeadTask, '------------------existLeadTask')

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
            if (phase === "White Render" || phase === "Texture And Lightning" || phase === "8K Render") {
                console.log(phase, '...........its here')
                assignedTask.newTasks.forEach(task => {
                    task.workType = { [phase]: true };
                    console.log(task.workType, '-------------- task.workType')
                });
            }
            console.log(assignedTask,'------------------assignedTask')
            savedTask = await assignedTask.save();
        }
        const latestNewTaskId = savedTask.newTasks[savedTask.newTasks.length - 1]._id;
        findLead.notifications.push({
            message: `Project Manager ${findPM.firstName} Assigned a New Task`,
            projectId: latestNewTaskId,
        })
        const saveNotification = await findLead.save()
        console.log(savedTask.newTasks, '-------------------------newTasks')
        return savedTask
    } catch (error) {
        console.log(error.message, '------lead task assign ----error ')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}