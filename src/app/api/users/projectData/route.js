import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import userProjectsModel from "../../models/User/userProjectModel";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
connect();

export async function GET(request = NextRequest) {
    try {
        const { userId, role } = await getDataFromToken()
        if (!userId) {
            console.log('.....NO User Id present');
            return removeTokenCookie();
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
        // console.log(projectsInformation, ".................ppp");
        return NextResponse.json({
            message: "fetched data successfully",
            success: true,
            projectsInformation,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
