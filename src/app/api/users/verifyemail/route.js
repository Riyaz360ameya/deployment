import { connect } from "../../dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import userModel from "../../models/userModel";
connect();

export async function POST(request=NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {token} = reqBody
        console.log(token,"verify route")
        
        const user = await userModel.findOne({
            verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:"Email is verified",
            success:true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}