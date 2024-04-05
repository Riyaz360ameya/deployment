import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import devTaskModel from "../../models/Developer/developerTask";
import authMiddleware from "../../middleware/authMiddleware";
connect()
export async function GET(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        console.log(userId, '-----------userId')
        if (role !== "Exterior Developer" || role !== "Interior Developer" || role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
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






