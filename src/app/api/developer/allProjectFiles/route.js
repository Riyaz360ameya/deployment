import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { clientsFiles } from "../../helpers/clientsFiles";
import verifierProjectModel from "../../models/Developer/verifierProjects";

export async function POST(request = NextRequest) {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NOT a Verifier');
            return removeTokenCookie();
        }
        const verifierId = developerId
        console.log(verifierId, '----55-----developerId')
        const devTasks = await verifierProjectModel.findOne({ verifierId })
        if (!devTasks) {
            console.log('.....NO Verifier present');
            return removeTokenCookie();
        }

        const reqBody = await request.json();
        console.log(reqBody, '-----0022---------reqBody')

        const clientsData = await clientsFiles(reqBody);

        return NextResponse.json({
            success: true,
            files: clientsData,
        });
    } catch (error) {
        console.error(error.message); // Log the error for debugging purposes
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}
