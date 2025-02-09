import { NextResponse } from "next/server";
import devTaskModel from "../../models/Developer/developerTask";
export const devTaskAssign = async ({ findDev, findLead, reqBody }) => {
    try {
        const { importance, projectTitle, description, instruction, startDate, endDate, projectId, selectedFiles } = reqBody
        const developerId = findDev._id
        const existDev = await devTaskModel.findOne({ developerId })
        let savedData
        if (existDev) {
            existDev.newTasks.push({
                assignedBy: "Team Lead",
                assignedLeadId: findLead._id,
                assignedLeadName: `${findLead.firstName} ${findLead.lastName}`,
                importance,
                projectTitle,
                description,
                status: "New Task",
                instruction,
                startDate,
                endDate,
                projectId,
                selectedFiles
            })
            console.log(existDev, '----------------existDev')
            savedData = await existDev.save();
        }
        else {
            const assignedTask = new devTaskModel({
                developerId,
                newTasks: [{
                    assignedBy: "Team Lead",
                    assignedLeadId: findLead._id,
                    assignedLeadName: `${findLead.firstName} ${findLead.lastName}`,
                    importance,
                    projectTitle,
                    description,
                    status: "New Task",
                    instruction,
                    startDate,
                    endDate,
                    projectId,
                    selectedFiles
                }],
            });
            console.log(assignedTask.newTasks, '--------assignedTask')
            savedData = await assignedTask.save();
        }
        const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
        findDev.notifications.push({
            message: `Team Lead ${findLead.firstName} Assigned a New Task`,
            projectId: latestNewTaskId,
        })
        const newNotify = await findDev.save();
        return savedData
    } catch (error) {
        console.error(error.message, '--------------error.message');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}