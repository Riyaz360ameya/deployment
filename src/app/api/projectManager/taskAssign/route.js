import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
import { leadTaskAssign } from "./leadTaskAssign";
import { pmProjectUpdate } from "./pmProjectUpdate";
import { userProjectUpdate } from "./userProjectUpdate";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";

connect();

export async function POST(request = NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody, '----------55----------reqBody')
    const { proManagerId } = await getDataFromToken();

    if (!proManagerId) {
      console.log('No PM Id present. Removing token cookie.');
      return removeTokenCookie();
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
