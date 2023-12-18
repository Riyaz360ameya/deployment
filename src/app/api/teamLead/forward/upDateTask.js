import { NextResponse } from "next/server";


export const upDateLeadTask = async ({ data, findLeadTask, projectId }) => {
    try {
        // Move newTasks to onGoingTasks
        findLeadTask.completedTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonName: data.assignedPersonName,
            importance: data.importance,
            projectTitle: data.projectTitle,
            description: data.description,
            status: "Completed",
            instruction: data.instruction,
            assignedDate: data.assignedDate,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId: data.projectId,
            assignedDeveloperName: data.devName,
            assignedDeveloperId: data.assignedDeveloperId,
            devCompletedDate:data.devCompletedDate,
        });

        const f = await findLeadTask.save();
        console.log(f.onGoingTasks, '-----------onGoingTasks')
        // Remove the item from completedTasks
        findLeadTask.onGoingTasks = findLeadTask.onGoingTasks.filter(task => task.projectId.toString() !== projectId.toString());
        const Tasks = await findLeadTask.save();
        return Tasks
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}