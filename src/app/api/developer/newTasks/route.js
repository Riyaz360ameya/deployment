import { NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import devTaskModel from "../../models/Developer/developerTask";
import authMiddleware from "../../middleware/authMiddleware";

connect()
export async function GET(req = NextRequest, res = NextResponse) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        if ( role !== "Exterior Developer" || role !== "Interior Developer" || role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        console.log(developerId, '------------developerId new tasks')
        const devTasks = await devTaskModel.findOne({ developerId })
        if (!devTasks) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        console.log(devTasks.newTasks, '-----------------------devTasks')
        return NextResponse.json({ newTasks: devTasks.newTasks }, { status: 200 });
    } catch (error) {
        console.log(error.message, '------------newTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}