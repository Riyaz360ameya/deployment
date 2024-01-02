import userModel from "../../models/User/userModel";
import userProjectsModel from "../../models/User/userProjectModel";
import projectInfoModel from "../../models/projectInfoModel";

export const upDateClientProject = async ({ projectId, userId }) => {
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
        // Update on user
        const user = await userModel.findById(userId)
        const userDATA = await userProjectsModel.findOne({ userId })
        const data = userDATA.onGoingProjects.find(task => task.ProjectId.toString() === projectId.toString());
        console.log(data, '------------.toString()')
        if (!data) {
            console.log(error.message, '---error data=')
            return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
        }
        // Update data and move it to completedProjects
        userDATA.completedProjects.push({
            ProjectId: data.ProjectId,
            status: "Completed",
            payment: "Payment Completed",
        })
        console.log(user, '...........user')
        const userUpdate = await userDATA.save();
        console.log(userUpdate, '................updated user')
        // Remove the item from onGoingProjects
        userUpdate.onGoingProjects = userUpdate.onGoingProjects.filter(task => task.ProjectId.toString() !== projectId.toString());
        const userPro = await userUpdate.save();
        user.notifications.push({
            message: `Your Project ${userProject.projectInfo.ventureName} is Completed`,
            projectId: projectId,
        })
        const saveNotification = await user.save()
        console.log(updatedTask, '--- 0000000 --Updated Task');
        return updatedTask;

    } catch (error) {
        console.error(error.message, '--------error message');
        throw error; // Rethrow the error to let the caller handle it
    }
}