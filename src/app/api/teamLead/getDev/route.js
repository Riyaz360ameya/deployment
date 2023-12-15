import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/Developer/developerLoginModel";
connect();
export const POST = async (request = NextRequest) => {
    try {
        console.log('......55.......get is called');
        const reqBody = await request.json()
        console.log(reqBody, '------reqBody')
        const { leadType } = reqBody
        console.log(leadType, '-----leadType')
        const designation = leadType + ' Developer'
        console.log(designation, '------------designation')
        const Developers = await developerModel.find({ designation }).select('-password -__v -email');
        console.log(Developers, '--------allCustomDev')
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