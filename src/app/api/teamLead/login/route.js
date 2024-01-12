import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
import { setTokenCookie } from "../../helpers/setTokenCookie";

connect();

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await leadLoginModel.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: "Account doesn't exist"
            }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Credential" }, { status: 400 })
        }

        const leadTokenData = {
            teamLeadId: user._id,
            role: "TeamLead",
        }

        const { password: userPassword, __v, haveAccess, isVerified, ...others } = user._doc

        const token = Jwt.sign(leadTokenData, process.env.SECRET_TOKEN, { expiresIn: '1d' })

        const response = NextResponse.json({
            success: true,
            message: "Login successfully",
            user: others,
            token
        }, { status: 200 })

        await setTokenCookie({ token, response })

        console.log('Successful login and token generated')
        return response;

    } catch (error) {
        console.error('Error during login:', error.message)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
