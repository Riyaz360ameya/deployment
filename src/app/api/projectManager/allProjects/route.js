import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import projectInfoModel from "../../models/projectInfoModel";
import pmProjectsModel from "../../models/ProjectManager/pmProjects";
import authMiddleware from "../../middleware/authMiddleware";
connect();

export async function GET(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const proManagerId = req.userId;
        const role = req.role
        if (role !== "Project Manager") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const PmProjects = await pmProjectsModel.findOne({ proManagerId })
            .populate({
                path: 'newProjects.userId newProjects.projectId onGoingProjects.userId onGoingProjects.assignedLeadId onGoingProjects.projectId completedProjects.assignedLeadId completedProjects.userId completedProjects.projectId',
                select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
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