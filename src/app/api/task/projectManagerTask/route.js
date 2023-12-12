import { NextRequest,NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import managerModel from "../../models/managerModel";

connect();

export async function POST(request=NextRequest){
    try {
        const reqBody = await request.json()
        const {team, importance, projectTitle, description, instruction,startDate,endDate}=reqBody
        console.log(reqBody,"manager api")
        // saved data to database

        const assignedTask = new managerModel({
            team,
            importance,
            projectTitle,
            description,
            instruction,
            startDate,
            endDate
        })
        const savedTask = await assignedTask.save();
        console.log(savedTask,"savedtask")
        
            return NextResponse.json({
            message:"Assigned task success",
            success:true,
            savedTask
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}