import { NextRequest, NextResponse } from "next/server"
import devTaskModel from "../../models/Developer/developerTask"
import { upDateTask } from "./upDateTask";
import { upDateOnLead } from "./upDateOnLead";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import developerModel from "../../models/Developer/developerLoginModel";
import { authMiddleware } from "../../middleware/authMiddleware";

export const POST = async (req = NextRequest, res = NextResponse) => {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const developerId = req.userId;
        const role = req.role
        if ( role !== "Exterior Developer" || role !== "Interior Developer" || role !== "File Verifier") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        const reqBody = await req.json()
        const { projectId } = reqBody
        console.log(reqBody, '------22----reqBody')
        const findDevTask = await devTaskModel.findOne({ developerId })
        if (!findDevTask) {
            console.log(error, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        const data = findDevTask.newTasks.find(task => task.projectId.toString() === projectId.toString());
        if (!data) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(data, '------data');
        // Update data and move it to onGoingTasks
        const leadId = data.assignedLeadId
        console.log(leadId, '--------------leadId')
        const findLead = await leadLoginModel.findOne({ _id: leadId })
        console.log(findLead, '-------------------findLead')
        const findDev = await developerModel.findById(developerId)
        console.log(findDev, '=--------------------------findDev')
        const upDatedDev = await upDateTask({ data, findDevTask, projectId })
        const teamLeadId = data.assignedLeadId
        const upDatedLead = await upDateOnLead({ projectId, teamLeadId, findLead, findDev, data })
        return NextResponse.json({ message: "Task Started", success: true, upDatedDev }, { status: 200 });
    } catch (error) {
        console.error(error.message, '------------POST error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
