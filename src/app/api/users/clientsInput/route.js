import { NextRequest,NextResponse } from "next/server";
export async function POST(request=NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody,'------------data from backend-------')
        return NextResponse.json({
            success:true,
            message:"data sent"

        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        })
        
    }
}