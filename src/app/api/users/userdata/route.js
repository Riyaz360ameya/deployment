import { connect } from "../../dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import userModel from "../../models/User/userModel";
import authMiddleware from "../../middleware/authMiddleware";

connect()

export async function GET( req = NextRequest, res = NextResponse ) {
    try {
        await authMiddleware(req, res); // passing req, res directly
        const userId = req.userId;
        const role = req.role
        if (role !== "user") {
            return NextResponse.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        console.log(userId, '-----------decode id')
        const user = await userModel.findOne({ _id: userId }).select("-password")
        return NextResponse.json({ message: "user found", data: user }, { status: 200 })
    } catch (error) {
        console.log(error.message, '------------error in sidebar')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
