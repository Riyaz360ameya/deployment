import pmProjectsModel from "../../models/ProjectManager/pmProjects"

export const pmProjectUpdate = async ({ projectId, latestNewTaskId, teamLeadId, proManagerId }) => {
    try {
        console.log(teamLeadId, '------------teamLeadId')
        const pmProjects = await pmProjectsModel.findOne({ proManagerId })
        const data = pmProjects.newProjects.find(task => task.projectId.toString() === projectId);
        if (!data) {
            console.log(error, '---error data=')
            return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
        }
        console.log(data, '---------------------data in pm pro update')
        // Update data and move it to onGoingProjects
        pmProjects.onGoingProjects.push({
            userId: data.userId,
            projectId: data.projectId,
            status: "Assigned",
            projectReachedOn: data.projectReachedOn,
            payment: "50% Payed",
            assignedLeadId: teamLeadId,
        })
        console.log(pmProjects.onGoingProjects, '-------------pushed data')
        const pmNewProject = await pmProjects.save();
        console.log(pmNewProject, '----------------------------pmNewProject')
        // Remove the item from newProjects
        pmNewProject.newProjects = pmNewProject.newProjects.filter(task => task.projectId.toString() !== projectId);
        const pmTasks = await pmNewProject.save();
        const newOngoing = pmNewProject.onGoingProjects.find(task => task.projectId.toString() === projectId);
        console.log(pmNewProject, '-------after changes');
        return newOngoing
    } catch (error) {
        console.log(error.message, '-----------------------pm Project Update')
    }
    // leadTasks
}