import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export const clientsFiles = async (data) => {
    try {
        const { userName, uniqueId, organizationName } = data;
        console.log(`${userName} -- ${uniqueId} == ${organizationName} - Data received in client files route`);

        const serverFolderPath = `//192.168.1.100/3DProjects/Tech-Dept/Ameya360/${organizationName}/${userName}/${uniqueId}/`;
        console.log(serverFolderPath, '--------serverFolderPath')

        const files = await fs.readdir(serverFolderPath);
        // console.log(files, '--------------------files');
        // Create an array to store file data
        const fileData = [];
        // Iterate through each file in the directory
        for (const file of files) {
            // console.log(file, '--------0000---------file')
            // fileData.push({ folderName: file, });
            // Construct the full path to the file
            const filePath = path.join(serverFolderPath, file);
            // console.log(filePath, '-------------------filePath');

            // Read the content of the file
            const eachFile = await fs.readdir(filePath);
            // console.log(eachFile, '--------------------eachFile');

            const fileContents = await Promise.all(
                eachFile.map(async innerFile => {
                    const filePathData = path.join(filePath, innerFile);
                    const contentBuffer = await fs.readFile(filePathData);
                    const contentBase64 = contentBuffer.toString('base64');
                    // console.log(innerFile, '----------------file'); // Log innerFile instead of file
                    return {
                        fileName: innerFile,  // Use innerFile instead of file
                        content: contentBase64
                    };
                })
            );
            // Push the fileContents to fileData
            fileData.push({ folderName: file, data: fileContents });
            // fileData.push(...fileContents);
        }
        console.log('---------------------------are All files');
        return fileData
    } catch (error) {
        return error.message
    }
};

