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
        console.log(reqBody, '----------------reqBody')
        const { selectedDvs, projectId, assignedBy } = reqBody

        const findLead = await leadLoginModel.findById(assignedBy);
        if (!findLead) {
            console.log(error.message, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }

        for (const devId of selectedDvs) {
            const findDev = await developerModel.findById(devId);
            if (!findDev) {
                return NextResponse.json({ error: 'developer not found' }, { status: 404 });
            }
            console.log(findDev, '----------------findLead')
            const savedData = await devTaskAssign({ findDev, findLead, reqBody })
        }

        // Shift in LeadTask from New Task to OnGoing
        // const teamLeadId = assignedBy
        // const devName = findDev.firstName + ' ' + findDev.lastName;
        // const devId = findDev._id
        // const updateTask = await upDateLeadTask({ devName, devId, teamLeadId, projectId })
        // console.log(updateTask, '----------latestOnGoingTask-----------latestOnGoingTask')
        return NextResponse.json({ message: "Developer Task Assigned" }, { status: 200 });
    } catch (error) {
        console.log(error.message, '---------error in team lead task assign')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}