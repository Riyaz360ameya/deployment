import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import projectInfoModel from "../../models/projectInfoModel";
import pmProjectsModel from "../../models/ProjectManager/pmProjects";
connect();

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { proManagerId } = reqBody
        console.log(proManagerId, '----------------proManagerId')
        // const projectData = await projectInfoModel
        //     .find()
        //     .populate({
        //         path: 'userId',
        //         select: 'firstName lastName organisation',
        //     })
        //     .sort({ createdAt: -1 });
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
            .populate({
                path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.projectId completedProjects.userId completedProjects.projectId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry',
            }).sort({ projectReachedOn: -1 });
        console.log(PmProjects, '----------------findPmProjects ')
        return NextResponse.json({
            message: "data has been fetched",
            success: true,
            // projectData,
            PmProjects
        }, { status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}