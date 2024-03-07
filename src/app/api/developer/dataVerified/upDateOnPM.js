import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
import pmProjectsModel from "../../models/ProjectManager/pmProjects";

export const upDateOnPM = async ({ projectId }) => {
    try {
        const designation = "Project Manager"
        const pm = await managerLoginModel.findOne({ designation })
        console.log(pm, '---------------pm')
        const proManagerId = pm._id
        if (!pm) {
            return NextResponse.json({ error: "Account doesn't exist" }, { status: 400 })
        }
        const updatedTask = await pmProjectsModel.findOneAndUpdate(
            {
                proManagerId,
                'newProjects.projectId': projectId
            },
            {
                $set: {
                    'newProjects.$.projectVerified': true,
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
        throw error; // Rethrow the error to let the caller handle it
    }
}