import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path'; 

export async function GET(request = NextRequest) {
    try {
        const folderPath = '//192.168.1.100/3DProjects/Tech-Dept/Ameya360/ameya360/Riyaz/Fredericka Mccoy 2024/29-02-2024  03-03 pm';

        const files = await fs.readdir(folderPath);
        console.log(files);

        const fileContents = await Promise.all(
            files.map(async file => {
                const filePath = path.join(folderPath, file);
                const contentBuffer = await fs.readFile(filePath);
                const contentBase64 = contentBuffer.toString('base64');
                return {
                    fileName: file,
                    content: contentBase64
                };
            })
        );
        return NextResponse.json({
            success: true,
            files: fileContents
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}
