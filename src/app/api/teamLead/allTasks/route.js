import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { getDataFromToken } from "../../helpers/getDataFromToken";
connect()
export async function GET() {
    try {
        const { teamLeadId } = await getDataFromToken()
        if (!teamLeadId) {
            console.log('.....NO Lead Id present');
            return removeTokenCookie();
        }
        const LeadTasks = await LeadTaskModel.findOne({ teamLeadId })
        return NextResponse.json({
            message: "Task get success",
            success: true,
            LeadTasks
        });
    } catch (error) {
        console.log(error, '------------allTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}