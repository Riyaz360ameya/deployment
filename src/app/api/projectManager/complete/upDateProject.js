export const upDatePmProject = async ({ data, findPmProjects, projectId }) => {
    try {
        console.log('.......................Noow Here.')
        // Move newTasks to onGoingProjects
        findPmProjects.completedProjects.push({
            userId: data.userId,
            projectId: data.projectId,
            status: data.status,
            projectReachedOn: data.projectReachedOn,
            payment: data.payment,
            assignedLeadId: data.assignedLeadId,
            leadTaskAssignedDate: data.leadTaskAssignedDate,
            leadTaskStartDate: data.leadTaskStartDate,
        });
        const newPm = await findPmProjects.save();
        if (!newPm) {
            console.log(error.message, '--------error message');
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.log(newPm, '-----------completedProjects  88 ')
        // Remove the item from newTasks
        newPm.onGoingProjects = newPm.onGoingProjects.filter(task => task.projectId.toString() !== projectId.toString());
        const Projects = await newPm.save();
        return Projects.completedProjects
    } catch (error) {
        console.log(error.message, '----------error')
    }
}