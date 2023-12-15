import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import projectInfoModel from "../../models/User/projectInfoModel";
connect();

export async function GET(request = NextRequest) {
    try {
        const projectData = await projectInfoModel.find().populate("userId");
        // console.log(projectData, 'data')
        return NextResponse.json({
            message:"data has been fetched",
            success:true,
            projectData
        },{status:200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}