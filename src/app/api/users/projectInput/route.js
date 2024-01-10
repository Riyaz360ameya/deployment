import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { upDatePMProjects } from "./upDatePMData";
import { createNewProject } from "./createNewProject";
import { updateUserProjects } from "./updateUserProjects";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
connect();

export async function POST(request = NextRequest) {
    try {
        const { userId } = await getDataFromToken()
        console.log(userId, '--------------userId')
        if (!userId) {
            console.log('.....NO Lead Id present');
            return removeTokenCookie();
        }
        const reqData = await request.json();
        console.log(reqData, '--------------reqData')
        const savedProject = await createNewProject({ reqData, userId })
        const projectId = savedProject._id
        const saveUserProject = await updateUserProjects({ userId, projectId })
        const saveNotifyPM = await upDatePMProjects({ userId, projectId })
        return NextResponse.json({
            message: "Project details added successfully",
            success: true,
            savedProject,
        }, { status: 200 });

    } catch (error) {
        console.log("Error adding project details-----:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}













