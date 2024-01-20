import { NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const upDateLeadTask = async ({ devName, devId, teamLeadId, projectId }) => {
    try {
        const findLeadTask = await LeadTaskModel.findOne({ teamLeadId });
        if (!findLeadTask) {
            console.log(error.message, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.log(findLeadTask, '------55----findLeadTask')
        const data = findLeadTask.newTasks.find(task => task.projectId.toString() === projectId);
        if (!data) {
            console.log(error.message, '---error data=')
            return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
        }
        // Update data and move it to onGoingTasks
        findLeadTask.onGoingTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonName: data.assignedPersonName,
            assignedPersonId:data.assignedPersonId,
            importance: data.importance,
            projectTitle: data.projectTitle,
            description: data.description,
            status: "Assigned",
            instruction: data.instruction,
            assignedDate: data.assignedDate,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId,
            assignedDeveloperName: devName,
            assignedDeveloperId: devId,
        })
        const upDatedLeadTask = await findLeadTask.save();
        // Remove the item from newTasks
        upDatedLeadTask.newTasks = upDatedLeadTask.newTasks.filter(task => task.projectId.toString() !== projectId);
        const leadTasks = await upDatedLeadTask.save();
        const latestOnGoingTask = upDatedLeadTask.onGoingTasks[upDatedLeadTask.onGoingTasks.length - 1];
        console.log(latestOnGoingTask, '-------latest added onGoing project');
        return latestOnGoingTask;
    } catch (error) {
        console.error(error.message,'--------------error.message');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}