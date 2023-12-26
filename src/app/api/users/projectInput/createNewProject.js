import projectInfoModel from "../../models/projectInfoModel"

export const createNewProject = async (reqData) => {
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
        estimatedDeliveryDate,
        siteAddress,
        previousVenture,
        officeAddress,
        location,
        projectOverview
    } = reqData
    const newProject = new projectInfoModel({
        userId,
        projectInfo:
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
            estimatedDeliveryDate,
            siteAddress,
            previousVenture,
            officeAddress,
            location,
            projectOverview,
            status: "New Project",
        },
    });
    const savedData = await newProject.save();

    return savedData;
}