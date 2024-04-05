import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
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
        const allLeadsData = await leadLoginModel.find({}).select('-password -haveAccess -isVerified -notifications -__v')
        console.log(allLeadsData, '--------------------allLeadsData')
        return NextResponse.json(
            { allLeadsData },
            { success: true },
            { status: 200 }
        )
    } catch (error) {
        console.log(error.message, '---------error finding Team lead')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}