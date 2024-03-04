import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { clientsFiles } from "../../helpers/clientsFiles";
import { removeTokenCookie } from "../../helpers/removeTokenCookie"; // Assuming you have a function to remove token cookies

export async function PUT(request = NextRequest) {
    try {
        const { proManagerId } = await getDataFromToken();

        if (!proManagerId) {
            console.log('.....NO PM Id present');
            return removeTokenCookie(); // Assuming you want to remove token cookie if proManagerId is not present
        }

        const reqBody = await request.json();
        const { userName, uniqueId, organizationName } = reqBody;

        // Call your helper function to get client files
        const clientsData = await clientsFiles(reqBody);

        // Use clientsData instead of fileContents since you are fetching it from clientsFiles function
        return NextResponse.json({
            success: true,
            files: clientsData,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}
