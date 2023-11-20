const { writeFile, mkdir } = require('fs/promises');
const { NextResponse } = require('next/server');
import { connect } from '@/app/dbConfig/dbConfig';
import fileModel from '@/app/models/fileModel';

// Connect to the database
connect();

async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    console.log(file);

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const directory = 'C:/tmp'; 
    await mkdir(directory, { recursive: true });

    const path = `${directory}/${file.name}`;
    await writeFile(path, buffer);

    // Save file details databas
    const fileRecord = new fileModel({
     cadFile: file.name, // Save the buffer in the database
    //   fileName: file.name, // Optionally, save the file name as well
      // Add other properties as needed
    });

    const cadUpload = await fileRecord.save();
    console.log(cadUpload);
    console.log(`File saved at ${path}`);
    
    return NextResponse.json({ success: true, message: 'File uploaded and saved.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ success: false, message: 'Error handling file upload.' });
  }
}

module.exports = {
  POST,
};
