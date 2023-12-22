import pmProjectsModel from "../../models/ProjectManager/pmProjects";

export const upDatePmProjects = async ({ proManagerId, projectId }) => {
    try {
        console.log(projectId, '---99---data', proManagerId);

        const updatedTask = await pmProjectsModel.findOneAndUpdate(
            {
                proManagerId,
                'onGoingProjects.projectId': projectId
            },
            {
                $set: {
                    'onGoingProjects.$.status': 'Completed',
                }
            },
            // { new: true } // Return the modified document
        );
        if (!updatedTask) {
            console.log('Task not found or not updated.');
            return null; // or handle this case accordingly
        }
        console.log(updatedTask, '-----Updated Task');
        return updatedTask;
    } catch (error) {
        console.error(error.message, '--------error message');
        throw error; // Rethrow the error to let the caller handle it
    }
}