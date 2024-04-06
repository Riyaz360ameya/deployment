import { NextRequest, NextResponse } from "next/server";
import userModel from "../../models/User/userModel";
import fs from "fs/promises";
import path from "path";
import { authMiddleware } from "../../middleware/authMiddleware";;

export async function POST(req = NextRequest) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const userId = req.userId;
        const role = req.role
        if (role !== "user") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const data = await req.formData();
        console.log(data, '------------------------data')
        const currentYear = new Date().getFullYear()
        const projectName = data.get('projectName')
        const uniqueId = data.get('uniqueId')
        // const projectFolder = `${projectName} ${currentYear}`
        const projectFolder = uniqueId
        console.log(projectFolder, "---------------- projectFolder name");
        const serverFolderPath = 'Z://Ameya360';
        //..................................................................//
        const user = await userModel.findById(userId)
        const organizationName = user.organization
        const clientName = user.firstName
        //..................................................................//
        const currentDate = new Date();
        const currentDateAndTime = currentDate.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(/\/|,/g, function (match) {
            return match === '/' ? '-' : ' '; // Replace '/' with '-' and ',' with ' '
        }).replace(/:/g, '-');
        console.log(currentDateAndTime, '---------------------user currentDateAndTime')
        //..................................................................//
        for (const entry of data.entries()) {
            const [name, value] = entry;
            if (name !== "projectName" && name !== "uniqueId") {
                const uploadFolderPath = path.join(serverFolderPath, organizationName, clientName, projectFolder.toString(), currentDateAndTime,);
                await fs.mkdir(uploadFolderPath, { recursive: true });
                const uniqueFilename = name + '--' + value.name;
                const filePath = path.join(uploadFolderPath, uniqueFilename);
                const buffer = Buffer.from(await value.arrayBuffer());
                await fs.writeFile(filePath, buffer);
                console.log(`File saved at: ${filePath}`);
            }
        }
        return NextResponse.json({ success: true, message: "File Uploaded Successfully" });
    } catch (error) {
        console.log(error.message, '----------error while file Uploading');
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}