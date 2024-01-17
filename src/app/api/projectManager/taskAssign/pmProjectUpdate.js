import pmProjectsModel from "../../models/ProjectManager/pmProjects"

export const pmProjectUpdate = async ({ projectId, latestNewTaskId, teamLeadId, proManagerId }) => {
    console.log(teamLeadId, '------------teamLeadId')
    const pmProjects = await pmProjectsModel.findOne({ proManagerId })
    const data = pmProjects.newProjects.find(task => task.projectId.toString() === projectId);
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
    })
    const pmNewProject = await pmProjects.save();
    // Remove the item from newProjects
    pmNewProject.newProjects = pmNewProject.newProjects.filter(task => task.projectId.toString() !== projectId);
    const pmTasks = await pmNewProject.save();
    const newOngoing = pmNewProject.onGoingProjects.find(task => task.projectId.toString() === projectId);
    console.log(pmNewProject, '-------after changes');
    return newOngoing
    // leadTasks
}