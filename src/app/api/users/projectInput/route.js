import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import {  upDatePMProjects } from "./upDatePMData";
import { createNewProject } from "./createNewProject";
import { updateUserProjects } from "./updateUserProjects";
connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = await request.json();
        const savedProject = await createNewProject(reqData)
        const userId = savedProject.userId
        const projectId = savedProject._id
        const saveUserProject = await updateUserProjects({ userId, projectId })
        const saveNotifyPM = await upDatePMProjects({ userId, projectId })
        return NextResponse.json({
            message: "Project details added successfully",
            success: true,
            savedProject,
        }, { status: 200 });

    } catch (error) {
        console.error("Error adding project details-----:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}













