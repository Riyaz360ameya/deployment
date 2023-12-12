import { connect } from "@/app/api/dbConfig/dbConfig";
import otpVerifyModel from "@/app/api/models/otpVerifyModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
connect()
export async function POST(request = NextRequest) {
    try {
        console.log('.......................here')
        const reqBody = await request.json()
        const userEmail = reqBody.otpEmail
        const otp = reqBody.otp
        console.log(otp, userEmail, '-------------userEmail')
        if (!userEmail || !otp) {
            return NextResponse.json(
                { error: "Empty OTP details are not allowed", success: false }, { status: 403 })
        }
        const otpVerificationData = await otpVerifyModel.findOne({ email: userEmail }).sort({ createdAt: -1 })
        console.log(otpVerificationData,'---------------otpVerificationData')
        if (!otpVerificationData) {
            return NextResponse.json(
                { error: "OTP verification data not found Pls Submit again", success: false }, { status: 403 })
        } else {
            const { expiresAt } = otpVerificationData;
            const hashedOtp = otpVerificationData.otp;
            if (expiresAt < Date.now()) {
                await otpVerifyModel.deleteMany({ email: userEmail });
                return NextResponse.json(
                    { error: "OTP has expired", success: false }, { status: 408 })
            } else {
                const isValidOtp = bcryptjs.compareSync(otp, hashedOtp);
                if (!isValidOtp) {
                    return NextResponse.json(
                        { error: "Invalid OTP", success: false }, { status: 400 })
                    // OTP is valid, delete OTP verification data
                }
                await otpVerifyModel.deleteMany({ email: userEmail });
            }
            return NextResponse.json({ success: true, message: "OTP verified" }, { status: 200 });
        }
    }
    catch (error) {
        console.log(error, '----------------error----')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}