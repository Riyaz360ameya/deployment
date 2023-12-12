import { connect } from "@/app/api/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import userModel from "@/app/api/models/userModel";
connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const email = reqBody.otpEmail
        const { password } = reqBody.pass
        console.log(reqBody, email, password)
        const userDetails = await userModel.findOne({ email })
        console.log(userDetails)
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        // Update the user's password in the database
        const updatedUser = await userModel.findOneAndUpdate({ email }, { $set: { password: hashPassword } });
        console.log(updatedUser)
        const savedUser = await updatedUser.save()
        if (savedUser) {
            return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "User not found or password not updated", success: false }, { status: 404 });
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



