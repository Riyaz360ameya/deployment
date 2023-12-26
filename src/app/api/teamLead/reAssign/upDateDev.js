import { NextResponse } from "next/server";


export const upDateDevTask = async ({  findDevTask, projectId }) => {
    try {
        const data = findDevTask.completedTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
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
            devCompletedDate: data.devCompletedDate
        });

        const upDateDev = await findDevTask.save();
        // Remove the item from completedTasks
        upDateDev.completedTasks = upDateDev.completedTasks.filter(task => task.projectId.toString() !== projectId.toString());
        const Tasks = await upDateDev.save();
        return Tasks
    } catch (error) {
        console.log(error.message, '------------------error.message');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}