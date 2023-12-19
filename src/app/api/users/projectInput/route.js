import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import projectInfoModel from "../../models/User/projectInfoModel";
import { upDateUserData } from "./upDateUserData";
import { upDatePMData } from "./upDatePMData";
connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = await request.json();
        console.log(reqData, '---------reqData reqData')

        const savedData = await upDateUserData(reqData)
        const updateData = await upDatePMData(savedData)

        // return NextResponse.json({
        //     message: "Project details added successfully",
        //     success: true,
        //     savedData,
        // }, { status: 200 });

    } catch (error) {
        console.error("Error adding project details-----:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}













