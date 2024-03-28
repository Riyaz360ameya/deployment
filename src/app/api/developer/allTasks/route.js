import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import devTaskModel from "../../models/Developer/developerTask";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
connect()
export async function GET() {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NO Dev Id present');
            return removeTokenCookie();
        }
        console.log(developerId, '----55-----developerId')
        const devTasks = await devTaskModel.findOne({ developerId })
        .populate({
            path: 'newTasks.projectId onGoingTasks.projectId completedTasks.projectId',
            select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
        }).sort({ projectReachedOn: -1 });
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






