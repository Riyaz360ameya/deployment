import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { clientsFiles } from "../../helpers/clientsFiles";
import { removeTokenCookie } from "../../helpers/removeTokenCookie"; // Assuming you have a function to remove token cookies
import ClientInformationModel from "../../models/ClientInformationModel";

export async function PUT(request = NextRequest) {
    try {
        const { proManagerId } = await getDataFromToken();

        if (!proManagerId) {
            console.log('.....NO PM Id present');
            return removeTokenCookie(); // Assuming you want to remove token cookie if proManagerId is not present
        }

        const { projectId } = await request.json();
        // const { userName, uniqueId, organizationName } = reqBody;
        const projectDetails = await ClientInformationModel.findById(projectId).populate(
            {
                path: 'userId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
            })
        const userName = projectDetails.userId.firstName
        const uniqueId = projectDetails.ProjectUniqId
        const organizationName = projectDetails.userId.organization

        console.log(projectDetails.projectInfo, '----------projectDetails')
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
