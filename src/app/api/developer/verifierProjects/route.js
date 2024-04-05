import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import verifierProjectModel from "../../models/Developer/verifierProjects";
import authMiddleware from "../../middleware/authMiddleware";

connect()
export async function GET(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        if (!developerId || role !== "Exterior Developer" || role !== "Interior Developer" || role !== "user") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
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
        console.log(error.message, '----developer--------project verify error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    } 
}