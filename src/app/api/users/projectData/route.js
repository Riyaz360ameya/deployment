import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import userProjectsModel from "../../models/User/userProjectModel";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { authMiddleware } from "../../middleware/authMiddleware";
connect();



export async function GET( req = NextRequest, res = NextResponse ) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const userId  = req.userId;
        const role = req.role
        console.log(userId, '-----------userId')
        if (role !== "user") {
            console.log('.....NO User Id present');
            removeTokenCookie();
            return NextResponse.json({ error: "Unauthorized Entry" }, { status: 401 });
        }
        //  user exists
        const userExists = await userProjectsModel.findOne({ userId })
        console.log(userExists, '------------userExists')
        if (!userExists) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            }, { status: 404 });
        }
        // Fetch user's projects with project information populated
        const projectsInformation = await userProjectsModel.findOne({ userId })
            .populate('NewProjects.ProjectId')
            .populate('onGoingProjects.ProjectId')
            .populate('completedProjects.ProjectId');
        console.log(projectsInformation, ".................ppp");
        return NextResponse.json({
            message: "fetched data successfully",
            success: true,
            projectsInformation,
        });
    } catch (error) {
        console.log(error.message, '------------error')
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
