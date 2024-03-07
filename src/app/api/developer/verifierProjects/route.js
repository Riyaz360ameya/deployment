import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import { connect } from "../../dbConfig/dbConfig";
import verifierProjectModel from "../../models/Developer/verifierProjects";

connect()
export async function GET() {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NO Dev Id present');
            return removeTokenCookie();
        }
        const verifierId = developerId
        console.log(verifierId, '----55-----developerId')
        const devTasks = await verifierProjectModel.findOne({ verifierId })
        .populate({
            path: 'newTasks.userId newTasks.projectId completedTasks.userId completedTasks.projectId',
            select: '-email -password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -notifications',
        })
        console.log(devTasks, '----------------all verifier projects')
        if (!devTasks) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        console.log(devTasks.newTasks, '-----1----devTasks')
        devTasks.newTasks.sort((a, b) => b.assignedDate - a.assignedDate);
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