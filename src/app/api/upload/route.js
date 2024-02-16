import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";


export function generateUniqueCode(projectName) {
  const currentYear = new Date().getFullYear();
  const projectSeriesNumber = 1;
  return `Ameya360${projectName}${currentYear}${projectSeriesNumber.toString().padStart(4, '0')}`; //Ameeya360Prestigious2024001
}

export async function POST(req = NextRequest) {
  try {
    const data = await req.formData();
    const files = data.getAll('file[]');
    const projectName = data.getAll('projectName[]');
    const projectIds = projectName.map((project) => generateUniqueCode(project));
    // const projectIds = projectName.map((projectName) => generateUniqueCode(projectName));


    console.log(projectIds, "format");
    console.log(projectName, '------------projectName file upload backend----------');
    const serverFolderPath = 'D://files';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const projectId = projectIds[i];

      const uploadFolderPath = path.join(serverFolderPath, 'uploads', projectId.toString());

      await fs.mkdir(uploadFolderPath, { recursive: true });

      const uniqueFilename = Date.now() + '--' + file.name;
      const filePath = path.join(uploadFolderPath, uniqueFilename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      console.log(`File saved at: ${filePath}`);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
