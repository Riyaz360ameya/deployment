import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(request = NextRequest) {
    try {
        const cadFileBuffer = await request.arrayBuffer();

        const uploadFolderPath = path.join(process.cwd(), 'public', 'uploads');

        // check upload folder exists is here
        if (!fs.existsSync(uploadFolderPath)) {
            fs.mkdirSync(uploadFolderPath, { recursive: true });
        }

        // Generate a unique filename based on timestamp
        const timestamp = new Date().getTime();
        const fileName = `cadfile_${timestamp}.dwg`;

        const filePath = path.join(uploadFolderPath, fileName);

        // Write the binary data to the file
        fs.writeFileSync(filePath, Buffer.from(cadFileBuffer));

        return NextResponse.json({
            success: true,
            message: 'CAD file saved successfully.',
            filePath: `/uploads/${fileName}` 
        });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({
            success: false,
            error: 'An error occurred during file saving.'
        });
    }
}
