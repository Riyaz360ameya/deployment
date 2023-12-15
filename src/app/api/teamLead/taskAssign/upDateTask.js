import LeadTaskModel from "../../models/leadTaskModel";
export const upDateLeadTask = async ({ devName, teamLeadId,projectId }) => {
    try {
        const findLeadTask = await LeadTaskModel.findOne({ teamLeadId });
        if (!findLeadTask) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.log(findLeadTask, '----------findLeadTask')
        const data = findLeadTask.newTasks.find(task => task._id.toString() === projectId);
        if (!data) {
            console.log(error, '---error data=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        // Update data and move it to onGoingTasks
        findLeadTask.onGoingTasks.push({
            assignedBy: data.assignedBy,
            assignedPersonName: data.assignedPersonName,
            importance: data.importance,
            projectTitle: data.projectTitle,
            description: data.description,
            status: "OnGoing",
            instruction: data.instruction,
            assignedDate: data.assignedDate,
            startDate: data.startDate,
            endDate: data.endDate,
            projectId,
            assignedDeveloperName: devName,
        })
        const f = await findLeadTask.save();
        // Remove the item from newTasks
        findLeadTask.newTasks = findLeadTask.newTasks.filter(task => task._id.toString() !== projectId);
        const leadTasks = await findLeadTask.save();
        console.log(leadTasks, '-------after changes');
        return
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}