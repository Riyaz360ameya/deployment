import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDataFromToken } from "../helpers/getDataFromToken";
import userModel from "../models/User/userModel";


export function generateUniqueCode(projectName) {
  const currentYear = new Date().getFullYear();
  // const projectSeriesNumber = 1;
  // return `${projectName}${currentYear}${projectSeriesNumber.toString().padStart(4, '0')}`; //Ameya360Prestigious2024001
  return `${projectName} ${currentYear}`; //Ameya360Prestigious2024
}

export async function POST(req = NextRequest) {
  try {
    const data = await req.formData();
    console.log(data, '-----------data')

    const files = data.getAll('file[]');
    console.log(files, '----------------------vfiles')
    const projectName = data.getAll('projectName[]');
    const projectIds = projectName.map((project) => generateUniqueCode(project));
    // const projectIds = projectName.map((projectName) => generateUniqueCode(projectName));


    console.log(projectIds, "format");
    console.log(projectName, '------------projectName file upload backend----------');
    // const serverFolderPath = 'Z://cad file';
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


    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const projectId = projectIds[i];

      // const uploadFolderPath = path.join(serverFolderPath, 'uploads', projectId.toString());
      const uploadFolderPath = path.join(serverFolderPath, organizationName, clientName, projectId.toString(), currentDateAndTime,);

      await fs.mkdir(uploadFolderPath, { recursive: true });
      const uniqueFilename = Date.now() + '--' + file.name;
      const filePath = path.join(uploadFolderPath, uniqueFilename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      console.log(`File saved at: ${filePath}`);
    }

    return NextResponse.json({ success: true, message: "file uplod success" });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
