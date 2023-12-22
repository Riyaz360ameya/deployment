import { NextResponse } from "next/server";
import devTaskModel from "../../models/Developer/developerTask";
export const devTaskAssign = async ({ findDev, findLead, reqBody }) => {
    try {
        const { importance, projectTitle, description, instruction, startDate, endDate, projectId } = reqBody
        const developerId = findDev._id
        const existDev = await devTaskModel.findOne({ developerId })
        console.log(findLead._id, '-----------------findLead._id')
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
                projectId
            })
            savedData = await existDev.save();
            console.log(savedData, '------------------savedData savedData ')
            const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
            findDev.notifications.push({
                message: `Team Lead ${findLead.firstName} Assigned a New Task`,
                projectId: latestNewTaskId,
            })
            const newNotify = await findDev.save();
            console.log(newNotify, "------newData---------o")
            return savedData
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
                    projectId
                }],
            });
            console.log(assignedTask.newTasks, '----------------task')
            savedData = await assignedTask.save();
            const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
            findDev.notifications.push({
                message: `Team Lead ${findLead.firstName} Assigned a New Task`,
                projectId: latestNewTaskId,
            })
            const newNotify = await findDev.save()
            console.log(newNotify, '----new-----notifn')
            return savedData
        }
    } catch (error) {
        console.error(error.message, '--------------error.message');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}