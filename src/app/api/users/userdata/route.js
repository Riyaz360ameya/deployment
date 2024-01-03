import { connect } from "../../dbConfig/dbConfig";
import { getDataFromToken } from "../../helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import userModel from "../../models/User/userModel";

connect()

export async function GET(request = NextRequest) {
    try {
        console.log('1')
        const { userId, role } = getDataFromToken(request)
        if (userId, role === "user") {
            console.log(userId, '-----------decode id')
            const user = await userModel.findOne({ _id: userId }).select("-password")
            return NextResponse.json({ message: "user found", data: user }, { status: 200 })
        }
    } catch (error) {
        console.log(error.message, '------------error in sidebar')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
