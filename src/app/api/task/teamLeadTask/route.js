const { connect } = require("../../dbConfig/dbConfig");
import { NextRequest,NextResponse } from "next/server";
import teamLeadsModel from "../../models/leadModel";
connect();

export async function POST(request=NextRequest){
    try {
        const reqBody = await request.json()
        const {team, importance, projectTitle, description, instruction,startDate,endDate}=reqBody
        console.log(reqBody,"teamlead task")
        // saved data to database

        const assignedTaskByTeamLead = new teamLeadsModel({
            team,
            importance,
            projectTitle,
            description,
            instruction,
            startDate,
            endDate
        })
        const savedTaskByTeamLead = await assignedTaskByTeamLead.save();
        console.log(savedTaskByTeamLead,"savedTaskByTeamLead")
        
            return NextResponse.json({
            message:"Assigned task success",
            success:true,
            savedTaskByTeamLead
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}