import { connect } from "../../dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import userModel from "../../models/User/userModel";
connect();

export async function POST(request=NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {token} = reqBody
        console.log(token,"verify route")
        
        const user = await userModel.findOne({
            email: reqBody.email,
        })
        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})
        }
        console.log(user)
        user.isFilesVerified = true;
        await user.save();

        return NextResponse.json({
            message:"Files is verified",
            success:true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}