import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const upDateOnLead = async ({ projectId, teamLeadId, findLead, findDev,data }) => {
    try {
        console.log(projectId, '---99---data', teamLeadId);

        const updatedTask = await LeadTaskModel.findOneAndUpdate(
            {
                teamLeadId,
                'onGoingTasks.projectId': projectId
            },
            {
                $set: {
                    'onGoingTasks.$.status': 'Started'
                }
            },
            { new: true } // Return the modified document
        );
        // console.log(updatedTask, '-----Updated Task');
        findLead.notifications.push({
            message: `Developer ${findDev.firstName} Started ${data.projectTitle}`,
            projectId: data.projectId,
        })
        return updatedTask
    } catch (error) {
        console.error(error.message, '--------error');
        // Handle the error
    }
};
