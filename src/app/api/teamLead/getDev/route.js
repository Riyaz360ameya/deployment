import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/Developer/developerLoginModel";
connect();
export const POST = async (request = NextRequest) => {
    try {
        const reqBody = await request.json()
        const { leadType } = reqBody
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
        console.log(error, '====.................=====error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};