import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import devTaskModel from "../../models/Developer/developerTask";
connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const developerId = reqBody.devId
        console.log(developerId, '----55-----developerId')
        const devTasks = await devTaskModel.findOne({ developerId }).sort({})
        if (!devTasks) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        console.log(devTasks.newTasks, '-----1----devTasks')
        devTasks.newTasks.sort((a, b) => b.assignedDate - a.assignedDate);
        devTasks.onGoingTasks.sort((a, b) => b.devStartedDate - a.devStartedDate);
        devTasks.completedTasks.sort((a, b) => b.devCompletedDate - a.devCompletedDate);
        console.log(devTasks.newTasks, '-----2----devTasks');
        return NextResponse.json({
            message: "Task get success",
            success: true,
            devTasks
        });
    } catch (error) {
        console.log(error.message, '------------allTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}






