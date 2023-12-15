import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import devTaskModel from "../../models/Developer/developerTask";
connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const developerId = reqBody.devId
        console.log(developerId, '----55-----developerId')
        const devTasks = await devTaskModel.findOne({ developerId })
        if (!devTasks) {
            return NextResponse.json({  error: error.message }, { status: 404 });
        }
        console.log(devTasks, '---------devTasks')
        return NextResponse.json({
            message: "Task get success",
            success: true,
            devTasks
        });
    } catch (error) {
        console.log(error, '------------allTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}






