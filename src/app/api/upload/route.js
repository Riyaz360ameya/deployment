
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req = NextRequest) {
    try {
        const data = await req.formData();
        console.log(data, '---------------data')
        const file = data.get('file')
        const serverFolderPath = 'Z:\cad file';
        const uploadFolderPath = path.join(serverFolderPath, 'uploads');
        console.log('00')
        await fs.mkdir(uploadFolderPath, { recursive: true });
        console.log('1')
        // Generate a unique filename (you may want to use a library for this)
        const uniqueFilename = Date.now() + '--' + file.name;
        console.log('2')

        // Specify the path where the file will be saved
        const filePath = path.join(uploadFolderPath, uniqueFilename);
        console.log(file, '............3')

        // Await the arrayBuffer promise to get the actual ArrayBuffer
        const buffer = Buffer.from(await file.arrayBuffer());
        // Save the file to the specified path
        await fs.writeFile(filePath, buffer);
        console.log('4')

        console.log(`File saved at: ${filePath}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error.message, '--------------multer----------------');
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}
