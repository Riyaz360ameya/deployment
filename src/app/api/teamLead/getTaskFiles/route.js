import { NextRequest, NextResponse } from "next/server";
import ClientInformationModel from "../../models/ClientInformationModel";
import { clientsFiles } from "../../helpers/clientsFiles";
import { authMiddleware } from "../../middleware/authMiddleware";

export async function PUT(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const teamLeadId = req.userId;
        const role = req.role
        if (role !== "Exterior" || role !== "Interior") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const { projectId } = await req.json();
        console.log(projectId, '-------------projectId')

        const projectDetails = await ClientInformationModel.findById(projectId).populate(
            {
                path: 'userId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
            })
        const userName = projectDetails.userId.firstName
        const uniqueId = projectDetails.ProjectUniqId
        const organizationName = projectDetails.userId.organization

        console.log(projectDetails.projectInfo, '----------projectDetails')
        // const { userName, uniqueId, organizationName } = reqBody;
        const data = { userName, uniqueId, organizationName }

        // Call your helper function to get client files
        const clientsData = await clientsFiles(data);
        return NextResponse.json({
            success: true,
            files: clientsData,
            projectDetails
        }, { status: 200 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}