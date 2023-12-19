import projectInfoModel from "../../models/User/projectInfoModel"

export const upDateUserData = async ( reqData ) => {
    const {
        userId,
        ventureName,
        projectPlace,
        email,
        ventureType,
        vision,
        projectUsp,
        contact,
        specification,
        amenities,
        pages,
        brochureLanguage,
        brochureBudget,
        leafLet,
        ventureDescription,
        estimatedDelivaryDate,
        siteAddress,
        previousVenture,
        officeAdress,
        location,
        projectOverview
    } = reqData
    const existUser = await projectInfoModel.findOne({ userId })
    console.log(existUser, '------------existUser existUser')
    if (existUser) {
        existUser.Details.push({
            ventureName,
            projectPlace,
            email,
            ventureType,
            vision,
            projectUsp,
            contact,
            specification,
            amenities,
            pages,
            brochureLanguage,
            brochureBudget,
            leafLet,
            ventureDescription,
            estimatedDelivaryDate,
            siteAddress,
            previousVenture,
            officeAdress,
            location,
            projectOverview,
            status: "New Task",
            date: new Date()
        })
        // Save the updated user details
        const savedData = await existUser.save();
        console.log(savedData, "------saved data---------o")
        return savedData
    } else {
        //save to database
        const newProject = new projectInfoModel({
            userId,
            Details:
                [
                    {
                        ventureName,
                        projectPlace,
                        email,
                        ventureType,
                        vision,
                        projectUsp,
                        contact,
                        specification,
                        amenities,
                        pages,
                        brochureLanguage,
                        brochureBudget,
                        leafLet,
                        ventureDescription,
                        estimatedDelivaryDate,
                        siteAddress,
                        previousVenture,
                        officeAdress,
                        location,
                        projectOverview,
                        status: "New Task",
                        date: new Date()
                    },
                ],
        });
        console.log(newProject, '------------newProject')
        const savedData = await newProject.save();
       
        return savedData;
    }
}