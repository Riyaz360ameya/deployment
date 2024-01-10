import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
connect();
export const GET = async () => {
    try {
        const { proManagerId } = await getDataFromToken()
        if (!proManagerId) {
            console.log('.....NO PM Id present');
            return removeTokenCookie();
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






