import { NextRequest,NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import organisationModel from "../../models/organisation/organisationModel";
connect();

export async function GET(request=NextRequest){
    try {
        const organisationData = await organisationModel.find({});
        return NextResponse.json({
            message:"organisation list found",
            success:true,
            organisationData
        })
    } catch (error) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}