import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import ClientInformationModel from "../../models/ClientInformationModel";
import { clientsFiles } from "../../helpers/clientsFiles";

export async function PUT(request = NextRequest) {
    try {
        const { teamLeadId } = await getDataFromToken()
        if (!teamLeadId) {
            console.log('.....NO Lead Id present');
            return removeTokenCookie();
        }
        const { projectId } = await request.json();
        console.log(projectId, '-------------projectId')

        const projectDetails = await ClientInformationModel.findById(projectId).populate({ path: 'userId' })
        const userName = projectDetails.userId.firstName
        const uniqueId = projectDetails.ProjectUniqId
        const organizationName = projectDetails.userId.organization

        console.log(projectDetails, '----------projectDetails')
        // const { userName, uniqueId, organizationName } = reqBody;
        const data = { userName, uniqueId, organizationName }

        // Call your helper function to get client files
        const clientsData = await clientsFiles(data);
        return NextResponse.json({
            success: true,
            files: clientsData,
        }, { status: 200 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}