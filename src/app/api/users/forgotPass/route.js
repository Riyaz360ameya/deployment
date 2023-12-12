import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../helpers/mail";
import userModel from "../../models/userModel";
connect()
export async function POST(request = NextRequest) {
    try {
        console.log('-------------here.............')
        const reqBody = await request.json()
        const email = reqBody.otpEmail
        console.log(email, '===========otpEmail')
        const user = await userModel.findOne({ email })
        console.log(user, '-----------existUser')
        if (!user) {
            return NextResponse.json(
                { error: "Account doesn't exist", success: false }, { status: 403 })
        }
        else {
            const response = await sendEmail({ email, emailType: "Password RESET", userId: user._id })
            console.log('------email Send ----------')
            return NextResponse.json({ success: true, message: "OTP sent to Email" }, { status: 200 });
        }
    } catch (error) {
        console.log(error, '----------------error----')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}