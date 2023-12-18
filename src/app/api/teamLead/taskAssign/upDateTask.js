import { NextResponse } from "next/server";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const upDateLeadTask = async ({ devName, devId, teamLeadId, projectId }) => {
    try {
        const findLeadTask = await LeadTaskModel.findOne({ teamLeadId });
        if (!findLeadTask) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.log(findLeadTask, '------55----findLeadTask')
        const data = findLeadTask.newTasks.find(task => task.projectId.toString() === projectId);
        if (!data) {
            console.log(error, '---error data=')
            return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
        }
        console.log(data, '-----------------data   data')
        // Update data and move it to onGoingTasks
        findLeadTask.onGoingTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonName: data.assignedPersonName,
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
        const f = await findLeadTask.save();
        console.log(f, '---------saved')
        // Remove the item from newTasks
        findLeadTask.newTasks = findLeadTask.newTasks.filter(task => task.projectId.toString() !== projectId);
        const leadTasks = await findLeadTask.save();
        console.log(leadTasks, '-------after changes');
        return leadTasks
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}