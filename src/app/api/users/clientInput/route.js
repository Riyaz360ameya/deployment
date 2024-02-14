// Import necessary modules
import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";

// Connect to the database
connect();

// Define the POST function
export async function POST(request = NextRequest) {
    try {
        // Get user data from token
        const { userId, role } = await getDataFromToken();

        // If userId is not present, remove token cookie and return
        if (!userId) {
            console.log('.....NO Lead Id present');
            return removeTokenCookie();
        }

        // Parse JSON from the request body
        const reqData = await request.json();
        console.log(reqData,'------------users data----------')
        // Uncomment the following section when you are ready to implement the actual functionality
        /*
        const savedProject = await createNewProject({ reqData, userId });
        const projectId = savedProject._id;
        const saveUserProject = await updateUserProjects({ userId, projectId });
        const saveNotifyPM = await upDatePMProjects({ userId, projectId });
        */

        // Return a JSON response
        return NextResponse.json({
            message: "Project details added successfully",
            success: true,
            // savedProject,
        }, { status: 200 });
    } catch (error) {
        // Handle errors and return an error response
        console.log("Error adding project details:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
