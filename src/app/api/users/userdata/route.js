const { getDataFromToken } = require("@/app/helpers/getDataFromToken");

getDataFromToken
import { NextRequest,NextResponse } from "next/server";
import User from "@/app/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect()

export async function GET(request=NextRequest){
   try {
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({
        message:"user found",
        data:user
    })
   } catch (error) {
       return NextResponse.json(
        {error:error.message},
        {status:400}
        )
   }
}