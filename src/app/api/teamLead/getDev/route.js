import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/Developer/developerLoginModel";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import authMiddleware from "../../middleware/authMiddleware";
connect();
export const GET = async ( req = NextRequest, res = NextResponse ) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const teamLeadId = req.userId;
        const role = req.role
        if (role !== "Exterior" || role !== "Interior") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const findLead = await leadLoginModel.findById(teamLeadId)
        if (!findLead) {
            console.log('Lead Not found')
            return NextResponse.json({
                error: error.message
            }, { status: 404 });
        }
        const leadType = findLead.designation
        const designation = leadType + ' Developer'
        const Developers = await developerModel.find({ designation }).select('-password -__v -email');
        if (!Developers) {
            return NextResponse.json({
                error: error.message
            }, { status: 404 });
        }
        return NextResponse.json({
            message: "Get all Required position developers",
            Developers
        }, { status: 200 });
    } catch (error) {
        console.log(error.message, '====.................=====error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};