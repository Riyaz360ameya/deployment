import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import projectInfoModel from "../../models/projectInfoModel";
import pmProjectsModel from "../../models/ProjectManager/pmProjects";
connect();

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { proManagerId } = reqBody
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
            .populate({
                path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.projectId completedProjects.userId completedProjects.projectId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry',
            }).sort({ projectReachedOn: -1 });
        return NextResponse.json({
            message: "data has been fetched",
            success: true,
            // projectData,
            PmProjects
        }, { status: 200 })

    } catch (error) {
        console.log(error.message, '------------error')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}