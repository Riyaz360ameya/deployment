import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { devTaskAssign } from "./devTaskAssign";
import { upDateLeadTask } from "./upDateTask";
import developerModel from "../../models/Developer/developerLoginModel";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { developer, projectId, assignedBy } = reqBody
        console.log(developer,'************developer id')
        const id = developer
        const findDev = await developerModel.findById(id);
        if (!findDev) {
            console.log( error.message, '---error--------')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const findLead = await leadLoginModel.findById(assignedBy);
        if (!findLead) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.log(findLead,'-----------findLead')
        // Task assigned to Developer
        const savedData = await devTaskAssign({ findDev, findLead, reqBody })
        // Shift in LeadTask from New Task to OnGoing
        const teamLeadId = assignedBy
        const devName = findDev.firstName + ' ' + findDev.lastName;
        const devId = findDev._id
        const upDateLead = await upDateLeadTask({ devName,devId, teamLeadId, projectId })
        console.log(upDateLead, '------------upDateLead upDateLead')
        return NextResponse.json({ message: "Data Updated" }, { upDateLead }, { status: 202 })
    } catch (error) {
        console.log(error.message, '---------error in team lead task assign')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}