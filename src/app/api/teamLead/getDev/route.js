import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/Developer/developerLoginModel";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
connect();
export const GET = async (request = NextRequest) => {
    try {
        const { teamLeadId } = await getDataFromToken()
        if (!teamLeadId) {
            console.log('.....NO Lead Id present');
            return removeTokenCookie();
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