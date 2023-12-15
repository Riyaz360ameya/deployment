import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const pass = password
        //check if user exist
        const user = await leadLoginModel.findOne({ email })
        if (!user) {
            return NextResponse.json({
                error: "Account doesn't exist"
            }, { status: 400 })
        } else {
            //validpassword
            const validPassword = await bcryptjs.compare(pass, user.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Invalid Credential" }, { status: 400 })
            }
            //create token data
            const leadTokenData = {
                id: user._id,
                email: user.email,
            }
            //create token
            const { password, __v, haveAccess, isVerified, ...others } = user._doc
            const token = Jwt.sign(leadTokenData, process.env.SECRET_TOKEN, { expiresIn: '1d' })
            const response = NextResponse.json({
                message: "Login successfully",
                success: true,
                user:others
            })
            response.cookies.set("token", token, {
                httpOnly: true
            })
            return response;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}