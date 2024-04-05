import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { leadTaskAssign } from "./leadTaskAssign";
import { pmProjectUpdate } from "./pmProjectUpdate";
import { userProjectUpdate } from "./userProjectUpdate";
import authMiddleware from "../../middleware/authMiddleware";

connect();

export async function POST(req = NextRequest, res = NextResponse) {
  try {
    await authMiddleware(req, res); // passing req, res directly
    const proManagerId = req.userId;
    const role = req.role
    if (role !== "Project Manager") {
      return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
    }
    const { selectedTeams, projectId } = reqBody;
    console.log(reqBody, '--------------body')
    const findPM = await managerLoginModel.findById(proManagerId);
    if (!findPM) {
      return NextResponse.json({ error: 'Project Manager not found' }, { status: 404 });
    }
    for (const teamLeadId of selectedTeams) {
      const findLead = await leadLoginModel.findById(teamLeadId);
      if (!findLead) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }
      console.log(findLead, '----------------findLead')
      await leadTaskAssign({ teamLeadId, reqBody, findLead, findPM })
    }
    // const newOngoing = await pmProjectUpdate({ projectId, selectedTeams, proManagerId, });

    // update in user data 
    // const updateUser = await userProjectUpdate({ projectId });
    // return NextResponse.json({ message: 'Assigned task successfully', newOngoing }, { success: true }, { status: 201 });
  } catch (error) {
    console.error(error.message, 'Error:-----pm task assign');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
