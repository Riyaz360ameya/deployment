import { NextResponse } from "next/server";

export const upDateLeadTask = async ({ data, findLeadTask, projectId }) => {
    try {
        // Move newTasks to onGoingTasks
        findLeadTask.completedTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonName: data.assignedPersonName,
            assignedPersonId: data.assignedPersonId,
            importance: data.importance,
            projectTitle: data.projectTitle,
            description: data.description,
            status: "Completed",
            instruction: data.instruction,
            assignedDate: data.assignedDate,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId: data.projectId,
            assignedDeveloperName: data.assignedDeveloperName,
            assignedDeveloperId: data.assignedDeveloperId,
            devAssignedDate: data.devAssignedDate,
            devCompletedDate: data.devCompletedDate,
        });
        const saved = await findLeadTask.save();
        // Remove the item from onGoingTasks
        saved.onGoingTasks = saved.onGoingTasks.filter(task => task.projectId.toString() !== projectId.toString());
        // // Save the changes
        const updatedLeadTask = await saved.save();
        return updatedLeadTask;
    } catch (error) {
        console.log(error.message, '...........error');
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
