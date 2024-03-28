import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { clientsFiles } from "../../helpers/clientsFiles";
import ClientInformationModel from "../../models/ClientInformationModel";

export const POST = async (request = NextRequest) => {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NO Dev Id present');
            return removeTokenCookie();
        }
        const reqBody = await request.json()
        const { projectId } = reqBody
        console.log(projectId, '------------projectId')
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
