import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { leadTaskAssign } from "./leadTaskAssign";
import { pmProjectUpdate } from "./pmProjectUpdate";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { designation, assignedBy, projectId } = reqBody
        const findLead = await leadLoginModel.findOne({ designation })
        console.log(findLead, '----findLead')
        if (!findLead) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const findPM = await managerLoginModel.findById(assignedBy);
        if (!findPM) {
            console.log(error.message, '--Lead tAsk Assign-error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const teamLeadId = findLead._id
        const proManagerId = findPM._id
        // saved data to database
        const savedTask = await leadTaskAssign({ findLead, teamLeadId, findPM, reqBody })
        const updatePm = await pmProjectUpdate({ projectId, teamLeadId, proManagerId })
        return NextResponse.json(
            { message: "Assigned task successfully" },
            { success: true },
            { status: 201 });
    } catch (error) {
        console.log(error, '====.................=====error')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}