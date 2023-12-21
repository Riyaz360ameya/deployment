import pmProjectsModel from "../../models/ProjectManager/pmProjects"

export const pmProjectUpdate = async ({ projectId, latestNewTaskId, teamLeadId, proManagerId }) => {
    console.log(teamLeadId, '------------teamLeadId')
    const pmProjects = await pmProjectsModel.findOne({ proManagerId })
    // console.log(pmProjects, '------------pmProjects.newProjects')
    const data = pmProjects.newProjects.find(task => task.projectId.toString() === projectId);
    console.log(data, '-----------data')
    if (!data) {
        console.log(error, '---error data=')
        return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
    }
    // Update data and move it to onGoingProjects
    pmProjects.onGoingProjects.push({
        userId: data.userId,
        projectId: data.projectId,
        status: "Assigned",
        projectReachedOn: data.projectReachedOn,
        payment: "50% Payed",
        assignedLeadId: teamLeadId,
        assignedLeadTaskId: latestNewTaskId,
    })
    const f = await pmProjects.save();
    // Remove the item from newProjects
    pmProjects.newProjects = pmProjects.newProjects.filter(task => task.projectId.toString() !== projectId);
    const pmTasks = await pmProjects.save();
    console.log(pmProjects, '-------after changes');
    return pmTasks
    // leadTasks
}