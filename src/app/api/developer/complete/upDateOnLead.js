import LeadTaskModel from "../../models/TeamLead/leadTaskModel";

export const upDateOnLead = async ({ projectId, teamLeadId }) => {
    try {
        console.log(projectId, '---99---data', teamLeadId);

        const updatedTask = await LeadTaskModel.findOneAndUpdate(
            {
                teamLeadId,
                'onGoingTasks.projectId': projectId
            },
            {
                $set: {
                    'onGoingTasks.$.status': 'Completed',
                    'onGoingTasks.$.devCompletedDate': Date.now(),
                }
            },
            { new: true } // Return the modified document
        );
        if (!updatedTask) {
            console.log('Task not found or not updated.');
            return null; // or handle this case accordingly
        }
        console.log(updatedTask, '-----Updated Task');
        return updatedTask;
    } catch (error) {
        console.error(error.message, '--------error message');
        // Handle the error
        throw error; // Rethrow the error to let the caller handle it
    }
};
