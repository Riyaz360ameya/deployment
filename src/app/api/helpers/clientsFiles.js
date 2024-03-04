import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export const clientsFiles = async (data) => {
    try {
        const { userName, uniqueId, organizationName } = data;
        console.log(`${userName} -- ${uniqueId} == ${organizationName} - Data received in client files route`);

        const serverFolderPath = `//192.168.1.100/3DProjects/Tech-Dept/Ameya360/${organizationName}/${userName}/${uniqueId}/`;

        const files = await fs.readdir(serverFolderPath); // get the folder inside the each projects files
        console.log(files, '--------------------files')

        // Create an array to store file data
        const fileData = [];

        // Iterate through each file in the directory
        for (const file of files) {
            // Construct the full path to the file
            const filePath = path.join(serverFolderPath, file); // full folder path
            console.log(filePath, '-------------------filePath')
            // Read the content of the file
            const eachFile = await fs.readdir(filePath);
            console.log(eachFile, '--------------------eachFile')
            const fileContents = await Promise.all(
                eachFile.map(async file => {
                    const filePathData = path.join(filePath, file);
                    const contentBuffer = await fs.readFile(filePathData);
                    const contentBase64 = contentBuffer.toString('base64');
                    console.log(file,'----------------file')
                    console.log(contentBase64,'----------------file')
                    return {
                        fileName: file,
                        content: contentBase64
                    };
                })
            );
            // Push the file data to the array
            fileData.push({
                fileName: file,
                content: contentBase64,
            });
        }
        console.log(fileData, '---------------------------fileData  fileData')

        // Send the file data to the frontend
        return NextResponse.json({
            files: fileData,
        });

        // const getAllFiles = async (folderPath) => {
        //     try {
        //         const files = await fs.readdir(folderPath);

        //         const fileContents = await Promise.all(
        //             files.map(async file => {
        //                 const filePath = path.join(folderPath, file);
        //                 try {
        //                     const fileStats = await fs.stat(filePath);
        //                     if (fileStats.isDirectory()) {
        //                         console.log(`[Directory] ${filePath}`);
        //                         return getAllFiles(filePath);
        //                     }
        //                     const contentBuffer = await fs.readFile(filePath);
        //                     const contentBase64 = contentBuffer.toString('base64');
        //                     console.log(`[File] ${filePath}`);
        //                     return {
        //                         fileName: file,
        //                         content: contentBase64
        //                     };
        //                 } catch (error) {
        //                     console.error(`Error reading file ${filePath}: ${error.message}`);
        //                     return null;
        //                 }
        //             })
        //         );

        //         const filteredFileContents = fileContents.flat().filter(file => file !== null);
        //         return filteredFileContents;
        //     } catch (error) {
        //         console.error(`Error reading directory ${folderPath}: ${error.message}`);
        //         return [];
        //     }
        // };

        // const allFiles = await getAllFiles(serverFolderPath);
        // console.log(allFiles.fileName,"----------------files in backend------------")
        // return NextResponse.json({
        //     success: true,
        //     totalFiles: allFiles.length,
        //     files: allFiles
        // });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
};
