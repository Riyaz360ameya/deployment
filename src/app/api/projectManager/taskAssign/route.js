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
    const { proManagerId } = await getDataFromToken();

    if (!proManagerId) {
      console.log('No PM Id present. Removing token cookie.');
      return removeTokenCookie();
    }

    const { designation, projectId } = reqBody;

    const findLead = await leadLoginModel.findOne({ designation });

    if (!findLead) {
      console.log('Lead not found. Designation:', designation);
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const findPM = await managerLoginModel.findById(proManagerId);

    if (!findPM) {
      console.log('Project Manager not found. PM Id:', proManagerId);
      return NextResponse.json(
        { error: 'Project Manager not found' },
        { status: 404 }
      );
    }

    const teamLeadId = findLead._id;

    // saved data to database
    const savedTask = await leadTaskAssign({
      findLead,
      teamLeadId,
      findPM,
      reqBody,
    });

    const { newOngoing } = await pmProjectUpdate({
      projectId,
      teamLeadId,
      proManagerId,
    });

    const updateUser = await userProjectUpdate({ projectId });

    return NextResponse.json(
      { message: 'Assigned task successfully', newOngoing },
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message,'Error:-----pm task assign' );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "../../dbConfig/dbConfig";
// import leadLoginModel from "../../models/TeamLead/leadLoginModel";
// import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
// import LeadTaskModel from "../../models/TeamLead/leadTaskModel";
// import { leadTaskAssign } from "./leadTaskAssign";
// import { pmProjectUpdate } from "./pmProjectUpdate";
// import { userProjectUpdate } from "./userProjectUpdate";
// import { getDataFromToken } from "../../helpers/getDataFromToken";
// import { removeTokenCookie } from "../../helpers/removeTokenCookie";
// connect();
// export async function POST(request = NextRequest) {
//     try {
//         const reqBody = await request.json()
//         const { proManagerId } = await getDataFromToken()
//         if (!proManagerId) {
//             console.log('.....NO PM Id present');
//             return removeTokenCookie();
//         }
//         const { designation, projectId } = reqBody
//         const findLead = await leadLoginModel.findOne({ designation })
//         console.log(findLead, '----findLead')
//         if (!findLead) {
//             console.log(error, '---error=')
//             return NextResponse.json({ error: error.message }, { status: 404 })
//         }
//         const findPM = await managerLoginModel.findById(proManagerId);
//         if (!findPM) {
//             console.log(error.message, '--Lead tAsk Assign-error=')
//             return NextResponse.json({ error: error.message }, { status: 404 })
//         }
//         const teamLeadId = findLead._id
//         // const proManagerId = findPM._id
//         // saved data to database
//         const savedTask = await leadTaskAssign({ findLead, teamLeadId, findPM, reqBody })
//         const { newOngoing } = await pmProjectUpdate({ projectId, teamLeadId, proManagerId })
//         const updateUser = await userProjectUpdate({ projectId })
//         return NextResponse.json(
//             { message: "Assigned task successfully",newOngoing },
//             { success: true },
//             { status: 201 });
//     } catch (error) {
//         console.log(error, '====.................=====error')
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     }
// }