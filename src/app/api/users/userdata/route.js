import { connect } from "../../dbConfig/dbConfig";
import { getDataFromToken } from "../../helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import userModel from "../../models/userModel";

connect()

export async function GET(request = NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await userModel.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            message: "user found",
            data: user
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}