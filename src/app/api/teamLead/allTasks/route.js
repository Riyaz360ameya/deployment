import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import authMiddleware from "../../middleware/authMiddleware";
connect()
export async function GET( req = NextRequest, res = NextResponse ) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const teamLeadId = req.userId;
        const role = req.role
        if (!teamLeadId || role !== "Exterior" || role !== "Interior") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const LeadTasks = await LeadTaskModel.findOne({ teamLeadId })
        return NextResponse.json({
            message: "Task get success",
            success: true,
            LeadTasks
        });
    } catch (error) {
        console.log(error, '------team lead------allTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}