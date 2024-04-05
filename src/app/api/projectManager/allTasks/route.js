import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { authMiddleware } from "../../middleware/authMiddleware";
connect();

export const GET = async ({req = NextRequest, res = NextResponse}) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const proManagerId = req.userId;
        const role = req.role
        if (role !== "Project Manager") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        // Use populate to include leadLogin details in teamLeadId
        const allTasks = await LeadTaskModel.find().populate({
            path: 'teamLeadId',
            select: '-password' // Exclude the password field from leadLogin
        }).select('-notifications');
        return NextResponse.json({
            message: "All tasks received",
            tasks: allTasks,
        }, { status: 200 });
    } catch (error) {
        console.log(error.message, '====.................=====error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};






