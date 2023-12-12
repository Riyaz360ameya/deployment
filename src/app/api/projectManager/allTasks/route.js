import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import LeadLoginModel from "../../models/leadLoginModel";
import LeadTaskModel from "../../models/leadTaskModel";
connect();
export const GET = async (request = NextRequest) => {
    try {
        // Use populate to include leadLogin details in teamLeadId
        console.log('.............get is called');
        const allTasks = await LeadTaskModel.find().populate({
            path: 'teamLeadId',
            select: '-password' // Exclude the password field from leadLogin
        }).select('-notifications');
        console.log(allTasks, '------------allTasks');
        return NextResponse.json({
            message: "All tasks received",
            tasks: allTasks,
        }, { status: 200 });
    } catch (error) {
        console.log(error, '====.................=====error');
        return NextResponse.json({ error }, { status: 500 });
    }
};






