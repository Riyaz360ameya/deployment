import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { upDatePMProjects } from "./upDatePMData";
import { createNewProject } from "./createNewProject";
import { updateUserProjects } from "./updateUserProjects";
import { updateVerifier } from "./updateVerifier";
import authMiddleware from "../../middleware/authMiddleware";
connect();
export async function POST( req = NextRequest, res = NextResponse ) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const userId = req.userId;
        const role = req.role
        console.log(userId, '-----------userId', role)
        if (role !== "user") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const reqData = await req.json()
        console.log(reqData, '--------------reqData')
        const savedProject = await createNewProject({ reqData, userId })
        const projectId = savedProject._id
        const user = await updateUserProjects({ userId, projectId })
        const verifier = await updateVerifier({ userId, projectId })
        const pm = await upDatePMProjects({ userId, projectId })
        console.log(projectId, '--------55--------ProjectId')
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









