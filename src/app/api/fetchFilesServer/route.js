import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { getDataFromToken } from "../helpers/getDataFromToken";

export async function GET(request = NextRequest) {
    try {


        const folderPath = '//192.168.1.100/3DProjects/Tech-Dept/Ameya360/ameya360/Riyaz/AHAA0AA020240001/01-03-2024  10-49 am';

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
