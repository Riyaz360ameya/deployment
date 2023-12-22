import { NextResponse } from "next/server";


export const upDateTask = async ({ data, findDevTask, projectId }) => {
    try {
        console.log('.......................Noow Here.')
        // Move newTasks to onGoingTasks
        findDevTask.completedTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonId: data.assignedPersonId,
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
            devStartedDate:data.devStartedDate,
        });

        const f = await findDevTask.save();
        console.log(f.completedTasks, '-----------completedTasks  88 ')
        // Remove the item from newTasks
        findDevTask.onGoingTasks = findDevTask.onGoingTasks.filter(task => task.projectId.toString() !== projectId.toString());
        const Tasks = await findDevTask.save();
        return Tasks
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}