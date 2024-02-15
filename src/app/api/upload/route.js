import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req = NextRequest) {
  try {
    const data = await req.formData();
    const files = data.getAll('file[]');
    const projectIds = data.getAll('projectId[]');

    const serverFolderPath = 'Z://cad file';

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
