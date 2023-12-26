import { NextResponse } from "next/server";


export const upDateTask = async ({ data, findDevTask, projectId }) => {
    try {
        // Move newTasks to onGoingTasks
        findDevTask.onGoingTasks.push({
            assignedBy: data.assignedBy,
            assignedLeadId: data.assignedLeadId,
            assignedLeadName: data.assignedLeadName,
            importance: data.importance,
            projectTitle: data.projectTitle,
            description: data.description,
            status: "OnGoing",
            instruction: data.instruction,
            assignedDate: data.assignedDate,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId: data.projectId,
            assignedDeveloperName: data.devName,
        });

        console.log(findDevTask.onGoingTasks, '-----------onGoingTasks')
        const f = await findDevTask.save();
        console.log(f,'----------------assignedLeadName ')
        // // Remove the item from newTasks
        findDevTask.newTasks = findDevTask.newTasks.filter(task => task.projectId.toString() !== projectId.toString());
        const Tasks = await findDevTask.save();
        return Tasks
    } catch (error) {
        console.error(error.message,'-------error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}