import { NextResponse } from "next/server";


export const upDateDevTask = async ({ data, findDevTask, projectId }) => {
    try {
        // Move newTasks to onGoingTasks
        findDevTask.onGoingTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonId: data.assignedPersonId,
            assignedPersonName: data.assignedPersonName,
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
            devCompletedDate:data.devCompletedDate
        });

        const f = await findDevTask.save();
        console.log(f.onGoingTasks, '-----------onGoingTasks')
        // Remove the item from completedTasks
        findDevTask.completedTasks = findDevTask.completedTasks.filter(task => task.projectId.toString() !== projectId.toString());
        const Tasks = await findDevTask.save();
        return Tasks
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}