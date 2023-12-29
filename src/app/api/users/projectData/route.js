import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import userProjectsModel from "../../models/User/userProjectModel";
connect();

export async function POST(request = NextRequest) {
    try {
        const { _id } = await request.json();
        console.log(_id, '..............userid');

        //  user exists
        const userExists = await userProjectsModel.exists({ userId: _id });
        if (!userExists) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            }, { status: 404 });
        }

        // Fetch user's projects with project information populated
        const projectsInformation = await userProjectsModel.findOne({ userId: _id })
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "../../dbConfig/dbConfig";
// import projectInfoModel from "../../models/projectInfoModel";
// import userProjectsModel from "../../models/User/userProjectModel";
// import { getDataFromToken } from "../../helpers/getDataFromToken";
// connect();

// export async function POST(request = NextRequest) {
//     try {
//         const { _id } = await request.json()
//         console.log(_id, '..............userid')
//         const projectsInformation = await userProjectsModel.find({ userId });
//         console.log(projectsInformation, ".................ppp");
//         return NextResponse.json({
//             message: "fetched data successfully",
//             success: true,
//             projectsInformation
//         })
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     }
// }
