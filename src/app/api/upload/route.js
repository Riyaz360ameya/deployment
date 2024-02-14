import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req = NextRequest) {
  try {
    const data = await req.formData();
    const files = data.getAll('file[]');
    console.log(files, "- received in backend ----------");

    const serverFolderPath = 'D://files';
    const uploadFolderPath = path.join(serverFolderPath, 'uploads');

    await fs.mkdir(uploadFolderPath, { recursive: true });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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


