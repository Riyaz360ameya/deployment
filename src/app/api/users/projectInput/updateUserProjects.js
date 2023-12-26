import userProjectsModel from "../../models/User/userProjectModel"

export const updateUserProjects = async ({ userId, projectId }) => {
    try {
        const existUser = await userProjectsModel.findOne({ userId })
        if (existUser) {
            existUser.NewProjects.push({
                ProjectId: projectId  // Match the field name
            });
            const savedData = await existUser.save();
            return savedData;
        } else {
            const newProject = new userProjectsModel({
                userId,
                NewProjects: [
                    {
                        ProjectId: projectId  // Match the field name
                    }
                ],
            });
            console.log(newProject, '------------newProject')
            const savedData = await newProject.save();
            return savedData;
        }
    } catch (error) {
        console.error(error);
        // Handle the error appropriately (log, respond, etc.)
        throw error;
    }
}