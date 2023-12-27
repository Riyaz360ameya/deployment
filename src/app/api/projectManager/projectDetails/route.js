import { NextRequest,NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
connect();

export async function GET(request=NextRequest){
    try {
        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}