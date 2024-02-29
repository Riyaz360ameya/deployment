import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDataFromToken } from "../helpers/getDataFromToken";
import userModel from "../models/User/userModel";


export async function POST(req = NextRequest) {
  try {
    const data = await req.formData();
    console.log(data, '------------------------data')
    // for (const entry of data.entries()) {
    //   const [name, value] = entry;
    //   console.log(name, '------------name', value.name, '-------------value');
    // }
    const currentYear = new Date().getFullYear()
    const projectName = data.get('projectName')
    const uniqueId = data.get('uniqueId')
    // const projectFolder = `${projectName} ${currentYear}`
    const projectFolder = uniqueId
    console.log(projectFolder, "---------------- projectFolder name");
    const serverFolderPath = 'Z://Ameya360';

    //..................................................................//

    const { userId, role } = await getDataFromToken();
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
