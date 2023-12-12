import { NextRequest,NextResponse } from "next/server";
import teamLeadsModel from "@/app/api/models/leadModel";
import { connect } from "@/app/api/dbConfig/dbConfig";

connect();

export async function GET(request=NextRequest){
   try {
    const task = await teamLeadsModel.find();
    return NextResponse.json({
       message:"task assigned",
       task,
       success:true 
    })
   } catch (error) {
     return NextResponse.json({error:error.message},{status:500})
   }
}