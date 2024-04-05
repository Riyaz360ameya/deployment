import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { clientsFiles } from "../../helpers/clientsFiles";
import verifierProjectModel from "../../models/Developer/verifierProjects";
import { authMiddleware } from "../../middleware/authMiddleware";

export async function POST(request = NextRequest) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        console.log(userId, '-----------userId')
        if ( role !== "Exterior Developer" || role !== "Interior Developer" || role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const verifierId = developerId
        console.log(verifierId, '----55-----developerId')
        const devTasks = await verifierProjectModel.findOne({ verifierId })
        if (!devTasks) {
            console.log('.....NO Verifier present');
            return NextResponse.json({ error: "No Tasks" }, { status: 404 })
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
