import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import {  upDatePMProjects } from "./upDatePMData";
import { createNewProject } from "./createNewProject";
import { updateUserProjects } from "./updateUserProjects";
import projectInfoModel from "../../models/projectInfoModel";

connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = await request.json();
        const savedProject = await createNewProject(reqData)
        console.log(savedProject,"kkkkkkkkk")
        const userId = savedProject.userId
        const projectId = savedProject._id
        const saveUserProject = await updateUserProjects({ userId, projectId })
        const saveNotifyPM = await upDatePMProjects({ userId, projectId })
        return NextResponse.json({
            message: "Project details added successfully",
            success: true,
            savedProject,
        }, { status: 200 });

    } catch (error) {
        console.error("Error adding project details-----:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(request=NextRequest){
    try {
        const projectsInformation = await projectInfoModel.find().populate("userId");;
        console.log(projectsInformation,"ppppppppppppp");
        return NextResponse.json({
            message:"fetched data successfully",
            success:true,
            projectsInformation
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}










