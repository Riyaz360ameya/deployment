import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/developerLoginModel";
connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const pass = password
        //check if user exist
        const user = await developerModel.findOne({ email })
        console.log(user, '-----------user')
        if (!user) {
            return NextResponse.json({ error: "user doesn't exist" }, { status: 400 })
        } else {
            //validPassword
            const validPassword = await bcryptjs.compare(pass, user.password)
            if (!validPassword) {
                return NextResponse.json({ error: "invalid password" }, { status: 400 })
            }
            //create token data
            const developerTokenData = {
                id: user._id,
                email: user.email,
            }
            const { password, __v, ...others } = user._doc
            //create token
            const token = Jwt.sign(developerTokenData, process.env.SECRET_TOKEN, { expiresIn: '1d' })
            const response = NextResponse.json({
                message: "Login successfully",
                success: true,
                user: others
            })
            response.cookies.set("token", token, {
                httpOnly: true
            })
            return response;
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}