

import { NextResponse } from "next/server";
export const upDateVerifierTask = async ({ data, verifierTasks, projectId }) => {
    try {
        // Move newTasks to onGoingTasks
        verifierTasks.completedTasks.push({
            userId: data.userId,
            projectId: data.projectId,
            assignedDate: data.assignedDate,
        });
        const d = await verifierTasks.save();
        // Remove the item from newTasks
        console.log(projectId, '-------------projectId')
        verifierTasks.newTasks = verifierTasks.newTasks.filter(task => task.projectId.toString() !== projectId);
        console.log(verifierTasks, '------------------verifierTasks')
        const Tasks = await verifierTasks.save();
        return Tasks
    } catch (error) {
        console.error(error.message, '-------error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}