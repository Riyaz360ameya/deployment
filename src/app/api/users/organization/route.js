import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import organizationModel from "../../models/organization/organizationModel";
connect();

export async function GET(request = NextRequest) {
    try {
        const organizationData = await organizationModel.find({});
        return NextResponse.json({
            message: "organization list found",
            success: true,
            organizationData
        })
    } catch (error) {
        console.log(error.message, '-------------organizations error')
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}

export async function POST(request = NextRequest) {
    try {
        console.log('....................its here')
        const { organization } = await request.json()
        const organizationData = await organizationModel.findOne({ organization });

        if (!organizationData) {
            await new organizationModel({ organization }).save();
            return NextResponse.json({
                message: "New organization added",
                success: true,
            });
        }
        console.log(organizationData, '------------exist organizationData')
        return NextResponse.json({
            message: "This organization already exists",
            success: false,
        });
    } catch (error) {
        console.log(error.message, '-------------organizations error')
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}