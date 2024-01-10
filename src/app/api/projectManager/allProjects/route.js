import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import projectInfoModel from "../../models/projectInfoModel";
import pmProjectsModel from "../../models/ProjectManager/pmProjects";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
connect();

export async function GET(req = NextRequest, res = NextResponse) {
    try {
        const { proManagerId } = await getDataFromToken()
        if (!proManagerId) {
            console.log('.....NO PM Id present');
            return removeTokenCookie();
        }
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
            .populate({
                path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.projectId completedProjects.userId completedProjects.projectId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry',
            }).sort({ projectReachedOn: -1 });
            // .populate({
            //     path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.projectId completedProjects.userId completedProjects.projectId',
            //     select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry',
            //     options: { sort: { 'newProjects.projectReachedOn': -1 } }
            // });
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