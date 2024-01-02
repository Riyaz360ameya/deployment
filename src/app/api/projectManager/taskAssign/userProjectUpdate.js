import userModel from "../../models/User/userModel"
import userProjectsModel from "../../models/User/userProjectModel"
import projectInfoModel from "../../models/projectInfoModel"

export const userProjectUpdate = async ({ projectId }) => {
    try {
        console.log(projectId, 'its user side')
        const userProject = await projectInfoModel.findById(projectId)
        const userId = userProject.userId
        const user = await userModel.findById(userId)
        const userDATA = await userProjectsModel.findOne({ userId })
        const data = userDATA.NewProjects.find(task => task.ProjectId.toString() === projectId);
        console.log(data, '------------.toString()')
        if (!data) {
            console.log(error.message, '---error data=')
            return NextResponse.json({ error: "Project is Not found" }, { status: 404 })
        }
        // Update data and move it to onGoingProjects
        userDATA.onGoingProjects.push({
            ProjectId: data.ProjectId,
            status: "Started",
            payment: "50% Payed",
        })
        console.log(user,'...........user')
        const userUpdate = await userDATA.save();
        console.log(userUpdate, '................updated user')
        // Remove the item from NewProjects
        userUpdate.NewProjects = userUpdate.NewProjects.filter(task => task.ProjectId.toString() !== projectId);
        const userPro = await userUpdate.save();
        user.notifications.push({
            message: `Your Project ${userProject.projectInfo.ventureName} is stated`,
            projectId: projectId,
        })
        const saveNotification = await user.save()
        return { success: true }
    } catch (error) {
        console.log(error.message, '.........error .project update in user side')
    }
}