import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import userModel from "../../models/User/userModel";
import { setTokenCookie } from "../../helpers/setTokenCookie";
connect()

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        //check if user exist 
        const user = await userModel.findOne({ email })
        if (!user) {
            return NextResponse.json({
                error: "Account doesn't exist"
            }, { status: 403 })
        }
        // Check if the user's email is verified
        else if (!user.isVerified) {
            return NextResponse.json({
                error: "Account email is not verified",
            }, { status: 401 });
        }
        else {
            //check password
            const validPassword = await bcryptjs.compare(password, user.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Login failed Check your credentials." }, { status: 403 })
            } else {
                const { password, __v, forgotPasswordToken, forgotPasswordTokenExpiry, isAdmin, isVerified, ...others } = user._doc
                //create token data
                const tokenData = {
                    userId: others._id,
                    role: user.designation,
                }
                const secret = process.env.SECRET_TOKEN
                const token = Jwt.sign(tokenData, secret, { expiresIn: '1d' })
                // console.log(token, '--------backend---------token')
                const response = NextResponse.json(
                    { message: "Login Successful"
                    , user: others, token},
                    { success: true },
                    { status: 200 })
                await setTokenCookie({ token, response })
                return response;
            }
        }
    } catch (error) {
        console.log(error.message, '-----------error.message')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}