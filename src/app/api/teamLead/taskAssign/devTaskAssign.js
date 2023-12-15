import { NextResponse } from "next/server";
import devTaskModel from "../../models/developerTask";
export const devTaskAssign = async ({ findDev, findLead, reqBody }) => {
    try {
        const { developer, importance, projectTitle, description, instruction, startDate, endDate, projectId, assignedBy } = reqBody
        const id = developer
        const developerId = findDev._id
        const existDev = await devTaskModel.findOne({ developerId })
        if (existDev) {
            existDev.newTasks.push({
                assignedBy: "Team Lead",
                assignedPersonName: `${findLead.firstName} ${findLead.lastName}`,
                importance,
                projectTitle,
                description,
                status: "New Task",
                instruction,
                startDate,
                endDate,
                projectId
            })
            const savedData = await existDev.save();
            const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
            findDev.notifications.push({
                message: `Team Lead ${findLead.firstName} Assigned a New Task`,
                projectId: latestNewTaskId,
            })
            const newNotify = await findDev.save();
            console.log(newNotify, "------newData---------o")
            return savedData
            // NextResponse.json(
            //     { message: "Task assigned successfully" },
            //     { success: true },
            //     { savedData },
            //     { status: 201 });
        }
        else {
            const assignedTask = new devTaskModel({
                developerId,
                newTasks: [{
                    assignedBy: "Team Lead",
                    assignedPersonName: `${findLead.firstName} ${findLead.lastName}`,
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
            const savedData = await assignedTask.save();
            const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
            findDev.notifications.push({
                message: `Team Lead ${findLead.firstName} Assigned a New Task`,
                projectId: latestNewTaskId,
            })
            const newNotify = await findDev.save()
            console.log(newNotify, '----new-----notifn')
            return savedData
            // NextResponse.json(
            //     { message: "Task assigned successfully" },
            //     { success: true },
            //     { savedData },
            //     { status: 201 }
            // )
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}