import projectInfoModel from "../../models/projectInfoModel";

export const upDateClientProject = async ({ projectId, userId }) => {
    try {
        try {
            console.log(projectId, '---99---data', userId);
            const updatedTask = await projectInfoModel.findOneAndUpdate(
                {
                    userId,
                    _id: projectId
                },
                {
                    $set: {
                        'projectInfo.status': 'Completed',
                    }
                },
                { new: true } // Return the modified document
            );

            if (!updatedTask) {
                console.log('Task not found or not updated.');
                return null; // or handle this case accordingly
            }
            console.log(updatedTask, '--- 0000000 --Updated Task');
            return updatedTask;
        } catch (error) {
            console.error(error.message, '--------error message');
            throw error; // Rethrow the error to let the caller handle it
        }
    } catch (error) {
        console.log(error.message, '----------------message')
    }
}