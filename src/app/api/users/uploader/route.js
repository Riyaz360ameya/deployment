import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import cadfile from "@/app/models/fileModel";

connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = request.body;
        console.log(reqData, 'cadfile');
        
        
        // const {
           
        //     cadFile,
           
        // } = reqData;

        // const newData = new cadfile({
           
        //     cadFile,
            
        // });

        // const savedData = await newData.save();
        // console.log(savedData, "savedData");

        // console.log("Project details added successfully:", savedData);

        // return NextResponse.json({
        //     message: "Project details added successfully",
        //     success: true,
        //     savedData
        // }, { status: 200 });
    } catch (error) {
        console.error("Error adding project details:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}







// // Import necessary modules and functions
// import { connect } from "@/app/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import cadfile from "@/app/models/fileModel";
// import multer from 'multer';

// const upload = multer();
// // Establish a connection to the database
// connect();

// // Define a POST request handler
// export async function POST(request = NextRequest) {
//     try {
//         console.log('Files received:', request.files);

//         // Extract JSON data from the request body
//         const reqData = await request.json();
//         console.log(reqData, '---------reqData');

//         // Destructure relevant fields from the request data
//         const {
          
//             cadFile,
           
//         } = reqData;

//         // Create a new instance of the Details model with the extracted data
//         const newData = new cadfile({
           
//             cadFile,
           
//         });

//         // Save the new document to the database
//         const savedData = await newData.save();
//         console.log(savedData, "savedData");

//         // Log information about the saved data
//         console.log("Project details added successfully:", savedData);

//         // Return a JSON response indicating success
//         return NextResponse.json({
//             message: "Project details added successfully",
//             success: true,
//             savedData
//         }, { status: 200 });
//     } catch (error) {
//         // Handle errors and return an error response
//         console.error("Error adding project details:", error);
    
//         // Log detailed error information
//         if (error instanceof Error) {
//             console.error("Detailed error information:", error.stack);
//         }
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }






// // Import necessary modules and functions
// import { connect } from "@/app/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import cadfile from "@/app/models/fileModel";
// import multer from 'multer';

// const upload = multer();
// // Establish a connection to the database
// connect();

// // Define a POST request handler
// export async function POST(request = NextRequest) {
//     try {
//         console.log('Files received:', request.files);

//         // Extract JSON data from the request body
//         const reqData = await request.json();
//         console.log(reqData, '---------reqData');

//         // Destructure relevant fields from the request data
//         const {
          
//             cadFile,
           
//         } = reqData;

//         // Create a new instance of the Details model with the extracted data
//         const newData = new cadfile({
           
//             cadFile,
           
//         });

//         // Save the new document to the database
//         const savedData = await newData.save();
//         console.log(savedData, "savedData");

//         // Log information about the saved data
//         console.log("Project details added successfully:", savedData);

//         // Return a JSON response indicating success
//         return NextResponse.json({
//             message: "Project details added successfully",
//             success: true,
//             savedData
//         }, { status: 200 });
//     } catch (error) {
//         // Handle errors and return an error response
//         console.error("Error adding project details:", error);
    
//         // Log detailed error information
//         if (error instanceof Error) {
//             console.error("Detailed error information:", error.stack);
//         }
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
